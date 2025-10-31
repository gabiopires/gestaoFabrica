import Configuracao from "../Configuracao/Configuracao";
import Image from "next/image";
import BotaoEditar from "../Gerais/BotaoEditar";
import BotaoDeletar from "../Gerais/BotaoDetetar";

interface LinhaListaCelulaProps{
    dados:any;
    funcao:any;
}

export default function LinhaListaCelula(props:LinhaListaCelulaProps){
    return (
        <div className="linhaGrid">
            <div className="c70">{props.dados.n_id_celula}</div>
            <div className="c300">{props.dados.s_nome_celula}</div>
            <div className={"c150 "+(props.dados.n_ativo_celula===0?'text-red-600':'text-black')}>{props.dados.n_ativo_celula===1?"Sim":"Não"}</div>
            <div className="c300">{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol">
                <BotaoEditar title='Editar Célula' path="/celula/editarCelula/" id={props.dados.n_id_celula}/>
                <BotaoDeletar title="Deletar Célula" funcao={props.funcao}/>
            </div>
        </div>
    );
}
  