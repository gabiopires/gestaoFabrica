import Link from 'next/link';
import Image from 'next/image';

interface BotaoVoltarProps{
    txt:string;
    caminho:string;
}
export default function BotaoVoltar(props:BotaoVoltarProps){
  return (
    <Link href={props.caminho} className={`
        flex
        bg-zinc-200
        border
        border-zinc-400
        rounded-md
        p-2
    `}>
        <Image width={0} height={0} alt='' className={``} src="/images/arrow_back.svg"/>
        <p className={``}>{props.txt}</p>
    </Link>
  );
}
