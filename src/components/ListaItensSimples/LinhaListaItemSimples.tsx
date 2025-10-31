import BotaoOperLinhaGridSimples from "../BotaoOperLinhaGridSimples";

interface LinhaListaProps{
    dados:any;
    funcaoBtn:any
    tipobtn:string
}

export default function LinhaListaItemSimples(props:LinhaListaProps){

    function titlebtn(tipo:string){
        let tp=""
        if(tipo==="add"){
            tp="Adicionar"
        }if(tipo==="del"){
            tp="Deletar"
        }
        return tp+" Item"
    }

    return (
        <div key={props.dados.n_id_item} className="linhaGrid">
            <div className="c50">{props.dados.n_id_item}</div>
            <div className="c100pc">{props.dados.s_nome_item}</div>
            <div className="c50 ccol">
                <BotaoOperLinhaGridSimples title={titlebtn(props.tipobtn)} funcaoBtn={(evt)=>props.funcaoBtn(evt)} tipo={props.tipobtn} id={props.dados.n_id_item}/>
            </div>
        </div>
    );
}
  