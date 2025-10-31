import Image from 'next/image';

interface BotaoDeletarProps{
    funcao:any;
    title:string;
}

export default function BotaoDeletar(props:BotaoDeletarProps){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src="/images/delete.svg" onClick={(evt)=>props.funcao(evt)} title={props.title}/>
        </div>
    )
}
  