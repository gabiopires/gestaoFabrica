import { useState,useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

interface ItensProps{
    mostrarOper:boolean;
    iditem:number;
    setNomeItem:any;
}

export default function Itens(props:ItensProps){

    const [linhasItens,setLinhasItens]=useState<any[]>([])
    let nomeItem:string="";

    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const linhas:any[]=[]
        const endpoint=`${servidor}materiaprimaitem/${props.iditem}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            res.forEach((e:any)=>{
                {nomeItem=e.s_nome_item}
                linhas.push(
                    <div key={e.n_id_etapa} className="linhaGrid">
                        <div className="c1_materiaprimaitem" title="ID Matéria Prima">{e.n_id_materiaprima}</div>
                        <div className="c2_materiaprimaitem" title={"Descrição: "+e.s_desc_materiaprima}>{e.s_nome_materiaprima}</div>
                        <div className="c3_materiaprimaitem" title="Quantidade">{e.n_qtde_itemMateriaPrima + " " + e.s_desc_unidademedida}</div>
                    </div>
                )
            })
            props.setNomeItem(nomeItem)
            setLinhasItens(linhas)
        })
    }    

    return (
        <div className="">
            <div>
                <div className="tituloGrid">
                    <div className="c1_materiaprimaitem">ID MP</div>
                    <div className="c2_materiaprimaitem">Nome</div>
                    <div className="c3_materiaprimaitem">Quantidade</div>
                </div>
                <div className="max-h-64 overflow-y-scroll" id="materiaprimaitem">
                    {linhasItens?linhasItens:""}
                </div>
            </div>
        </div>
    );
}
  