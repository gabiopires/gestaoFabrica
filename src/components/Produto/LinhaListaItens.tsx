import BotaoDeletar from "../Gerais/BotaoDetetar";

interface LinhaListaItensProps{
    dados:any;
    funcaoBtn:any
    tipobtn:string
}

export default function LinhaListaItens(props:LinhaListaItensProps){

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
                <BotaoDeletar title={titlebtn(props.tipobtn)} funcao={props.funcaoBtn}/>
            </div>
        </div>
    );
}
  