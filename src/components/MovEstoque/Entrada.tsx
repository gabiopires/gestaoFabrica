import React, {useState, useEffect} from 'react';

interface dataEntrada {
    onAction: ()=>void
}

export default function Entrada(props: dataEntrada){

    const [materialId, setMaterialId] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [typeMaterial, setTypeMaterial] = useState('')
    const [materialBrutoData, setMaterialBrutoData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);
    const [materialProntoData, setMaterialProntoData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);

    useEffect(()=>{
        carregarMateriais();
    },[])

    async function carregarMateriais(){
        try{
            const endpoint = `/api/apiEstoque?action=getMovEstoque`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json()
                setMaterialBrutoData(returnDataApi.bruto);
                setMaterialProntoData(returnDataApi.produto);
            }else{
                console.error(`Error ${response.status}`)
            }
        }catch(error){
            console.error("Error fetching data:", error)
        }
    }

    function confirmData(){
        if(materialId == ""){
            alert("Informe um material");
        }else if(quantidade == "" || quantidade <= "0"){
            alert("Informe uma quantidade valida");
        }else if(date == ""){
            alert("Informe a data");
        }else if(fornecedor == ''){
            alert("Informe um fornecedor");
        }else{
            FiltrarFunção()
        }
    }

    function FiltrarFunção(){
        let tabela, qtdAnterior, qtdAnteriorBruto, qtdAnteriorPreparado, nome;
        materialBrutoData.map((a)=>{
            if(materialId == a.id){
                if(typeMaterial == "typePreparado"){
                    tabela = a.tabela;
                    qtdAnteriorBruto = a.qtdBruto;
                    qtdAnteriorPreparado = a.qtdPreparado;
                    nome = a.nome;
                }else if(typeMaterial == "typeBruto"){
                    tabela = a.tabela;
                    qtdAnteriorBruto = a.qtdBruto;
                }else{
                    tabela = a.tabela;
                    qtdAnterior = a.qtd;
                }
            }
        })
        if(Number(qtdAnteriorBruto) < Number(quantidade)){
            alert(`Não existe material bruto suficiente para preparar ${quantidade} ${nome}`);
            return;
        }else{
            EntradaMaterial(tabela, qtdAnterior, qtdAnteriorBruto, qtdAnteriorPreparado, materialId);
        }
    }

    async function EntradaMaterial(tabela: any, qtdAnterior: any, qtdAnteriorBruto: any, qtdAnteriorPreparado:any,  materialId: string){
        let qtdAtual, qtdBrutoAtual, coluna;
        let diminuiuBruto = true;
        if(typeMaterial == "typePreparado"){
            qtdAtual = Number(quantidade) + Number(qtdAnteriorPreparado);
            qtdBrutoAtual = Number(qtdAnteriorBruto) - Number(quantidade);
            diminuiuBruto = await SaidaMaterialBruto(qtdBrutoAtual, tabela);
        }else if(typeMaterial == "typeBruto"){
            qtdAtual = Number(quantidade) + Number(qtdAnteriorBruto);
            coluna = 'n_qtde_materiaprimaBruto';
        }else{
            qtdAtual = Number(quantidade) + Number(qtdAnterior);
            coluna = 'n_qtd_estoque';
        }

        if(diminuiuBruto){
            try{
                const endpoint = `/api/apiEstoque`
                const response = await fetch(endpoint, { 
                    cache: "reload", 
                    headers:{'Content-Type':'application/json'},
                    method: "PUT",
                    body: JSON.stringify({
                        material: materialId,
                        qtd: qtdAtual,
                        date: date,
                        fornecedor: fornecedor,
                        tabela: tabela,
                        colunaTabela: coluna,
                        action: "movEntrada"
                    })
                })
                if(response.status === 200) {
                    alert("movimentação concluída com sucesso!");
                    props.onAction();
                }else{
                    console.error(`Error ${response.status}`)
                    alert("Não foi possível realizar movimentação. Tente novamente mais tarde.");
                }
            }catch(error){
                console.error("Error fetching data:", error)
                alert("Não foi possível realizar movimentação. Tente novamente mais tarde.");
            }
        }else{
            alert("Não foi possível realizar movimentação. Tente novamente mais tarde.");
        }
    }

    async function SaidaMaterialBruto(qtdBrutoAtual:any, tabela: any){
        try{
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: materialId,
                    qtd: qtdBrutoAtual,
                    date: date,
                    fornecedor: fornecedor,
                    tabela: tabela,
                    colunaTabela: "n_qtde_materiaprimaBruto",
                    action: "movSaida"
                })
            })
            if(response.status === 200) {
                return true;
            }else{
                console.error(`Error ${response.status}`);
                return false;
            }
        }catch(error){
            console.error("Error fetching data:", error);
            return false;
        }
    }

    return(
        <div className='w-full'>
            
            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full md:ml-3 mt-5 md:mt-0'>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Tipo de material:</p>
                    <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={typeMaterial} onChange={(evt)=>{setTypeMaterial(evt.target.value)}}>
                        <option value="" hidden>Selecione</option>
                            <option value={'typePronto'}>Ponto</option>
                            <option value={'typeBruto'}>Materia Prima Bruta</option>
                            <option value={'typePreparado'}>Materia Prima Preparada</option>
                    </select>
                </div>
                {typeMaterial != "" &&
                    <div className='h-full flex flex-col gap-2 justify-center items-start'>
                        <p className='ml-2'>Material:</p>
                        <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={materialId} onChange={(evt)=>{setMaterialId(evt.target.value)}}>
                            <option value="" hidden>Selecione</option>
                            {typeMaterial == 'typePronto' ?
                                <>{materialProntoData.map((o, index)=>(
                                    <option key={index} value={o.id}>{o.nome}</option>
                                ))}</>
                            :
                                <>{materialBrutoData.map((o, index)=>(
                                    <option key={index} value={o.id}>{o.nome}</option>
                                ))}</>
                            }
                        </select>
                    </div>
                }
            </div>

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-0 w-full'>
                <div className='h-full flex flex-col justify-center items-start md:pl-5 md:pr-5 gap-2 mt-5 md:mt-0'>
                    <p className='ml-2'>Quantidade:</p>
                    <input type='number' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={quantidade} onChange={(evt)=>{SetQuantidade(evt.target.value)}}></input>
                </div>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Data de entrada</p>
                    <input type='datetime-local' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full h-[26px]' value={date} onChange={(evt)=>{setDate(evt.target.value)}}></input>
                </div>
            </div>

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-0 w-full'>
                <div className='h-full flex flex-col justify-center items-start md:pl-5 md:pr-5 gap-2 mt-5 md:mt-0'>
                    <p className='ml-2'>Origem fornecedor</p>
                    <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={fornecedor} onChange={(evt)=>{setFornecedor(evt.target.value)}}></input>
                </div>
            </div>

            <div className='md:w-[80%] w-[95%] flex justify-end items-end mt-5 md:mt-0'>
                <button className='h-[30px] w-[120px] bg-[#53D420] rounded-xl text-white' onClick={()=>{confirmData()}}>Salvar</button>
            </div>
        </div>
    )
}