import { useState } from "react";

interface LinhaDashboardFiltro{
    dados:any;
    fab?:Number;
}

export default function LinhaDashboardFiltro(props:LinhaDashboardFiltro){
    const [mostrarItens,setMostrarItens]=useState<boolean>(false)
    const [produtos,setProdutos]=useState<any>("")

    function corFundoLinha(status: any) {
        let sp = null;
        if (status === 2) {
            sp = "filaproducao"
        } else if (status === 3) {
            sp = "produzindo"
        } else if (status === 4) {
            sp = "finalizado"
        } else if (status === 5) {
            sp = "bloqueado"
        }
        return sp
    }

    console.log(props.dados)

    return (
        <div className={``+(mostrarItens&&"outline outline-1")}>
            <div className={`linhaGrid ` + corFundoLinha(props.dados[0].n_status_pedidoProduto)}>
                <div className="c1_dashboard">{props.dados[0].n_id_pedido}</div>
                <div className="c2_dashboard">{props.dados[0].s_nome_produto}</div>
            </div>
        </div>
    );
}
  