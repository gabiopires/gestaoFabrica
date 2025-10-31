import Image from "next/image";
interface BotaoOperLinhaGridSimplesProps{
    id:any;
    tipo:string;
    funcaoBtn:(evt:any)=>void;
    title:string;
}

function icone(tp:string){
    let i=""
    if(tp==="add"){
        i="/images/add.svg" 
    }else if(tp==="del"){
        i="/images/delete.svg" 
    }
    return i
}

function obterDados(evt:any){
    const pai=evt.parentNode.parentNode.parentNode
    const id=pai.childNodes[0].innerHTML
    const nome=pai.childNodes[1].innerHTML
    let novo={
        "n_id_item": id,
        "s_nome_item": nome
    }
    return novo
}

function btn(id:any,tipo:string,funcaoBtn:(evt:any)=>void,title:string){
    return(
        <div className="">
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={icone(tipo)} onClick={(evt)=>funcaoBtn(obterDados(evt.target))} title={title}/>
        </div>
    )
}

export default function BotaoOperLinhaGridSimples(props:BotaoOperLinhaGridSimplesProps){
    return (
        <>
            {btn(props.id,props.tipo,props.funcaoBtn,props.title)}
        </>
    );
}
  