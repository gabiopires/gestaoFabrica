import { useState,useEffect } from "react";
import { Transition } from '@headlessui/react';
import BotaoInfo from "../Gerais/BotaoInfo";

interface LinhaHistoricoProps{
    dados:any;
    // itens:[];
    // funcao:any;
}

export default function LinhaHistoricoPedidos(props:LinhaHistoricoProps){
    const [mostrarItens,setMostrarItens]=useState<boolean>(false)
    const [produtos,setProdutos]=useState<any>("")
    console.log(props.dados)

    useEffect(()=>{
        setProdutos(props.dados.produto.map((p:any)=>{
            return(
                <div className="flex produtoH" key={Math.random()*999999999999999999}>
                    <div className="c1_produtoItem_historico">{p.n_id_produto}</div>
                    <div className="c2_produtoItem_historico">{p.s_nome_produto}</div>
                    <div className="c3_produtoItem_historico">{p.s_desc_produto}</div>
                </div>
            )
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const linhas = (n_produto: any) => {
        let produtoIds = n_produto.produto;
        console.log(produtoIds)
        return produtoIds.forEach((e:any)=>{
            console.log(e.n_id_produto)
            return e.n_id_produto;
        })
    };

    console.log(linhas(props.dados))

    const statusP = (n_status:number)=>{
        let array = ["Aguardando","Fila Produção", "Produzindo", "Finalizado", "Bloqueado"];
        return array[n_status-1];
    }

    const data = ((n_data:string)=>{
        const dateH = n_data;
        const date = dateH.split("T");
        const dt = date[0].split("-");
        return dt[2] + "/" + dt[1] + "/" + dt[0];
    })

    const hora = ((n_hora:string)=>{
        const dateH = n_hora;
        const date = dateH.split("T");
        const hr = date[1].split(":");
        return hr[0] + ":" + hr[1];
    })

    function mostrarInfo(){
        setMostrarItens(previousState => !previousState)
    }

    return (
        <div className={``+(mostrarItens&&"outline outline-1")}>
            <div className={`linhaGrid`}>
                <div className="c1_historico">{props.dados.n_id_pedido}</div>
                <div className="c2_historico">{data(props.dados.dt_data_pedido)}</div>
                <div className="c3_historico">{hora(props.dados.dt_data_pedido)}</div>
                <div className="c4_historico">{statusP(props.dados.n_status_pedido)}</div>
                <div className="c5_historico">
                    <BotaoInfo title="Listar Itens do produto" funcao={mostrarInfo}/>
                </div> 
            </div>
            <Transition
                show={mostrarItens}
                enter="transition-opacity duration-0"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >            
                {produtos}
            </Transition>
        </div>
    );
}
  