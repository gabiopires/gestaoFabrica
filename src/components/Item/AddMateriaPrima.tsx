import { useState,useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from "next/image";

interface InterfaceProps{
    setModalAddMateriaPrima:any;
    listaMateriasPrimasAdicionadas:any;
    addMatPrima:(f:any)=>void;
}

export default function AddMateriaPrima(props:InterfaceProps){
    const [listaMateriaPrima,setListaMateriaPrima]=useState<any[]>([])

    useEffect(()=>{
        buscarMateriasPrimas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    function buscarMateriasPrimas(){
        const endpoint=`${Configuracao.servidor}materiaprima/${Configuracao.fabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setListaMateriaPrima(res.map((e:any)=>{
                return(
                    <div className="linhaGrid flex" key={e.n_id_materiaprima}>
                        <div className="c1_addMateriaPrima">{e.n_id_materiaprima}</div>
                        <div className="c2_addMateriaPrima">{e.s_nome_materiaprima}</div>
                        <div className="c3_addMateriaPrima">{e.s_desc_unidademedida}</div>
                        <div className="c4_addMateriaPrima flex justify-center"><Image width={0} height={0} alt='' onClick={()=>{addMp(e)}} className="cursor-pointer iconeOper" title="Adicionar Matéria Prima" src="/images/add.svg"/></div>
                    </div>
                )
            }))
        })
    }

    function addMp(e:any){
        props.addMatPrima(e)
    }

    return (
        <div className="popupFundo" onClick={()=>{}}>
            <div className="popupBase popupBase70">
                <div className="popupTitulo">Adicionar Matéria Prima</div>
                <div className="popupPrincipal">
                    <div className="w-[100%]">
                        <div className="tituloGrid">
                            <div className="c1_addMateriaPrima">ID</div>
                            <div className="c2_addMateriaPrima">Matéria Prima</div>
                            <div className="c3_addMateriaPrima">Un. Med.</div>
                            <div className="c4_addMateriaPrima">Adicionar</div>
                        </div>
                        <div>
                            {listaMateriaPrima?listaMateriaPrima:""}
                        </div>   
                    </div>
                </div>                 
                <div className="popupRodape">
                    <button title="Fechar Janela" className='btnPadrao' onClick={()=>{props.setModalAddMateriaPrima(false)}}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
