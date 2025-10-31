import { useState } from 'react';

interface AddRemProps{
    op:number;
    stateCampo:any;
    setStateCampo:any;
    stateMostrar:any;
    setStateMostrar:any;
}

export default function AddRem(props:AddRemProps){
    const [qtde,setQtde]=useState<string>("0");

    function operar(o:number){
        let valor=props.stateCampo
        valor+=(Number.parseInt(qtde)*o)
        props.setStateCampo(valor)
        props.setStateMostrar(false)
    }

    return (
        <div className={"flex flex-col absolute bg-black bg-opacity-75 w-full h-full justify-center items-center "+(props.stateMostrar?"":"ocultar")}>
            <div className="w-[50%] p-2 coresBarraTituloPopup">{props.op===1?'Adicionar':'Remover'}</div>
            <div className="w-[50%] p-2 coresPrincipalPopup">
                <div className='campoForm'>
                    <label>Quantidade a {props.op===1?'Adicionar':'Remover'}</label>
                    <input type="number" value={qtde} onChange={(e)=>{setQtde(e.target.value)}}></input>
                </div>  
            </div>
            <div className="flex w-[50%] p-2 coresRodapePopup justify-around items-center">
                <button className='btnPadrao' onClick={()=>{operar(props.op)}}>{props.op===1?'Adicionar':'Remover'}</button>
                <button className='btnPadrao' onClick={()=>{props.setStateMostrar(false)}}>Fechar</button>
            </div>
        </div>
    );
}  