import { useState } from "react"
import Configuracao from "../Configuracao/Configuracao";

interface detailsProps {
    ocultarJanela: any;
    data: any;
}

const servidor = Configuracao.servidor;

export default function PopupDetalhesP(props: detailsProps) {

    const data: any = props.data
    const [idFab, setIdFab] = useState<string>("1")

    function GravarDados() {      
        // Realiza o POST na API para realizar a alterção nos dados referentes ao produto do pedido que foi selecionado
        const endpoint=`${servidor}mudarfabricapedido/${data.n_id_pedido}/${idFab}`
        console.log(endpoint)
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            window.alert("Dados alterados")
        })
        .catch(()=>{
            window.alert("Erro ao alterar Dados")
        })
        
        window.alert("Dados atualizados") 
    }

    function ListarFabrica(pLista: any) { // Gerar dados do seletor para a alteração dos dados
        let v1, v2, v3: any;
        v1 = <option value='1'>Centro 4.0</option>
        v2 = <option value='2'>Juiz de Fora</option>
        v3 = <option value='3'>Senai Extrema</option>
        pLista.n_id_fabrica == 1 ? v1 = <option value='1' selected>Centro 4.0</option> : <option value='1'>Centro 4.0</option>
        pLista.n_id_fabrica == 2 ? v2 = <option value='2' selected>Juiz de Fora</option> : <option value='2'>Juiz de Fora</option>
        pLista.n_id_fabrica == 3 ? v3 = <option value='3' selected>Senai Extrema</option> : <option value='3'>Senai Extrema</option>

        return (
            <select id={"selp" + pLista.n_id_pedidoProdutoItem} name={"selp" + pLista.n_id_pedidoProdutoItem} onChange={
                (evt)=>{
                    setIdFab(evt.target.value)
                }
            }>
                {v1}
                {v2}
                {v3}
            </select> 
        )
    }

    return (
        <div>
            <div className="popupFundo" onClick={() => { }}>
                <div className="popupBase w-[70%]">
                    <div className="popupTitulo">Editar Produto n° {data.n_id_pedidoProduto} -- Pedido {data.n_id_pedido}</div>
                    <div className="popupPrincipal">
                        <div className="w-[100%]">
                            <div className='flex flex-col gap-5'>
                                <div className="flex gap-5">
                                    <h3>Nome do item: {data.s_nome_produto}</h3>
                                    <h3>Fabrica de origem: {data.s_nome_fabrica}</h3>
                                </div>
                                <div className='campoForm'>
                                    <div className="flex w-l[100%]">
                                        <label className="mr-5">Selecione a fabrica para trocar:  </label>
                                        {ListarFabrica(data)}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="popupRodape">
                        <button title="Editar Item" className='btnPadrao' onClick={() => { GravarDados(), props.ocultarJanela(false) }}>Confirmar</button>
                        <button title="Fechar Janela" className='btnPadrao' onClick={() => { props.ocultarJanela(false) }}>Fechar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

