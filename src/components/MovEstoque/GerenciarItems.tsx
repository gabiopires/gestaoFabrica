import React, {useState, useEffect} from 'react';
import Alerta from "../Alerta/Alerta";
import { TypeDataAlerta } from "../type"

interface dataSaida {
    onAction: ()=>void,
    type: number,
}

let dataAlerta: TypeDataAlerta = {
    title: "",
    buttonTitle: [""],
    buttonAction: [()=>{}],
}

export default function GerenciarItens(props: dataSaida){

    const [materialId, setMaterialId] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [acompanhante, setAcompanhante] = useState("-1");
    const [typeMovimentacao, setTypeMovimentacao] = useState(props.type ?? -1)
    const [materialItemData, setMaterialItemData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);
    const [pessoas, setPessas] = useState<{id: number, nome: string}[]>([]);
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
                setMaterialItemData(returnDataApi.item);
                setPessas(returnDataApi.pessoas);
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
        }else if(acompanhante == ''){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Informe o nome do solicitante do material",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else if(typeMovimentacao == -1){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Selecione o tipo de movimentação",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
        }else{
            FiltrarFunção()
        }
    }

    function FiltrarFunção(){
        let tabela, qtdAnterior, coluna, qtdAnteriorPreparado;

        //entrada de itens produzidos
        if(typeMovimentacao == 0){
            materialItemData.map((a)=>{
                if(materialId == a.id){
                    qtdAnterior = a.qtd;
                }
            })
            EntradaMaterial(qtdAnterior)

        //saida de itens produzidos
        }else{
            materialItemData.map((a)=>{
                if(materialId == a.id){
                    qtdAnterior = a.qtd;
                }
            })

            if(Number(qtdAnterior) < Number(quantidade)){
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Quantidade informada é maior que o estoque disponível",
                    buttonTitle: ["Ok"],
                    buttonAction: [()=>{setSeeAlerta(false)}]
                }
                return;
            }else{
                SaidaMaterial(qtdAnterior);
            }
        }
    }

    async function SaidaMaterial(qtdAnterior:any){
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
                    solicitante: "",
                    emailSolicitante: "",
                    acompanhante: "Movimentação Interna",
                    tabela: "1",
                    colunaTabela: "n_qtde_item",
                    action: "movSaida",
                    status: "Saida de item"
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

    async function EntradaMaterial(qtdAnterior:any){

        let qtdAtual = Number(quantidade) + Number(qtdAnterior);

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
                    fornecedor: "",
                    solicitante: "",
                    emailSolicitante: "",
                    acompanhante: acompanhante,
                    tabela: "1",
                    colunaTabela: "n_qtde_item",
                    action: "movEntrada",
                    status:"Entrada de item"
                })
            })
            if(response.status === 200) {
                setSeeAlerta(true);
                dataAlerta = {
                    title: "Movimentação concluida com sucesso! Deseja deduzir o material preparado utilizado?",
                    buttonTitle: ["Não","Sim"],
                    buttonAction: [()=>{setSeeAlerta(false);props.onAction()}, ()=>{setSeeAlerta(false),BuscarMateriaPrima(Number(materialId))}]
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

    async function BuscarMateriaPrima(materia: number){
        try{
            const endpoint = `/api/apiEstoque?action=getItem_materiaprima&data=${materia}`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json();
                await SaidaMateriaPrima(returnDataApi.id, returnDataApi.qtdAnterior);
            }else{
                console.error(`Error ${response.status}`)
            }
        }catch(error){
            console.error("Error fetching data:", error)
        }
    }

    async function SaidaMateriaPrima(materiaPrimaId: number, materiaPrimaQtd: number){
        let qtd = materiaPrimaQtd - Number(quantidade);

        if(materiaPrimaQtd < Number(quantidade)){
            setSeeAlerta(true);
            dataAlerta = {
                title: "Quantidade informada é maior que o estoque disponível. Dedução não será realizada!",
                buttonTitle: ["Ok"],
                buttonAction: [()=>{setSeeAlerta(false)}]
            }
            return;
        }else{
            try{
                const endpoint = `/api/apiEstoque`
                const response = await fetch(endpoint, { 
                    cache: "reload", 
                    headers:{'Content-Type':'application/json'},
                    method: "PUT",
                    body: JSON.stringify({
                        material: materiaPrimaId,
                        qtd: qtd,
                        qtdDigitada: quantidade,
                        date: date,
                        fornecedor: "",
                        solicitante: "",
                        emailSolicitante: "",
                        acompanhante: acompanhante,
                        tabela: "0",
                        colunaTabela: "n_qtde_materiaprimaPreparado",
                        action: "movSaida",
                        status: 'Saida de Materia Prima Preparada'
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
    }

    return(
        <div className='w-full'>
            {seeAlerta&&<Alerta dataAlerta={dataAlerta}/>}
            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full mt-5 md:mt-0'>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Tipo de movimentação:</p>
                    <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={typeMovimentacao} onChange={(evt)=>{setTypeMovimentacao(Number(evt.target.value))}}>
                        <option value="" hidden>Selecione</option>
                        <option value={0}>Entrada</option>
                        <option value={1}>Saida</option>
                    </select>
                </div>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Material:</p>
                    <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={materialId} onChange={(evt)=>{setMaterialId(evt.target.value)}}>
                        <option value="" hidden>Selecione</option>
                        {materialItemData.map((o, index)=>(
                            <option key={index} value={o.id}>{o.nome}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full'>
                <div className='h-full flex flex-col justify-center items-start gap-2 mt-5 md:mt-0'>
                    <p className='ml-2'>Quantidade:</p>
                    <input type='number' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={quantidade} onChange={(evt)=>{SetQuantidade(evt.target.value)}}></input>
                </div>
                <div className='h-full flex flex-col gap-2 justify-center items-start'>
                    <p className='ml-2'>Data da movimentação:</p>
                    <input type='datetime-local' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full h-[26px]' value={date} onChange={(evt)=>{setDate(evt.target.value)}}></input>
                </div>
            </div>

            <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 w-full mt-5 md:mt-0'>
                {typeMovimentacao == 0 &&
                    <div className='h-full flex flex-col gap-2 justify-center items-start'>
                        <p className='ml-2'>Quem acompanhou a produção:</p>
                        <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={acompanhante} onChange={(evt)=>{setAcompanhante(evt.target.value)}}>
                            <option value="" hidden>Selecione</option>
                            {pessoas.map((o, index)=>(
                                <option key={index} value={o.id}>{o.nome}</option>
                            ))}
                        </select>
                    </div>
                }
            </div>

            <div className='md:w-[80%] w-[95%] flex justify-end items-end mt-5 md:mt-0'>
                <button className='h-[30px] w-[120px] bg-[#53D420] rounded-xl text-white' onClick={()=>{confirmData()}}>Salvar</button>
            </div>
        </div>
    )
}