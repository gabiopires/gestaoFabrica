import Link from 'next/link';
import Image from 'next/image';

interface BotaoLinkProps{
    icone:string;
    id:any;
    path:string;
    title:string;
}

export default function BotaoLink(props:BotaoLinkProps){
    return(
        <Link className="" href={{
            pathname:props.path,
            query:{
                idEditar:props.id
            }
        }}
        >
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={props.icone} title={props.title}/>
        </Link>
    )
}
  