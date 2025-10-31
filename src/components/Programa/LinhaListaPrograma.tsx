import BotaoOperLinhaGrid from "../BotaoOperLinhaGrid";
import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoEditar from "../Gerais/BotaoEditar";
import Configuracao from "../Configuracao/Configuracao";
import Image from "next/image";

interface LinhaListaProps{
    dados:any;
    funcao:any;
}

function bototes(fn:any,id:number){
    return(
        <div className="flex ccol c100pc">
            
            <BotaoDeletar title="Deletar Programa" funcao={fn}/>
        </div>
    )
}

export default function LinhaListaPrograma(props:LinhaListaProps){
    return (
        <div className="linhaGrid">
            <div className="c70">{props.dados.n_id_programa}</div>
            <div className="c300">{props.dados.s_nome_programa}</div>
            <div className="c300">{props.dados.s_codigo_programa}</div>
            <div className="c300">{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol">
                {props.dados.n_id_fabrica==Configuracao.fabrica?(<BotaoEditar title="Editar Programa" path="/programa/editarPrograma" id={props.dados.n_id_programa}/>):(<Image title='Bloqueda para edição' alt='Bloqueada para edição' className='iconeOper' width={0} height={0} src='/images/block.svg'/>)}
                {props.dados.n_id_fabrica==Configuracao.fabrica?(<BotaoDeletar title="Deletar Fábrica" funcao={props.funcao}/>):(<Image title='Bloqueda para edição' alt='Bloqueada para edição' className='iconeOper' width={0} height={0} src='/images/block.svg'/>)}
            </div>
        </div>
    );
}
  