import { useState,useEffect } from "react";
import { Transition } from '@headlessui/react'
import Image from "next/image";

interface LinhaListaProps{
    dados:any;
    sitListaPeds:any;
    abrirFecharLista:any;
}

function dataFormatada(data:any){
    const dt=new Date(data)
    const dia=dt.getDate()
    const mes=dt.getMonth()
    const ano=dt.getFullYear()
    return `${dia<10?'0'+dia:dia}/${mes<10?'0'+mes:mes}/${ano}`;
}

function statusPedido(status:number){
    let sp=null;
    if(status===1){
        sp="Aguardando"
    }else if(status===2){
        sp="Fila Produção"
    }else if(status===3){
        sp="Produzindo"
    }else if(status===4){
        sp="Finalizado"
    }else if(status===5){
        sp="Bloqueado"
    }
    return sp
}

function prioridadePedido(pri:number){
    let pp=null;
    if(pri===1){
        pp=`Master (1)`
    }else if(pri===2){
        pp="Prioridade (2)"
    }else if(pri===3){
        pp="Padrão (3)"
    }
    return pp
}

function corLinhaPedido(sp:any){
    let cor=""
    if(sp=='2'){
        cor="filaproducao"
    }else if(sp=='3'){
        cor="produzindo"
    }else if(sp=='4'){
        cor="finalizado"
    }
    return cor
}

function ledPedido(sp:any){
    let led=""
    if(sp==2){
        led="/images/led_amarelo.png"
    }else if(sp==3){
        led="/images/led_azul.png"
    }else if(sp==4){
        led="/images/led_verde.png"
    }
    return led
}

export default function LinhaListaProducao(props:LinhaListaProps){
    const [mostrarDados,setMostrarDados]=useState<boolean>(false)

    useEffect(()=>{
        setMostrarDados(props.sitListaPeds[props.dados.n_id_pedido]) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="flex flex-col">
            <div key={props.dados.n_id_pedido} className="linhaGrid cursor-pointer" onClick={
                ()=>{
                    props.sitListaPeds[props.dados.n_id_pedido]=!props.sitListaPeds[props.dados.n_id_pedido]
                    setMostrarDados(props.sitListaPeds[props.dados.n_id_pedido])    
                }
            }>
                <div className="c200">{props.dados.n_id_pedido}</div>
                <div className="c200">{dataFormatada(props.dados.dt_data_pedido)}</div>
                <div className="c200 flex justify-start items-center"><Image width={0} height={0} alt='' className='ledPedido' src={ledPedido(props.dados.n_status_pedido)}/>&nbsp;{statusPedido(props.dados.n_status_pedido)}</div>
                <div className="c200 top-[-100px]">{prioridadePedido(props.dados.n_prioridade_pedido)}</div>         
            </div>
            <Transition               
                show={mostrarDados}
                enter="transition-opacity duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"                
            >
                <div className="flex border border-blue-950">
                    <div className="flex w-full p-1">
                        <div className="flex flex-col w-full">
                            {
                                props.dados.produtos.map((p:any)=>{
                                    return(
                                        <div className="flex flex-col w-full" key={Math.random()*9999999999999999999}>
                                            <div className="flex text-xs justify-between items-center border w-full  bg-zinc-700 text-white">
                                                <div className="">ID Produto Pedido:{p.n_id_pedidoProduto}</div>
                                                <div className="">ID Produto:{p.n_id_produto}</div>
                                                <div className="">Produto:{p.s_nome_produto}</div>
                                                <div className="">Quantidade:{p.n_qtde_pedidoProduto}</div>
                                                <div className="flex items-center">Status:&nbsp;<Image width={0} height={0} alt='' className='ledPProduto' src={ledPedido(p.n_status_pedidoProduto)}/>&nbsp;{p.s_desc_statuspedido}</div>
                                                <div className="">Prioridade:{p.s_desc_prioridadepedido}</div>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                {
                                                    p.itens.map((i:any)=>{
                                                        return(
                                                            <div className="flex flex-col w-full pl-4" key={Math.random()*9999999999999999999}>
                                                                <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "+ corLinhaPedido(i.n_status_pedidoProdutoItem)}>
                                                                    <div className="">ID Pedido Produto Item:{i.n_id_pedidoProdutoItem}</div>
                                                                    <div className="">ID Pedido Produto:{i.n_id_pedidoProduto}</div>
                                                                    <div className="">Item:{i.s_nome_item}</div>
                                                                    <div className="">Status:{i.s_desc_statuspedido}</div>
                                                                    <div className="">Prioridade:{i.s_desc_prioridadepedido}</div>
                                                                    <div className="">Fábrica:{i.s_nome_fabrica}</div>
                                                                </div>
                                                                <div className="flex flex-col w-full">
                                                                    {
                                                                        i.etapas.map((e:any)=>{
                                                                            return(
                                                                                <div className="flex flex-col w-full pl-4" key={Math.random()*9999999999999999999}>
                                                                                    <div className="flex text-xs justify-between items-center w-full">
                                                                                        <div className="c100">ID Etapa:{e.n_id_etapa}</div>
                                                                                        <div className="c200">Célula:{e.s_nome_celula}</div>
                                                                                        <div className="c200">Status:{e.s_desc_statusetapa}</div>
                                                                                        <div className="c200">Ordem:{e.n_ordem_etapa}</div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
}
  