import BotaoEditar from "../Gerais/BotaoEditar";
import BotaoDeletar from "../Gerais/BotaoDetetar";
import Configuracao from "../Configuracao/Configuracao";
import Image from "next/image";

interface LinhaListaFabricaProps{
    dados:any;
    funcao:any;
}

export default function LinhaListaFabrica(props:LinhaListaFabricaProps){
    return (
        <div className="linhaGrid">
            <div className="c50">{props.dados.n_id_fabrica}</div>
            <div className="c250">{props.dados.s_nome_fabrica}</div>
            <div className="c250">{props.dados.s_cidade_fabrica}</div>
            <div className="c200">{props.dados.s_tel_resp_fabrica}</div>
            <div className="c300">{props.dados.s_email_fabrica}</div>
            <div className="c100 ccol">
                {props.dados.n_id_fabrica==Configuracao.fabrica?(<BotaoEditar title="Editar Fábrica" path="/fabrica/editarFabrica" id={props.dados.n_id_fabrica}/>):(<Image title='Bloqueda para edição' alt='Bloqueada para edição' className='iconeOper' width={0} height={0} src='/images/block.svg'/>)}
                <BotaoDeletar title="Deletar Fábrica" funcao={props.funcao}/>
            </div>
        </div>
    );
}
  