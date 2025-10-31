import Image from "next/image";
interface BotaoOrdemEtapaProps{
    ordem:string;
    funcaoBtn:(evt:any)=>void;
}

function icone(o:string):string{
    let icone=""
    if(o=="cima"){
        icone="/images/arrow_up.svg"
    }else{
        icone="/images/arrow_down.svg"
    }
    return icone
}

function title(o:string):string{
    let title=""
    if(o=="cima"){
        title="Ordem acima"
    }else{
        title="Ordem abaixo"
    }
    return title
}

export default function BotaoOrdemEtapa(props:BotaoOrdemEtapaProps){
    return (
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={icone(props.ordem)} onClick={(evt)=>props.funcaoBtn(evt.target)} title={title(props.ordem)}/>
        </div>
    );
}
  