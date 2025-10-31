import Link from 'next/link';
import Image from 'next/image';

interface BotaolinkProps{
    img:string;
    txt:string;
    caminho:string;
}
export default function Botaolink(props:BotaolinkProps){
    return (
      <div>
        <Link href={props.caminho} className={`
          flex flex-col justify-center items-center
          bg-zinc-300
          w-36 h-36
          rounded-md
          border border-zinc-500
          gap-3
        `}>
          <Image width={0} height={0} src={props.img} className='w-14' alt={props.txt} title={props.txt}/>
          <p>{props.txt}</p>
        </Link>
      </div>
    );
  }
  