interface LinhaListaProps{
    dados:any;
    linhasel:any;
    selecionarLinhaProd:any
}
export default function LinhaListaItemSimples(props:LinhaListaProps){
    const ls=localStorage.getItem("id_prod_fab_sel")
    return (
        <div key={props.dados.n_id_item} className={"linhaGrid"} onClick={(evt:any)=>{props.selecionarLinhaProd(evt.target)}}>
            <div className="c50">{props.dados.n_id_produto}</div>
            <div className="c100pc">{props.dados.s_nome_produto}</div>
        </div>
    );
}
  