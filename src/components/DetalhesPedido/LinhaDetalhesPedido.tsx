import { useState } from "react"
import { Transition } from "@headlessui/react"
import PopupDetalhesP from "./PopupDetalhesPedido"
import Configuracao from "../Configuracao/Configuracao"
import BotaoAcao from "../Gerais/BotaoAcao"

interface DetalhesPedido {
    dados: any
}

const servidor = Configuracao.servidor;

export default function LinhaDetalhesPedido(props: DetalhesPedido) {
    const [mostrarDados, setMostrarDados] = useState<boolean>(false)
    const [opcMag, mudaStateOpc] = useState(false)
    const [dataItem, setDataItem] = useState<any[]>([])

    let p = props.dados

    function ListarFabrica(pLista: any) {  //Seletor de Unidades 4.0
        let v1, v2, v3: any;
        v1 = <option value='1'>Centro 4.0</option>
        v2 = <option value='2'>Juiz de Fora</option>
        v3 = <option value='3'>Senai Extrema</option>
        pLista.n_id_fabrica == 1 ? v1 = <option value='1' selected>Centro 4.0</option> : <option value='1'>Centro 4.0</option>
        pLista.n_id_fabrica == 2 ? v2 = <option value='2' selected>Juiz de Fora</option> : <option value='2'>Juiz de Fora</option>
        pLista.n_id_fabrica == 3 ? v3 = <option value='3' selected>Senai Extrema</option> : <option value='3'>Senai Extrema</option>

        return (
            <select id={"sel" + pLista.n_id_pedidoProdutoItem} onChange={
                (evt)=>{
                    Ctable(pLista)
                    const endpoint=`${servidor}mudarfabricaitem/${pLista.n_id_pedidoProdutoItem}/${evt.target.value}`
                    fetch(endpoint)
                    .then(res=>res.json())
                    .then(res=>{
                        window.alert("Dados alterados")
                    })
                    .catch(()=>{
                        window.alert("Erro ao alterar Dados")
                    })
                }
            } name={"sel" + pLista.n_id_pedidoProdutoItem}>
                {v1}
                {v2}
                {v3}
            </select> 
        )
    }

    function table(item: any) { // Monta a tabela de estrutura de todos os dispositivos
        const id = item.map((e: any) => {
            return (
                <div key={Math.random()*999999999999999999}>
                    <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                        <div className="flex justify-center  w-[100%]">{e.n_id_pedidoProdutoItem}</div>
                        <div className="flex justify-center  w-[100%]">{e.n_id_item}</div>
                        <div className="flex justify-center  w-[100%]">{e.s_nome_item}</div>
                        <div className="flex justify-center  w-[100%]">{e.s_desc_statuspedido}</div>
                        <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">{Btext(e)}</div>
                    </div>
                    <hr />
                </div>
            )
        })
        return id;
    }

    function TextoA(b:boolean){ // Faz a parte de trocar os sprites do botão se seleção
        if(b == true){
            return ('/images/arrow_up.svg')
        }else{
            return('/images/arrow_down.svg')
        }
    }

    function TextoB(n:string){ // Faz a parte de trocar os sprites do botão se seleção
        if(n == "Aguardando"){
            return ('/images/edit.svg')
        }else{
            return('/images/block.svg')
        }
    }
    function TextoE(n:string){ // Faz a parte de trocar os sprites do botão se seleção
        if(n == "Aguardando"){
            return ('Editar Produto')
        }else{
            return('Edição não habilitada')
        }
    }

    function Btext(pTexto: any) { // Gera o seletor ou o campo de texto estatico, dependendo da condição do item
        if (pTexto.n_status_pedidoProdutoItem == 1) {
            return (ListarFabrica(pTexto))
        } else {
            return (
                <p>{pTexto.s_nome_fabrica}</p>
            )
        }
    }

    function PopupEdicao(nim : any){ // Abre a popup e envia dos dados para o elemento
        //console.log(nim.n_status_pedidoProduto)
        if(nim.n_status_pedidoProduto == 1){
            setDataItem(p)
            return (mudaStateOpc(!opcMag))
        } else {
            window.alert("Operação não permitida")
        }
    }

    function Ctable(valor: any) { // Função do botão de edição
        if (valor.s_desc_statuspedido == "Aguardando") {
            let cq: any = document.getElementById("sel" + valor.n_id_pedidoProdutoItem)
        }
    }

    return (
        <div>
            {opcMag && (
                <Transition
                    show={opcMag}
                    enter="transition-opacity duration-0"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-0"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <PopupDetalhesP data={dataItem} ocultarJanela={mudaStateOpc} />
                </Transition>
            )}
            <div className='linhaGrid' key={Math.random() * 9999999999999999999}>
                <div className='c1_detalhesPedido_produto'>{p.n_id_pedidoProduto}</div>
                <div className='c1_detalhesPedido_produto'>{p.n_id_produto}</div>
                <div className='c2_detalhesPedido_produto'>{p.s_nome_produto}</div>
                <div className='c3_detalhesPedido_produto'>{p.s_desc_statuspedido}</div>
                <div className='c4_detalhesPedido_produto'>{p.s_nome_fabrica}</div>
                <div className="c6_detalhesPedido_produto"><BotaoAcao icone={TextoA(mostrarDados)} title='Expandir' funcao={() => setMostrarDados(!mostrarDados)}></BotaoAcao></div>
            </div>
            <Transition
                show={mostrarDados}
                enter="transition-opacity duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex border border-blue-950">
                    <div className="flex w-full p-1">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex text-xs justify-around items-center border w-full  bg-zinc-700 text-white">
                                    <div className="">N° Produto: </div>
                                    <div className="">ID Item: </div>
                                    <div className="">Nome: </div>
                                    <div className="">Status: </div>
                                    <div className="">Local: </div>
                                </div>
                                <div className="flex flex-col w-full pl-4">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col w-full">
                                            {table(p.itens)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
}