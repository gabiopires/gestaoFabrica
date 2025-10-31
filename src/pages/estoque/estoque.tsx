import Topo from '@/components/Topo/Topo';
import React, {useState, useEffect} from 'react';
import MovEstoque from "../../components/MovEstoque/MovEstoque"

export default function PaginaEstoque() {

    // const [produto, setProduto] = useState([100, 200, 300, 400, 500]);
    const [bruto, setBruto] = useState<{id: number, nome: string, qtdBruto: number, qtdPreparado: number}[]>([]);
    const [item, setItem] = useState<{id: number, nome: string, qtd: number}[]>([]);
    const [movEstoque, setMovEstoque] = useState(false);

    useEffect(()=>{
        carregarEstoques()
    },[])


    const metricsProduto = [{text:"finalizados",desc:"50"},{text:"prontos para montar",desc:"10"},{text:"necessário produzir",desc:"5"},{text:"necessário comprar",desc:"50"}]
    const metricsEntreProdutos = [{item: "Macete", qtdFinalizado: 300, qtdPronto: 100,},{item: "Garrafinha", qtdFinalizado: 300, qtdPronto: 100,}]

    async function carregarEstoques(){
        // const k = JSON.parse(data).key;
        // const key = k.s_key_apiKey
        try {
            const endpoint = `/api/apiEstoque?action=getInitData`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json()
                setBruto(returnDataApi.bruto)
                setItem(returnDataApi.item)
            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return (
        <div className='h-screen overflow-hidden'>
            {movEstoque && <MovEstoque set={setMovEstoque}/>}
            <Topo />
            <div className='flex flex-col items-end h-[calc(100%-70px)]'>
                <div className='bg-[#1394DA] md:w-[calc(100%-60px)] w-full h-[80px] shadow-[0_5px_5px_rgba(0,0,0,0.3)] flex justify-center items-end'>
                    <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Estoque</p>
                    <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
                        <select className='md:w-[250px] w-[150px] h-[30px] md:mb-4 md:mr-10 ml-5 mr-5 rounded-xl bg-[#FFF] shadow-[0px_3px_10px_rgba(0,0,0,0.3)] cursor-pointer'>
                            <option>Todos</option>
                            <option>Macete</option>
                            <option>Garrafinha</option>
                        </select>
                        <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[30px] rounded-2xl bg-[#FFF] shadow-[0px_3px_10px_rgba(0,0,0,0.3)] hover:bg-slate-300 transition duration-300' onClick={()=>{setMovEstoque(true)}}>
                            Movimentar estoque
                        </button>
                    </div>
                </div>
                <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-80px)] flex flex-col items-center overflow-auto'>
                    <div className='md:min-h-[70px] md:w-[80%] w-[90%] flex flex-col border-b-0 border-r-0 mt-5 border-2'>
                        <div className='flex h-full overflow-hidden md:flex-nowrap flex-wrap'>
                            {metricsProduto.map((a,index)=>(
                                <div key={index} className='w-[50%] h-[65px] md:h-full flex border-b-2 items-center justify-center text-sm text-center'>
                                    <text className='w-full h-full flex justify-end items-center mr-2 ml-2 text-right'>{a.text}:</text>
                                    <text className='w-full h-full text-3xl flex justify-start items-center border-r-2'>{a.desc}</text>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='md:w-[80%] w-[90%] md:h-[100%] flex md:flex-row flex-col'>
                        <div className='w-[100%] flex flex-col md:h-[100%]'>
                            <div className='h-[60%]'>
                                <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2 h-[25px]'>Bruto/Preparado</p>
                                <div className='md:ml-10 md:mr-2 rounded-lg md:h-[calc(100%-55px)] overflow-hidden border-2'>
                                    <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
                                        <p className='w-[60%] flex items-center justify-center text-sm text-center leading-none'>Nome</p>
                                        <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>Bruto</p>
                                        <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>Preparado</p>
                                    </div>
                                    <div className='md:h-[calc(100%-35px)] h-auto overflow-auto'>
                                        {bruto.map((a,index)=>(
                                            <div key={index} className='border-b-2 h-[35px] flex overflow-auto'>
                                                <p className='w-[60%] flex items-center justify-center text-sm text-center leading-none'>{a.nome}</p>
                                                <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>{a.qtdBruto}</p>
                                                <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>{a.qtdPreparado== null ? 0 : a.qtdPreparado}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='h-[40%]'>
                                <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2'>Comparação entre produtos</p>
                                <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg'>
                                    <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
                                        <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>Nome</p>
                                        <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>Finalizados</p>
                                        <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>Prontos para montar</p>
                                    </div>
                                    <div className='h-auto overflow-auto'>
                                        {metricsEntreProdutos.map((a,index)=>(
                                            <div key={index} className='border-b-2 h-[35px] flex'>
                                                <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.item}</p>
                                                <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.qtdFinalizado}</p>
                                                <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.qtdPronto}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[100%] md:h-[100%]'>
                            <p className='mt-5 md:mr-12 mr-5 md:ml-5 ml-8 mb-2'>Item</p>
                            <div className='border-2 md:mr-10 md:ml-2 h-[calc(100%-70px)] rounded-lg'>
                                <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pr-3'>
                                    <p className='w-[70%] flex items-center justify-center text-sm text-center leading-none'>Nome</p>
                                    <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>Quantidade</p>
                                </div>
                                <div className='md:h-[calc(100%-35px)] h-auto md:overflow-auto'>
                                    {item.map((a,index)=>(
                                        <div key={index} className='border-b-2 h-[35px] flex'>
                                            <p className='w-[70%] flex items-center justify-center text-sm text-center leading-none'>{a.nome}</p>
                                            <p className='w-[20%] flex items-center justify-center text-sm text-center leading-none'>{a.qtd}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}