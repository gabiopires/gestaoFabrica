import { useState } from "react";
import Etapas from "./Etapas";

interface CaixaEtapasProps{
    ocultarJanela:any;
    iditem:number;
}

export default function CaixaEtapas(props:CaixaEtapasProps){
    const [nomeItem,setNomeItem]=useState<string>("")
    return (
        <div className="popupFundo">        
            <div className="popupBase popupBase800px">
                <div className="popupTitulo">Etapas do Item: {props.iditem} - {nomeItem}</div>
                <div className="popupPrincipal popupPrincipalCentro">
                    <Etapas mostrarOper={false} iditem={props.iditem} setNomeItem={setNomeItem}/>
                </div>
                <div className="popupRodape">
                    <button title="Fechar Janela" className='btnPadrao' onClick={()=>{props.ocultarJanela(false)}}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
