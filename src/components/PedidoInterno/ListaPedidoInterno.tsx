interface PedidoInternoProps {
    dados: any
}

export default function ListaPedidoInterno(props: PedidoInternoProps) {
    return (
        <div className="linhaGrid" key={Math.random()*9999999999999999999}>
            <div className="c70">{props.dados.n_id_item}</div>
            <div className="c300">{props.dados.s_nome_item} </div>
            <div className="c70">{props.dados.n_qtde_item+" un"}</div>
        </div>
    )
}