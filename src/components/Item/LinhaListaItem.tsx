import BotaoOperLinhaGrid from "../BotaoOperLinhaGrid";

interface LinhaListaProps{
    dados:any;
    funcoes:any[];
}

export default function LinhaListaItem(props:LinhaListaProps){
    return (
        <div key={props.dados.n_id_item} className="linhaGrid">
            <div className="c70">{props.dados.n_id_item}</div>
            <div className="c300">{props.dados.s_nome_item}</div>
            <div className="c500">{props.dados.s_desc_item}</div>
            <div className="c150 ccol">
            <BotaoOperLinhaGrid prio="" title="Ver Matérias Primas do Item" path="" funcao={props.funcoes[2]} tipo="remover" icone="/images/list.svg" id={props.dados.n_id_item}/>
                <BotaoOperLinhaGrid prio="" title="Ver Etapas do Item" path="" funcao={props.funcoes[1]} tipo="remover" icone="/images/foots.svg" id={props.dados.n_id_item}/>
                <BotaoOperLinhaGrid prio="" title="Editar Item" path="/item/editarItem" funcao="" tipo="editar" icone="/images/edit.svg" id={props.dados.n_id_item}/>
                <BotaoOperLinhaGrid prio="" title="" path="Deletar Item" funcao={props.funcoes[0]} tipo="remover" icone="/images/delete.svg" id={props.dados.n_id_item}/>
            </div>
        </div>
    );
}
  