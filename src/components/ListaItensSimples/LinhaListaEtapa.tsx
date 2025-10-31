import BotaoOperEtapa from "../Item/BotaoOperEtapa";
import BotaoOrdemEtapa from "../Item/BotaoOrdemEtapa";
import Image from "next/image";

interface LinhaListaProps{
    dados:any;
    funcaoBtn:(evt:any)=>void;
    moverEtapaCima:(evt:any,ordem:string)=>void;
    moverEtapaBaixo:(evt:any,ordem:string)=>void;
}

export default function LinhaListaEtapa(props:LinhaListaProps){


    function btnMover(){
        return(
            <Image width={0} height={0} alt='' className="cursor-pointer" src="/images/dots.svg"/>
        )
    }

    return (
        <div key={props.dados.i} className="linhaGrid" data-idfabrica={props.dados.idfabrica} data-idunidade={props.dados.idunidade} data-idprograma={props.dados.idprograma} data-id={props.dados.i}>
            <div className="c250">{props.dados.unidade}</div>
            <div className="c200">{props.dados.programa}</div>
            <div className="c200">{props.dados.fabrica}</div>
            <div className="c100 ccol">
                <BotaoOperEtapa funcaoBtn={(evt)=>props.funcaoBtn(evt)}/>
                <BotaoOrdemEtapa ordem="cima" funcaoBtn={(evt)=>props.moverEtapaCima(evt,"cima")}/>
                <BotaoOrdemEtapa ordem="baixo" funcaoBtn={(evt)=>props.moverEtapaBaixo(evt,"baixo")}/>
            </div>
        </div>
    );
}
  