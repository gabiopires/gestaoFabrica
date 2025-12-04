import React, {useState} from 'react';
import Entrada from "./Entrada"
import Saida from "./Saida"
import GerenciarItens from "./GerenciarItems"

interface MovProps {
    set: (value: boolean) => void;
}

export default function MovEstoque(props: MovProps){

    const [type, setType] = useState("0");
    const [seeEntrada, setSeeEntrada] = useState(true);
    const [seeSaida, setSeeSaida] = useState(false);
    const [seeItems, setSeeItems] = useState(false);
    const [typeItem, setTypeItem] = useState(0);

    function selecionarMov(type: string){
        if(type == '0'){
            setSeeEntrada(true);
            setSeeSaida(false);
            setSeeItems(false);
            setType('0');
        }else if (type == '1'){
            setSeeSaida(true);
            setSeeEntrada(false);
            setSeeItems(false);
            setType('1');
        }else{
            setSeeEntrada(false);
            setSeeSaida(false);
            setSeeItems(true);
            setType('2');
        }
    }

    return(
        <div className='fixed z-[200] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
            <div className='h-[80%] md:w-[60%] w-[90%] bg-white rounded-xl flex flex-col'>
                <div className='w-[100%] bg-[#1394DA] h-[10%] rounded-t-xl flex items-center justify-between'>
                    <p className='md:ml-10 ml-5 text-xl text-white'>Movimentar estoque</p>
                    <p onClick={()=>props.set(false)} className='text-xl text-white md:mr-10 mr-5 cursor-pointer'>X</p>
                </div>
                <div className='w-[100%] h-[90%] rounded-b-xl md:pl-5 pl-2 md:pr-5 pr-2 flex flex-col gap-4'>
                    <div className='w-[100%] h-[25%] flex flex-col justify-end gap-2 pl-2'>
                        <p className='text-sm'>Tipo de movimentação</p>
                        <select className='md:w-[45%] border-2 rounded-xl p-1 text-sm' value={type} onChange={(evt)=>{selecionarMov(evt.target.value),setTypeItem(-1)}}>
                            <option value="0">Entrada de produto pronto/materia prima</option>
                            <option value="1">Saida de produto pronto/materia prima</option>
                            <option value="2">Gerenciar items produzidos</option>
                        </select>
                    </div>
                    <div className='border-2 w-[100%] h-[75%] mb-5 rounded-xl flex md:flex-col flex-wrap md:flex-nowrap overflow-auto overflow-x-hidden gap-5 pb-5'>
                        {type == "0" ?
                            <>{seeEntrada&&<Entrada onAction={()=>props.set(false)}/>}</>
                        : type == "1" ? 
                            <>{seeSaida&&<Saida onAction={()=>props.set(false)} onAddItem={()=>{selecionarMov("2"),setTypeItem(1)}}/>}</>
                        : 
                            <>{seeItems&&<GerenciarItens onAction={()=>props.set(false)} type={typeItem} />}</>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}