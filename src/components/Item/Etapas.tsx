import { useState,useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

interface EtapasProps{
    mostrarOper:boolean;
    iditem:number;
    setNomeItem:any;
}

export default function Etapas(props:EtapasProps){

    const [linhasEtapas,setLinhasEtapas]=useState<any[]>([])
    let nomeItem:string="";

    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const linhas:any[]=[]
        const endpoint=`${servidor}etapa_item/${props.iditem}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            res.forEach((e:any)=>{
                {nomeItem=e.s_nome_item}
                linhas.push(
                    <div key={e.n_id_etapa} className="linhaGrid">
                        <div className="c70" title="Ordem da etapa">{e.n_ordem_etapa}</div>
                        <div className="c70" title="ID da Etapa">{e.n_id_etapa}</div>
                        <div className="c300" title={"ID Programa: "+e.n_id_programa + " | Código Programa:"+e.s_codigo_programa}>{e.s_nome_programa}</div>
                        <div className="c300" title={"ID Unidade: "+e.n_id_unidade}>{e.s_nome_unidade}</div>
                        <div className="c200" title={e.n_status_etapa}>{e.s_desc_statusetapa}</div>
                    </div>
                )
            })
            props.setNomeItem(nomeItem)
            setLinhasEtapas(linhas)
        })
    }    

    return (
        <div className="">
            <div>
                <div className="tituloGrid">
                    <div className="c70" title="Ordem da etapa">Ordem</div>
                    <div className="c70">ID</div>
                    <div className="c300" title="ID Programa + Código Programa">Programa</div>
                    <div className="c300" title="ID Unidade">Unidade</div>
                    <div className="c200" title="ID Status Etapa">Status Etapa</div>
                </div>
                <div className="max-h-64 overflow-y-scroll" id="etapas">
                    {linhasEtapas?linhasEtapas:""}
                </div>
            </div>
        </div>
    );
}
  