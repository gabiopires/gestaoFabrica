import React, {useState, useEffect} from 'react';
import Alerta from "../Alerta/Alerta";
import { TypeDataAlerta } from "../type"

interface dataEntrada {
    onAction: ()=>void
}

let dataAlerta: TypeDataAlerta = {
    title: "",
    buttonTitle: [""],
    buttonAction: [()=>{}],
}

export default function Entrada(props: dataEntrada){

    const [materialId, setMaterialId] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [typeMaterial, setTypeMaterial] = useState('');
    const [materialBrutoData, setMaterialBrutoData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);
    const [materialProntoData, setMaterialProntoData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);
    const [seeAlerta, setSeeAlerta] = useState(false);

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
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe um material",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false);}]
            }
        }else if(quantidade == "" || quantidade <= "0"){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe uma quantidade valida",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else if(date == ""){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe a data",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else if(fornecedor == ''){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe um fornecedor.",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else{
            FiltrarFunção()
        }
    }

    function FiltrarFunção(){
        let tabela, qtdAnterior, qtdAnteriorBruto, qtdAnteriorPreparado, nome;

        if(typeMaterial == "typePronto"){
            materialProntoData.map((a)=>{
                if(materialId == a.id){
                    tabela = a.tabela;
                    qtdAnterior = a.qtd;
                }
            })
        }else{
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
                    }
                }
            })
        }
        if(typeMaterial == "typePreparado" && (Number(qtdAnteriorBruto) < Number(quantidade))){
            setSeeAlerta(true);
            dataAlerta = {
                title: `Não existe material bruto suficiente para preparar ${quantidade} ${nome}`,
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
            return;
        }else{
            EntradaMaterial(tabela, qtdAnterior, qtdAnteriorBruto, qtdAnteriorPreparado);
        }
    }

    async function EntradaMaterial(tabela: any, qtdAnterior: any, qtdAnteriorBruto: any, qtdAnteriorPreparado:any){
        let qtdAtual, qtdBrutoAtual, coluna = "n_qtde_materiaprimaPreparado", status;
        let diminuiuBruto, diminuiuItem = false;
        if(typeMaterial == "typePreparado"){
            qtdAtual = Number(quantidade) + Number(qtdAnteriorPreparado);
            qtdBrutoAtual = Number(qtdAnteriorBruto) - Number(quantidade);
            diminuiuBruto = await SaidaMaterialBruto(qtdBrutoAtual, tabela);
            status = 'Entrada de Materia Prima Preparada'
        }else if(typeMaterial == "typeBruto"){
            qtdAtual = Number(quantidade) + Number(qtdAnteriorBruto);
            coluna = 'n_qtde_materiaprimaBruto';
            status = 'Entrada de Materia Prima Bruta';
            diminuiuBruto = true;
        }else{
            const result = await getProduto_Item();
            diminuiuBruto = result.diminuiuBruto; // Atualiza a variável de controle
            const itemsParaSaida = result.items;
            if (diminuiuBruto && itemsParaSaida && itemsParaSaida.length > 0) {
                const resultados = await Promise.all(
                    itemsParaSaida.map((a: any) =>
                        SaidaMaterialPreparado(a.n_id_item, a.n_qtde_item)
                    )
                );
                diminuiuItem = resultados.every(r => r === true);
                qtdAtual = Number(quantidade) + Number(qtdAnterior);
                coluna = 'n_qtd_estoque';
                status = 'Entrada de Produto Final'
            }else if (!diminuiuBruto){
                setSeeAlerta(true);
                dataAlerta = {
                    title: `Estoque insuficiente para finalizar esse produto!`,
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false)}]
                }
                return;
            }
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
                        qtdDigitada: quantidade,
                        date: date,
                        fornecedor: fornecedor,
                        solicitante: "",
                        emailSolicitante: "",
                        acompanhante: "",
                        tabela: tabela,
                        colunaTabela: coluna,
                        action: "movEntrada",
                        status: status
                    })
                })
                if(response.status === 200) {
                    setSeeAlerta(true);
                    dataAlerta = {
                        title: "Estoque movimentado com sucesso!",
                        buttonTitle: ["Ok"],
                        buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                    }
                }else{
                    setSeeAlerta(true);
                    dataAlerta = {
                        title: "Não foi possível realizar movimentação. Tente novamente mais tarde.",
                        buttonTitle: ["Ok"],
                        buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                    }
                }
            }catch(error){
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Não foi possível realizar movimentação. Tente novamente mais tarde.",
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                }
            }
        }else{
            setSeeAlerta(true);
            dataAlerta = {
                title: "Não foi possível realizar movimentação. Tente novamente mais tarde.",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
            }
        }
    }

    async function getProduto_Item(){
        try{
            const endpoint = `/api/apiEstoque?action=getProduto_item&data=${materialId}`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json()
                const temEstoqueSuficiente = returnDataApi.every((a:any) => 
                    {   
                        const estoqueDisponivel = Number(a.n_qtde_item); 
                        const quantidadeRequerida = Number(quantidade); 
                        
                        return estoqueDisponivel >= quantidadeRequerida; // Verifica se há estoque
                    }
                );
                
                if(temEstoqueSuficiente){
                    // Retorna os dados para serem usados imediatamente
                    return { diminuiuBruto: true, items: returnDataApi }; 
                }
                // Retorna false se a condição não for atendida
                return { diminuiuBruto: false, items: [] }; 
                
            } else {
                console.error(`Error ${response.status}`)
                return { diminuiuBruto: false, items: [] };
            }
        }catch(error){
            console.error("Error fetching data:", error)
            return { diminuiuBruto: false, items: [] };
        }
    }

    async function SaidaMaterialPreparado(id: any, qtdAtual: any){
        try{
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: id,
                    qtd: qtdAtual - Number(quantidade),
                    qtdDigitada: quantidade,
                    date: date,
                    fornecedor: "",
                    solicitante: "",
                    emailSolicitante: "",
                    acompanhante: "Movimentação Interna", //futuramente adicionar o usuario logado
                    tabela: "1",
                    colunaTabela: "n_qtde_item",
                    action: "movSaida",
                    status: 'Saida de item fabricado'
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
                    qtdDigitada: quantidade,
                    date: date,
                    fornecedor: "",
                    solicitante: "",
                    emailSolicitante: "",
                    acompanhante: "Movimentação Interna", //futuramente adicionar o usuario logado
                    tabela: tabela,
                    colunaTabela: "n_qtde_materiaprimaBruto",
                    action: "movSaida",
                    status: 'Saida de Materia Prima Bruta'
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
            {seeAlerta&&<Alerta dataAlerta={dataAlerta}/>}
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