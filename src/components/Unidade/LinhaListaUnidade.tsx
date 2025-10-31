import Configuracao from "../Configuracao/Configuracao";
import Image from "next/image";
import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoEditar from "../Gerais/BotaoEditar";

interface LinhaListaProps{
    dados:any;
    funcao:any;
}

function botoes(fn:any,uni:number){
    return(
        <div className="flex ccol c100pc">
            <BotaoEditar title="Editar Unidade" path="/unidade/editarUnidade" id={uni}/>
            <BotaoDeletar title="Remover Unidade" funcao={fn}/>
        </div>
    )
}

export default function LinhaListaUnidade(props:LinhaListaProps){
    return (
        <div className="linhaGrid">
            <div className="c70">{props.dados.n_id_unidade}</div>
            <div className="c300">{props.dados.s_nome_unidade}</div>
            <div className={"c150 "+(props.dados.n_ativo_unidade===0?'text-red-600':'text-black')}>{props.dados.n_ativo_unidade===1?"Sim":"Não"}</div>
            <div className={"c300"}>{props.dados.s_nome_celula}</div>
            <div className={"c300"}>{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol">
                {Configuracao.fabrica==props.dados.n_id_fabrica?botoes(props.funcao,props.dados.n_id_unidade):<Image width={0} height={0} alt='' src="/images/block.svg"/>}
            </div>
        </div>
    );
}
  