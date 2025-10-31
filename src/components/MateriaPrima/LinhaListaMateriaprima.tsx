import BotaoDeletar from "../Gerais/BotaoDetetar";
import BotaoEditar from "../Gerais/BotaoEditar";

interface LinhaListaProps{
    dados:any;
    funcao:any;
}

export default function LinhaListaMateriaprima(props:LinhaListaProps){
    return (
        <div className="linhaGrid">
            <div className="c70">{props.dados.n_id_materiaprima}</div>
            <div className="c350">{props.dados.s_nome_materiaprima}</div>
            <div className="c350">{props.dados.s_desc_materiaprima}</div>
            <div className="c150">{props.dados.n_qtde_materiaprima}</div>
            <div className="c150">{props.dados.s_desc_unidademedida}</div>
            <div className="c100 ccol">
                <BotaoEditar title="Editar Matéria Prima" path="/materiaprima/editarMateriaprima" id={props.dados.n_id_materiaprima}/>
                <BotaoDeletar title="Deletar Matéria Prima" funcao={props.funcao}/>
            </div>
        </div>
    );
}  