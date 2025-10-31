import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoEditar from "../Gerais/BotaoEditar";
import Configuracao from "../Configuracao/Configuracao";
import Image from "next/image";

interface LinhaListaProps{
    dados:any;
    funcao:any;
}

export default function LinhaListaMaquina(props:LinhaListaProps){
    return (
        <div className="linhaGrid">
            <div className="c70">{props.dados.n_id_maquina}</div>
            <div className="c300">{props.dados.s_nome_maquina}</div>
            <div className="c150">{props.dados.s_codigo_maquina}</div>
            <div className={"c100 "+(props.dados.n_ativo_maquina===0?'text-red-600':'text-black')}>{props.dados.n_ativo_maquina===1?"Sim":"Não"}</div>
            <div className="c300">{props.dados.s_nome_unidade}</div>
            <div className="c150">{props.dados.s_desc_statusmaquina}</div>
            <div className="c150">{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol">
                {props.dados.n_id_fabrica==Configuracao.fabrica?(<BotaoEditar title="Editar Máquina" path="/maquina/editarMaquina" id={props.dados.n_id_maquina}/>):(<Image title='Bloqueda para edição' alt='Bloqueada para edição' className='iconeOper' width={0} height={0} src='/images/block.svg'/>)}
                {props.dados.n_id_fabrica==Configuracao.fabrica?(<BotaoDeletar title="Deletar Máquina" funcao={props.funcao}/>):(<Image title='Bloqueda para edição' alt='Bloqueada para edição' className='iconeOper' width={0} height={0} src='/images/block.svg'/>)}
            </div>
        </div>
    );
}
  