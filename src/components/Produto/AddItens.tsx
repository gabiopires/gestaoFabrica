import LinhaListaItemSimples from "../ListaItensSimples/LinhaListaItemSimples";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
let idfabrica:any=""

interface AddItensProps{
    ocultarJanela:(p:boolean)=>void;
    addItem:(p:any)=>void;
}



export default function AddItens(props:AddItensProps){
    const [linhas,setLinhas]=useState<any[]>([])

    

    useEffect(()=>{
        idfabrica=localStorage.getItem("fabrica")
        carregarDados(idfabrica)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(idfab:any){
        const endpoint=`${servidor}itemfab/${idfab}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }    

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaItemSimples tipobtn="add" funcaoBtn={props.addItem} key={e.n_id_item} dados={{...e}}/>
        })
        return ld;
    }

    return (
        <div className="popupFundo">
            <div>
                <div className="popupTitulo">Adicionar Itens</div>
                <div className="popupPrincipal flex-col">
                    <div className="tituloGrid">
                        <div className="c1_itemSimples">ID</div>
                        <div className="c2_itemSimples">Nome Item</div>
                        <div className="c3_itemSimples">Oper.</div>
                    </div>
                    <div className="max-h-64 overflow-y-scroll">
                        {linhas?linhas:""}
                    </div>
                </div>
                <div className="popupRodape">
                    <button title="Fechar Janela" className='btnPadrao flex justify-center items-center' onClick={()=>{props.ocultarJanela(false)}}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
  