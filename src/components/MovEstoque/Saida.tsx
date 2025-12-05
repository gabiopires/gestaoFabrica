import React, {useState, useEffect} from 'react';
import Alerta from "../Alerta/Alerta";
import { TypeDataAlerta } from "../type"

interface dataSaida {
    onAction: ()=>void,
    onAddItem: ()=>void
}

let dataAlerta: TypeDataAlerta = {
    title: "",
    buttonTitle: [""],
    buttonAction: [()=>{}],
}

export default function Saida(props: dataSaida){

    const [materialId, setMaterialId] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [nomeSolicitante, setNomeSolicitante] = useState("");
    const [emailSolicitante, setEmailSolicitante] = useState("");
    const [typeMaterial, setTypeMaterial] = useState('')
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
                title: "Informe qual material você deseja diminuir o estoque",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
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
                title: "Informe a data da movimentação do estoque",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else if(nomeSolicitante == ''){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe o nome do solicitante do material",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else if(emailSolicitante == ''){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe o email do solicitante do material",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else{
            FiltrarFunção()
        }
    }

    function FiltrarFunção(){
        let tabela, qtdAnterior, coluna, qtdAnteriorPreparado, status;

        if(typeMaterial == "typePronto"){
            materialProntoData.map((a)=>{
                if(materialId == a.id){
                    tabela = a.tabela;
                    qtdAnterior = a.qtd;
                    coluna = 'n_qtd_estoque';
                    status = 'Saida de Produto Final'
                }
            })
        }else{
            materialBrutoData.map((a)=>{
                if(materialId == a.id){
                    if(typeMaterial == "typePreparado"){
                        tabela = a.tabela;
                        qtdAnterior = a.qtdPreparado;
                        coluna = 'n_qtde_materiaprimaPreparado';
                        status = 'Saida de Materia Prima Preparada'
                    }else if(typeMaterial == "typeBruto"){
                        tabela = a.tabela;
                        qtdAnterior = a.qtdBruto;
                        qtdAnteriorPreparado = a.qtdPreparado;
                        coluna = 'n_qtde_materiaprimaBruto';
                        status = 'Saida de Materia Prima Bruta'
                    }
                }
            })
        }
        
        if(Number(qtdAnterior) < Number(quantidade)){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Quantidade informada é maior que o estoque disponível",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
            return;
        }else{
            SaidaMaterial(tabela, qtdAnterior, qtdAnteriorPreparado, coluna, status);
        }
    }

    async function SaidaMaterial(tabela: any, qtdAnterior:any, qtdAnteriorPreparado:any, coluna: any, status: any){
        let qtd = Number(qtdAnterior) - Number(quantidade)
        try{
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: materialId,
                    qtd: qtd,
                    qtdDigitada: quantidade,
                    date: date,
                    fornecedor: "",
                    solicitante: nomeSolicitante,
                    emailSolicitante: emailSolicitante,
                    acompanhante: "",
                    tabela: tabela,
                    colunaTabela: coluna,
                    action: "movSaida",
                    status: status
                })
            })
            if(response.status === 200) {
                if(typeMaterial == 'typePreparado'){
                    setSeeAlerta(true);
                    dataAlerta = {
                        title: "Estoque movimentado com sucesso! Deseja movimentar os materiais preparados para itens fabricados?",
                        buttonTitle: ["Não", "Sim"],
                        buttonAction: [()=>{setSeeAlerta(false);props.onAction()}, ()=>{setSeeAlerta(false), props.onAddItem()}],
                    }
                }else if(typeMaterial == 'typeBruto'){
                    setSeeAlerta(true);
                    dataAlerta = {
                        title: "Estoque movimentado com sucesso! Deseja movimentar o material bruto deduzido para material preparado?",
                        buttonTitle: ["Não", "Sim"],
                        buttonAction: [()=>{setSeeAlerta(false);props.onAction()}, ()=>{EntradaMaterial(qtdAnteriorPreparado, materialId);setSeeAlerta(false)}]
                    }
                }else{
                    setSeeAlerta(true);
                    dataAlerta = {
                        title: "Estoque movimentado com sucesso!",
                        buttonTitle: ["Ok"],
                        buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                    }
                }
            }else{
                console.error(`Error ${response.status}`);
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Erro ao movimentar estoque, tente novamente mais tarde!",
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                }
            }
        }catch(error){
            console.error("Error fetching data:", error);
            setSeeAlerta(true);
            dataAlerta = {
                title: "Erro ao movimentar estoque, tente novamente mais tarde!",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
            }
        }
    }

    async function EntradaMaterial(qtdAnteriorPreparado:any, materialId: string){

        let qtdAtual = Number(quantidade) + Number(qtdAnteriorPreparado);

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
                    fornecedor: "Movimentação Interna",
                    solicitante: "",
                    emailSolicitante: "",
                    acompanhante: "", //futuramente adicionar o usuario logado
                    tabela: "0",
                    colunaTabela: "n_qtde_materiaprimaPreparado",
                    action: "movEntrada",
                    status:'Entrada de Materia Prima Preparada'
                })
            })
            if(response.status === 200) {
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Movimentação concluida com sucesso!",
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                }
            }else{
                console.error(`Error ${response.status}`);
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Não foi possível realizar movimentação. Tente novamente mais tarde",
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
                }
            }
        }catch(error){
            console.error("Error fetching data:", error)
            setSeeAlerta(true);
            dataAlerta = {
                title: "Não foi possível realizar movimentação. Tente novamente mais tarde",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false);props.onAction()}]
            }
        }
    }

    return(
        <div className='w-full'>
            {seeAlerta&&<Alerta dataAlerta={dataAlerta}/>}
            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full mt-5 md:mt-0'>
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

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full'>
                <div className='h-full flex flex-col justify-center items-start gap-2 mt-5 md:mt-0'>
                    <p className='ml-2'>Quantidade:</p>
                    <input type='number' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={quantidade} onChange={(evt)=>{SetQuantidade(evt.target.value)}}></input>
                </div>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Data de saida:</p>
                    <input type='datetime-local' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full h-[26px]' value={date} onChange={(evt)=>{setDate(evt.target.value)}}></input>
                </div>
            </div>

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full mt-5 md:mt-0'>
                <div className='h-full flex flex-col justify-center items-start gap-2'>
                    <p className='ml-2'>Nome do solicitante</p>
                    <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={nomeSolicitante} onChange={(evt)=>{setNomeSolicitante(evt.target.value)}}></input>
                </div>
                <div className='h-full flex flex-col justify-center items-start gap-2'>
                    <p className='ml-2'>E-mail do solicitante</p>
                    <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={emailSolicitante} onChange={(evt)=>{setEmailSolicitante(evt.target.value)}}></input>
                </div>
            </div>

            <div className='md:w-[80%] w-[95%] flex justify-end items-end mt-5 md:mt-0'>
                <button className='h-[30px] w-[120px] bg-[#53D420] rounded-xl text-white' onClick={()=>{confirmData()}}>Salvar</button>
            </div>
        </div>
    )
}