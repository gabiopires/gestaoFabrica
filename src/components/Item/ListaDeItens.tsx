import LinhaListaItem from "./LinhaListaItem";
import CaixaEtapas from "./CaixaEtapas";
import CaixaMp from "./CaixaMp";
import { useState, useEffect } from "react";
import { Transition } from '@headlessui/react'
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
let idFabrica=Configuracao.fabrica;

let iditem:number=0;

export default function ListaDeItens(){

    const [linhas,setLinhas]=useState<any>(null)
    const [mostrarCaixaEtapas,setMostrarCaixaEtapas]=useState<boolean>(false)
    const [mostrarCaixaMp,setMostrarCaixaMp]=useState<boolean>(false)
   
    useEffect(()=>{
        Configuracao.fabrica=localStorage.getItem("fabrica")
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        idFabrica=localStorage.getItem("fabrica")
        const endpoint=`${servidor}itemfab/${idFabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaItem funcoes={[deletarDados,mostrarEtapas,mostrarMp]}key={e.n_id_item} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("O item será removido!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}item`
            const dados={
                idDeletar:idDeletar
            }    
            const cabecalho={
                method:"DELETE",
                body:JSON.stringify(dados)
            }
            fetch(endpoint,cabecalho)
            .then(res=>{
                if(res.status==200){
                    carregarDados()
                }else if(res.status==209){
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira. Esta Ítem está associada a algum Produto")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover Ítem.")
                }
            })
        }
    }

    function mostrarEtapas(evt:any){
        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        iditem=id;
        setMostrarCaixaEtapas(true)
    }
    
    function mostrarMp(evt:any){
        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        iditem=id;
        setMostrarCaixaMp(true)
    }        

    return (
        <div>
            <Transition
                show={mostrarCaixaEtapas}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <CaixaEtapas ocultarJanela={setMostrarCaixaEtapas} iditem={iditem}/>
            </Transition> 
            <Transition
                show={mostrarCaixaMp}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <CaixaMp ocultarJanela={setMostrarCaixaMp} iditem={iditem}/>
            </Transition>                 
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c300">Nome Item</div>
                <div className="c500">Descrição Item</div>
                <div className="c150 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
