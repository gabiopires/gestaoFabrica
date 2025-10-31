import LinhaListaItemSimples from "./LinhaListaItemSimples";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

interface ListaDeItensSimplesProps{
    funcaoBtn:(evt:any)=>void
}

export default function ListaDeItensSimples(props:ListaDeItensSimplesProps){

    const [linhas,setLinhas]=useState<any[]>([])
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const endpoint=`${servidor}item/`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaItemSimples tipobtn="add" funcaoBtn={props.funcaoBtn} key={e.n_id_item} dados={{...e}}/>
        })
        return ld;
    }

    return (
        <div>
            <h1>Lista de Itens cadastrados</h1>
            <div className="tituloGrid">
                <div className="c1_itemSimples">ID</div>
                <div className="c2_itemSimples">Nome Item</div>
                <div className="c3_itemSimples">Oper.</div>
            </div>
            <div className="max-h-64 overflow-y-scroll">
                {linhas?linhas:""}
            </div>
        </div>
    );
}
