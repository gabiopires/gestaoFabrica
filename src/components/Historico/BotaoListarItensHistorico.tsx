import Image from 'next/image';

interface BotaoListarItensHistoricoProps{
    icone:string;
    funcao:any;
    title:string;
    estado:any;
}

export default function BotaoListarItensProdutos(props:BotaoListarItensHistoricoProps){
    return (
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer" src={props.icone} onClick={()=>props.funcao(!props.estado)} title={props.title}/>
        </div>
    );
}
  