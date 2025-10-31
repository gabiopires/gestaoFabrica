import LinhaListaProdutosExistente from "../ListaItensSimples/LinhaListaProdutosExistente";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
let idfabrica:any=""

interface AddItensProps{
    ocultarJanela:(p:boolean)=>void;
    preencherCamposProdutoImportado:any
}

export default function AddItens(props:AddItensProps){
    const [linhas,setLinhas]=useState<any[]>([])
    const [linhasel,setLinhasel]=useState<any>("")

    useEffect(()=>{
        idfabrica=localStorage.getItem("fabrica")
        localStorage.setItem("id_prod_fab_sel","")
        carregarDados(idfabrica)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(idfab:any){
        const endpoint=`${servidor}produtosfab/${idfab}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }    

    function formatLinhaSel(){
        console.log("clique")
    }

    const retirarDestaqueLinhas=()=>{
        let linhas:any=document.getElementsByClassName("linhaGrid")
        linhas=[...linhas]
        linhas.forEach((l:any)=>{
            l.classList.remove("linhaGridSel")
        })
        localStorage.setItem("id_prod_fab_sel","")
    }

    const selecionarLinhaProd=(evt:any)=>{
        retirarDestaqueLinhas()
        let etapaSelecionada=evt.parentNode
        etapaSelecionada.classList.add("linhaDestacada")
        localStorage.setItem("id_prod_fab_sel",etapaSelecionada.childNodes[0].innerHTML)
        etapaSelecionada.classList.add("linhaGridSel")
    }    

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaProdutosExistente key={e.n_id_item} dados={{...e}} linhasel={linhasel} selecionarLinhaProd={selecionarLinhaProd}/>
        })
        return ld;
    }

    const importarDados=()=>{
        const idprod=localStorage.getItem("id_prod_fab_sel")
        if(idprod==""){
            alert("Selecione um produto para importar os dados")
            return
        }
        const endpoint=`${servidor}dadosproduto/${idprod}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            props.preencherCamposProdutoImportado(res)
        })
        .finally(()=>{
            props.ocultarJanela(false)
        })
    }

    return (
        <div className="popupFundo">
            <div>
                <div className="popupTitulo">Importar Dados Produto</div>
                <div className="popupPrincipal flex-col">
                    <div className="tituloGrid">
                        <div className="c1_itemSimples">ID</div>
                        <div className="c2_itemSimples">Produto</div>
                    </div>
                    <div className="max-h-64 overflow-y-scroll">
                        {linhas?linhas:""}
                    </div>
                </div>
                <div className="popupRodape">
                    <button title="Fechar Janela" className='btnPadrao flex justify-center items-center' onClick={()=>{importarDados()}}>Importar</button>
                    <button title="Fechar Janela" className='btnPadrao flex justify-center items-center' onClick={
                        ()=>{
                            props.ocultarJanela(false)
                            localStorage.setItem("id_prod_fab_sel","")
                        }
                    }>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
  