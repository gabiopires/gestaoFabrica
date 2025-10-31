import Image from "next/image";

interface BotaoAcaoProps{
    icone:string;
    funcao:any;
    title:string;
}

export default function BotaoAcao(props:BotaoAcaoProps){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={props.icone} onClick={(evt)=>props.funcao(evt)} title={props.title}/>
        </div>
    )
}
  