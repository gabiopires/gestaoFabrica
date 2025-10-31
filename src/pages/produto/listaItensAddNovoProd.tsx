interface ListaItensAddNovoProdProps{
    plistaItensAdd:any[]
}

export default function ListaItensAddNovoProd(props:ListaItensAddNovoProdProps){
    return (
        <div className="c100pc">
            <h1>Lista de Itens Adicionados ao produto</h1>
            <div className="tituloGrid c100pc">
                <div className="c50">ID</div>
                <div className="c100pc">Nome Item</div>
                <div className="c50 ccenter">Oper.</div>
            </div>
            <div className="max-h-64 overflow-y-scroll" id='listaItens'>
                {props.plistaItensAdd}
            </div>
        </div>
    );
}
