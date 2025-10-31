import BotaoListarItensProdutos from "../BotaoListarItensProdutos";
import BotaoImagensProduto from "../BotaoImagensProduto";
import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoEditar from "../Gerais/BotaoEditar";
import { Transition } from '@headlessui/react'
import { useState } from "react";

interface LinhaListaProps{
    dados:any;
    funcao:any;
    itens:any[];
}

export default function LinhaListaItem(props:LinhaListaProps){
    const [mostrarItens,setMostrarItens]=useState<boolean>(false)

    function criarLinhasGrid(){
        const ld=props.itens.map((e:any)=>{
            return (
                <div className="flex" key={Math.random()*9999999999999999999}>
                    <div className="c70">{e.n_id_item}</div>
                    <div className="c500">{e.s_nome_item}</div>
                    <div className="c50">{e.n_status_produtoItem}</div>
                </div>
            )
        })
        return ld;
    }

    return (
        <div className={``+(mostrarItens&&"outline outline-1")}>
            <div className={`linhaGrid`} key={Math.random()*9999999999999999999}>
                <div className="c70">{props.dados.n_id_produto}</div>
                <div className="c400">{props.dados.s_nome_produto}</div>
                <div className="c150 ccol">
                    <BotaoListarItensProdutos title="Listar Itens do produto" estado={mostrarItens} funcao={setMostrarItens} icone="/images/list.svg"/>
                    <BotaoImagensProduto title="Ver imagens do produto" id={props.dados.n_id_produto} icone="/images/picture.svg"/>
                    <BotaoEditar title="Editar Produto" path="/produto/editarProduto" id={props.dados.n_id_produto}/>
                    <BotaoDeletar title="Detelar Produto" funcao={props.funcao}/>
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
                {criarLinhasGrid()}
            </Transition>
        </div>
    );
}
  