import BotaoEditar from "../Gerais/BotaoEditar";
import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoInfo from "../Gerais/BotaoInfo";
import { useState } from "react";
import { Transition } from '@headlessui/react'

interface LinhaListaProps{
    dados:any;
    funcao:any;
}

export default function LinhaListaMaquina(props:LinhaListaProps){
    const [mostrarDados,setMostrarDados]=useState<boolean>(false)

    return (
        <div className="flex flex-col">
            <div className="linhaGrid">
                <div className="c70">{props.dados.n_id_pessoa}</div>
                <div className="c250">{props.dados.s_nome_pessoa}</div>
                <div className="c150">{props.dados.s_desc_tipopessoa}</div>
                <div className="c150">{props.dados.s_desc_statuspessoa}</div>
                <div className="c300">{props.dados.s_nome_empresa}</div>
                <div className="c120 ccol ccenter">
                    <BotaoInfo title="Telefones e E-Mail Pessoa" funcao={()=>setMostrarDados(!mostrarDados)}/>
                    <BotaoEditar title="Editar Pessoa" path="/pessoa/editarPessoa" id={props.dados.n_id_pessoa}/>
                    <BotaoDeletar title="Deletar Pessoa" funcao={props.funcao}/>
                </div>
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
                <div className="flex w-full border pl-2 pr-2">
                    <div className="w-[33%]">{props.dados.s_telefone1_pessoa}</div>
                    <div className="w-[33%]">{props.dados.s_telefone2_pessoa}</div>
                    <div className="w-[34%]">{props.dados.s_email_pessoa}</div>
                </div>
            </Transition>            
        </div>
    );
}
  