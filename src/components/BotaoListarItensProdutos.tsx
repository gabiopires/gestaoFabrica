import Link from 'next/link';
import Image from 'next/image';

interface BotaoListarItensProdutosProps{
    icone:string;
    funcao:any;
    title:string;
    estado:any;
}

export default function BotaoListarItensProdutos(props:BotaoListarItensProdutosProps){
    return (
        <div className="flex justify-center">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={props.icone} onClick={()=>props.funcao(!props.estado)} title={props.title}/>
        </div>
    );
}
  