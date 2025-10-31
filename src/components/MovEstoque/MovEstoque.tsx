import React, {useState, useEffect} from 'react';

interface MovProps {
    set: (value: boolean) => void;
}

export default function MovEstoque(props: MovProps){

    const [type, setType] = useState("0");
    const [material, setMaterial] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [emailSolicitante, setEmailSolicitante] = useState("");
    const [status, setStatus] = useState("");
    const [acompanhante, setAcompanhante] = useState("");
    const [materialData, setMaterialData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto?: string, qtdPreparado?: string}[]>([]);
    const [materialStatus, setMaterialStatus] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto?: string, qtdPreparado?: string}[]>([]);
    const [pessoas, setPessas] = useState<{id: number, nome: string}[]>([])

    useEffect(()=>{
            carregarMateriais()
    },[])

    async function carregarMateriais(){
        // const k = JSON.parse(data).key;
        // const key = k.s_key_apiKey
        try {
            const endpoint = `/api/apiEstoque?action=getMovEstoque`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json()

                const tmpMaterialData = [...materialData];
                const tmpStatus = [...materialStatus]
                returnDataApi.bruto.map((a: any)=>{
                    tmpMaterialData.push(a)
                    tmpStatus.push(a)
                })

                returnDataApi.item.map((b: any)=>{
                    tmpMaterialData.push(b)
                    tmpStatus.push(b)
                })

                returnDataApi.produto.map((c: any)=>{
                    tmpMaterialData.push(c)
                })

                setMaterialData(tmpMaterialData);
                setMaterialStatus(tmpStatus);

                setPessas(returnDataApi.pessoas)
            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    function confirmData(){
        if(material == ""){
            alert("Informe um material");
        }else if(quantidade == "" || quantidade <= "0"){
            alert("Informe uma quantidade valida");
        }else if(date == ""){
            alert("Informe a data");
        }else if(type == "1" && solicitante == ""){
            alert("Informe o nome do solicitante");
        }else if(type == "1" && emailSolicitante == ""){
            alert("Informe o e-mail do solicitante");
        }else if(type == "2" && status == ""){
            alert("Informe o status que o material vai ser movimentado");
        }else if(type == "2" && acompanhante == ""){
            alert("Informe quem acompanhou a parodução");
        }else{
            let tabela, qtdAnterior;
            materialData.map((a)=>{
                if(material == a.id){
                    // setTabela(a.tabela);
                    tabela = a.tabela;
                    qtdAnterior = a.qtd;
                }
            })
            SaveData(tabela, qtdAnterior);
        }
    }

    async function SaveData(tabela: any, qtdAnterior: any){
        let action, qtd;
        
        if(type == "0"){
            action = "movEntrada";
            qtd = Number(quantidade) + Number(qtdAnterior);
        }else if(type == "1" && qtdAnterior > "0"){
            action = "movSaida";
            qtd = Number(qtdAnterior) - Number(quantidade);
        }else if(type == "2"){
            action = "movStatus";
        }else if(type == "1" && qtdAnterior <= "0"){
            alert("não é possivel diminuir a quantidade")
        }

        try {
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: material,
                    qtd: qtd,
                    date: date,
                    fornecedor: fornecedor,
                    solicitante: solicitante,
                    emailSolicitante: emailSolicitante,
                    status: status,
                    acompanhante: acompanhante,
                    pessoas: pessoas,
                    tabela: tabela,
                    action: action
                })
            })
            if (response.status === 200) {
                const returnDataApi = await response.json()

            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
        props.set(false);
    }

    async function getInitData(){

    }

    return(
        <div className='fixed z-[200] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
            <div className='h-[80%] md:w-[60%] w-[90%] bg-white rounded-xl flex flex-col'>
                <div className='w-[100%] bg-[#1394DA] h-[10%] rounded-t-xl flex items-center justify-between'>
                    <p className='md:ml-10 ml-5 text-xl text-white'>Movimentar estoque</p>
                    <p onClick={()=>props.set(false)} className='text-xl text-white md:mr-10 mr-5 cursor-pointer'>X</p>
                </div>
                <div className='w-[100%] h-[90%] rounded-b-xl md:pl-5 pl-2 md:pr-5 pr-2 flex flex-col gap-4'>
                    <div className='w-[100%] h-[25%] flex flex-col justify-end gap-2 pl-2'>
                        <p className='text-sm'>Tipo de movimentação</p>
                        <select className='md:w-[30%] border-2 rounded-xl p-1 text-sm' value={type} onChange={(evt)=>{setType(evt.target.value)}}>
                            <option value="0">Entrada</option>
                            <option value="1">Saida</option>
                            <option value="2">Alterar Status</option>
                        </select>
                    </div>
                    <div className='border-2 w-[100%] h-[75%] mb-5 rounded-xl flex md:flex-col flex-wrap md:flex-nowrap overflow-auto overflow-x-hidden pt-5 gap-5 pb-5'>
                        <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-0 w-full md:ml-3'>
                            <div className='h-full flex flex-col gap-2 justify-center items-start'>
                                <p className='ml-2'>Material:</p>
                                <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-[200px]' value={material} onChange={(evt)=>{setMaterial(evt.target.value)}}>
                                    <option value="" hidden>Selecione</option>
                                    {type != "2" ?
                                        <>
                                            {materialData.map((o, index)=>(
                                                <option key={index} value={o.id}>{o.nome}</option>
                                            ))}
                                        </>
                                    :   <>
                                            {materialStatus.map((o, index)=>(
                                                <option key={index} value={o.id}>{o.nome}</option>
                                            ))}
                                        </>
                                    }
                                </select>
                            </div>
                            <div className='h-full flex flex-col justify-center items-start md:pl-5 md:pr-5 gap-2'>
                                <p className='ml-2'>Quantidade:</p>
                                <input type='number' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={quantidade} onChange={(evt)=>{SetQuantidade(evt.target.value)}}></input>
                            </div>
                        </div>
                        <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-0 w-full md:ml-3'>
                            <div className='h-full flex flex-col gap-2 justify-center items-start'>
                                <p className='ml-2'>Data {type == "0" ? "de entrada:" : type == "1" ? "de saida:" : "da movimentação:"}</p>
                                <input type='datetime-local' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full h-[26px]' value={date} onChange={(evt)=>{setDate(evt.target.value)}}></input>
                            </div>
                            <div className='h-full flex flex-col justify-center items-start md:pl-5 md:pr-5 gap-2'>
                                {type == "0" ? 
                                    <>
                                        <p className='ml-2'>Origem fornecedor</p>
                                        <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={fornecedor} onChange={(evt)=>{setFornecedor(evt.target.value)}}></input>
                                    </>:
                                type == "1" ?
                                    <>
                                        <p className='ml-2'>Nome do solicitante</p>
                                        <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={solicitante} onChange={(evt)=>{setSolicitante(evt.target.value)}}></input>
                                    </>:
                                    <>
                                        <p className='ml-2'>Movimentar para:</p>
                                        <select className='border-2 rounded-lg pl-2 pr-2 md:mr-2 w-[250px] md:w-[170px] lg:w-[200px] mr-0' value={status} onChange={(evt)=>{setStatus(evt.target.value)}}>
                                            <option value="" hidden>Selecione</option>
                                            <option value="0">Preparado</option>
                                            <option value="1">Item</option>
                                        </select>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='md:h-[80px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-7 w-full md:ml-3'>
                            <div className='h-full flex flex-col gap-2 justify-center items-start'>
                                {type == "1"?
                                    <>
                                        <p className='ml-2'>Email do solicitante</p>
                                        <input type='text' className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={emailSolicitante} onChange={(evt)=>{setEmailSolicitante(evt.target.value)}}></input>
                                    </>:
                                type == "2" &&
                                    <>
                                        <p className='ml-2'>Acompanhou a produção:</p>
                                        <select className='border-2 rounded-lg pl-2 pr-2 w-[250px] md:w-full' value={acompanhante} onChange={(evt)=>{setAcompanhante(evt.target.value)}}>
                                            <option value="" hidden>Selecione</option>
                                            {pessoas.map((p, index)=>(
                                                <option key={index} value={p.id}>{p.nome}</option>
                                            ))}
                                        </select>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='md:w-[80%] w-[95%] flex justify-end items-end'>
                            <button className='h-[30px] w-[120px] bg-[#53D420] rounded-xl text-white' onClick={()=>{confirmData()}}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}