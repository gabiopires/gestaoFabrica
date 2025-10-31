import LinhaDetalhesPedido from '@/components/DetalhesPedido/LinhaDetalhesPedido';

interface detailsProps {
    ocultarJanela: any;
    nPedido: any;
}

function CriarLinhas(l: any) {
    const id = l[0].produtos.map((p: any) => {
        return <LinhaDetalhesPedido dados={p} key={Math.random() * 999999999999999999} />
    })
    return id;
}

export default function DetalhesP(props: detailsProps) {

    const nPedido: any = props.nPedido
    let res = props.nPedido
    console.log(nPedido)
    const linhas = CriarLinhas(res)
    const n_id_pedido = res[0].n_id_pedido
    const s_nome_pessoa = res[0].s_nome_pessoa
    const dt_data_pedido = FormatarData(res[0].dt_data_pedido)
    const s_descStatus_pedido = res[0].s_desc_statuspedido
    const s_descPrioridade_pedido = res[0].s_desc_prioridadepedido

    function FormatarData(data: string) {
        let d1 = data.split("T")
        let d2 = d1[0].split("-")
        let d3 = d1[1].split(":")
        let d4 = d2[2] + "/" + d2[1] + "/" + d2[0] + " às " + (parseInt(d3[0]) - 3) + ":" + d3[1] || data
        return d4;
    }

    return (
        <div>
            <div className="popupFundo" onClick={() => { }}>
                <div className="popupBase w-[85%]">
                    <div className="popupTitulo">Detalhes do Pedido n° </div>
                    <div className="popupPrincipal">
                        <div className="w-[100%]">
                            <div className='flex flex-col justify-center items-center p-5'>
                                <div className='flex gap-5 justify-center items-center p-5'>
                                    <div>
                                        <div className="tituloGrid">
                                            <div className="c1_detalhesPedido_produto">N° Pedido</div>
                                            <div className="c2_detalhesPedido_produto">Pessoa</div>
                                            <div className="c3_detalhesPedido_produto">Data Pedido</div>
                                            <div className="c4_detalhesPedido_produto">Status Pedido</div>
                                            <div className="c5_detalhesPedido_produto">Prioridade Pedido</div>
                                        </div>
                                        <div>
                                            <div className='linhaGrid' key={Math.random() * 9999999999999999999}>
                                                <div className='c1_detalhesPedido_produto'>{n_id_pedido}</div>
                                                <div className='c2_detalhesPedido_produto'>{s_nome_pessoa}</div>
                                                <div className='c3_detalhesPedido_produto'>{dt_data_pedido}</div>
                                                <div className='c4_detalhesPedido_produto'>{s_descStatus_pedido}</div>
                                                <div className='c5_detalhesPedido_produto'>{s_descPrioridade_pedido}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div><h1>Detalhes dos Produtos</h1></div>
                                <div className='flex gap-5 justify-center items-center p-5'>
                                    <div>
                                        <div className="tituloGrid">
                                            <div className="c1_detalhesPedido_produto">N° Pedido</div>
                                            <div className="c1_detalhesPedido_produto">ID Produto</div>
                                            <div className="c2_detalhesPedido_produto">Nome Produto</div>
                                            <div className="c3_detalhesPedido_produto">Status Produto</div>
                                            <div className="c4_detalhesPedido_produto">Origem Fabrica</div>
                                            <div className="c5_detalhesPedido_produto">Ações</div>
                                        </div>
                                        <div>
                                            {linhas ? linhas : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popupRodape">
                        <button title="Fechar Janela" className='btnPadrao' onClick={() => { props.ocultarJanela(false) }}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
