import { useState } from "react";
import Itens from "./Itens";

interface CaixaMpProps{
    ocultarJanela:any;
    iditem:number;
}

export default function CaixaMp(props:CaixaMpProps){
    const [nomeItem,setNomeItem]=useState<string>("")
    return (
        <div className="popupFundo">        
            <div className="popupBase popupBase800px">
                <div className="popupTitulo">Matérias Primas do Item: {props.iditem} - {nomeItem}</div>
                <div className="popupPrincipal popupPrincipalCentro">
                    <Itens mostrarOper={false} iditem={props.iditem} setNomeItem={setNomeItem}/>
                </div>
                <div className="popupRodape">
                    <button title="Fechar Janela" className='btnPadrao' onClick={()=>{props.ocultarJanela(false)}}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
