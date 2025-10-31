import BotaoListarItensProdutos from "../BotaoListarItensProdutos";
import BotaoOperListaProdutos from "../BotaoOperListaProdutos";
import { Transition } from '@headlessui/react'
import { useState } from "react";

interface LinhaListaProps{
    dados:any;
    funcao:any;
    itens:any[];
}

export default function LinhaListaProduto_v2(props:LinhaListaProps){
    const [mostrarItens,setMostrarItens]=useState<boolean>(false)
    {console.log(props.itens)}
    return (
        <>
            <div className="linhaGrid acordeon">
                <div className="c1_produto">{props.dados.n_id_produto}</div>
                <div className="c2_produto">{props.dados.s_nome_produto}</div>
                <div className="c3_produto">
                    <BotaoListarItensProdutos title="Listar Itens do produto" estado={mostrarItens} funcao={setMostrarItens} icone="/images/list.svg"/>
                    <BotaoOperListaProdutos prio="" title="Editar Produto" path="/produto/editarProduto" funcao="" tipo="editar" icone="/images/edit.svg" id={props.dados.n_id_produto}/>
                    <BotaoOperListaProdutos prio="" title="" path="Deletar Produto" funcao={props.funcao} tipo="remover" icone="/images/delete.svg" id={props.dados.n_id_produto}/>
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
                <div className="flex outline outline-1">
                    <div className="c1_produtoItem">ID</div>
                    <div className="c2_produtoItem">ITEM</div>
                    <div className="c3_produtoItem">STATUS</div>
                </div>
            </Transition>
        </>
    );
}
  