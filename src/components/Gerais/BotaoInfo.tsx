import Image from 'next/image';

interface BotaoInfoProps{
    funcao:any;
    title:string;
}

export default function BotaoInfo(props:BotaoInfoProps){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src="/images/info.svg" onClick={(evt)=>props.funcao(evt)} title={props.title}/>
        </div>
    )
}
  