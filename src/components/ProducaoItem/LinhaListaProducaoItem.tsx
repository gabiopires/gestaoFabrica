import { useState } from "react";
import Image from "next/image";

interface LinhaListaProps{
    dados:any;
    fmodalMudarStatus:any;
    fmodalMudarFabrica:any;
    fmodalMudarStatusProduto:any;
    setIdpedproditem:any;
    setIdpedprod:any;
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

export default function LinhaListaProducaoItem(props:LinhaListaProps){
    const [mostrarDados,setMostrarDados]=useState<boolean>(false)
    
    function cliqueMudaStatusItem(id:any){
        props.setIdpedproditem(id)
        props.fmodalMudarStatus(true)
    }

    function cliqueMudaStatusProduto(id:any){
        props.setIdpedprod(id)
        props.fmodalMudarStatusProduto(true)
    }

    function cliqueMudaFabrica(id:any){
        props.setIdpedproditem(id)
        props.fmodalMudarFabrica(true)
    }

    return (
        <div className={`flex flex-col`} data-idfabrica={props.dados.n_id_fabrica} key={Math.random()}>
            <div key={Math.random()} className={`linhaGrid cursor-pointer ` + corLinhaPedido(props.dados.n_status_pedidoProdutoItem)} onClick={()=>setMostrarDados(!mostrarDados)}>
                <div className="c100">{props.dados.n_id_pedido}</div>
                <div className="c150">{props.dados.n_id_pedidoProduto}</div>
                <div className="c190">{props.dados.n_id_pedidoProdutoItem}</div>
                <div className="c200">{props.dados.s_nome_produto}</div>
                <div className="c200">{props.dados.s_nome_item}</div>
                <div className="c200">{props.dados.s_desc_statuspedido}</div>
                <div className="c200">{props.dados.s_nome_fabrica}</div>
                <div className="c200">{props.dados.s_desc_prioridadepedido}</div>
                <div className="c70 ccol">
                    <Image width={20} height={0} alt='' title="Alterar Fábrica do ítem" src="/images/fabrica.svg" onClick={()=>cliqueMudaFabrica(props.dados.n_id_pedidoProdutoItem)}/>
                    <Image width={20} height={0} alt='' title="Alterar Status do ítem" src="/images/change_i.svg" onClick={()=>cliqueMudaStatusItem(props.dados.n_id_pedidoProdutoItem)}/>
                    <Image width={20} height={0} alt='' title="Alterar Status do Produto" src="/images/change_p.svg" onClick={()=>{cliqueMudaStatusProduto(props.dados.n_id_pedidoProduto)}}/>
                </div>
            </div>
        </div>
    );
}
  