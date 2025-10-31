import Link from 'next/link';
import Image from 'next/image';

interface BotaoEditarProps{
    id:any;
    path:string;
    title:string;
}

export default function BotaoEditar(props:BotaoEditarProps){
    return(
        <Link className="" href={{
            pathname:props.path,
            query:{
                idEditar:props.id
            }
        }}
        >
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src="/images/edit.svg" title={props.title}/>
        </Link>
    )
}
  