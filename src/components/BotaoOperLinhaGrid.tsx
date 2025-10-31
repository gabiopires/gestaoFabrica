import Link from 'next/link';
import Image from 'next/image';

interface BotaoOperLinhaGridProps{
    icone:string;
    id:any;
    tipo:string;
    funcao:any;
    path:string;
    title:string;
    prio:any;
}

function btnEditar(id:any,icone:string,path:string,title:string,prio:string){
    return(
        <Link className="" href={{
            pathname:path,
            query:{
                idEditar:id
            }
        }}
        >
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={icone} title={title} data-prio={prio}/>
        </Link>
    )
}

function btnRemover(icone:string,funcao:any,title:string,prio:string){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={icone} onClick={(evt)=>funcao(evt)} title={title} data-prio={prio}/>
        </div>
    )
}

export default function BotaoOperLinhaGrid(props:BotaoOperLinhaGridProps){
    return (
        <>
            {props.tipo=="editar"?btnEditar(props.id,props.icone,props.path,props.title,props.prio):btnRemover(props.icone,props.funcao,props.title,props.prio)}
        </>
    );
}
  