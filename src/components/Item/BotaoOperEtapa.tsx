import Image from "next/image";
interface BotaoOperEtapaProps{
    funcaoBtn:(evt:any)=>void;
}

function btn(funcaoBtn:(evt:any)=>void){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src="/images/delete.svg" onClick={(evt)=>funcaoBtn(evt.target)} title="Remover Etapa de fabricação do Item"/>
        </div>
    )
}

export default function BotaoOperEtapa(props:BotaoOperEtapaProps){
    return (
        <>
            {btn(props.funcaoBtn)}
        </>
    );
}
  