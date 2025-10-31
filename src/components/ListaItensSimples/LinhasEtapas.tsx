import BotaoAcao from "../Gerais/BotaoAcao";
import BotaoDeletar from "../Gerais/BotaoDetetar";

interface LinhaListaProps{
    dados:any;
    funcaoBtn:(evt:HTMLElement)=>void;
    moverEtapaCima:(evt:HTMLElement,ordem:string)=>void;
    moverEtapaBaixo:(evt:HTMLElement,ordem:string)=>void;
}

export default function LinhaListaEtapa(props:LinhaListaProps){
    return (
        <div key={props.dados.i} className="linhaGrid" data-idfabrica={props.dados.n_id_fabrica} data-idunidade={props.dados.n_id_unidade} data-idprograma={props.dados.n_id_programa} data-id={props.dados.i} data-idetapa={props.dados.n_id_etapa}>
            <div className="c250">{props.dados.s_nome_unidade==null?"-":props.dados.s_nome_unidade}</div>
            <div className="c200">{props.dados.s_nome_programa}</div>
            <div className="c200">{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol" data-id={props.dados.i} data-idetapa ={props.dados.n_id_etapa}>
                <BotaoDeletar funcao={props.funcaoBtn} title="Apagar"/>
                <BotaoAcao icone="/images/arrow_up.svg" funcao={props.moverEtapaCima} title="move para cima"/>
                <BotaoAcao icone="/images/arrow_down.svg" funcao={props.moverEtapaBaixo} title="move para baixo"/>
            </div>
        </div>
    );
}
  