import React, {useState, useEffect} from 'react';
import { TypeDataAlerta } from "../type"

interface dataAlerta  {
    dataAlerta: TypeDataAlerta,
}

export default function Alerta(props: dataAlerta){

    useEffect(()=>{
        console.log(props.dataAlerta.movItem);
    },[props.dataAlerta])

    return(
        <div className='fixed top-0 left-0 z-[200] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
            <div className='h-auto md:w-[60%] w-[90%] bg-white rounded-xl flex flex-col'>
                <div className='w-[100%] bg-[#1394DA] h-[40px] rounded-t-xl flex items-center justify-between'>
                    <p className='md:ml-10 ml-5 text-xl text-white'>Alerta</p>
                    <p onClick={props.dataAlerta.buttonAction[0]} className='text-xl text-white md:mr-10 mr-5 cursor-pointer'>X</p>
                </div>
                <div className='w-[100%] h-[90%] rounded-b-xl p-10 flex flex-col gap-4'>
                    <p className='flex justify-center items-center text-center'>
                        {props.dataAlerta.title}
                    </p>
                    <div className='flex justify-center items-center gap-10'>
                        {props.dataAlerta.buttonTitle.map((b, index)=>(
                            <button key={index} className='w-[100px] h-[30px] bg-[#1394DA] text-white' onClick={props.dataAlerta.buttonAction[index]}>
                                {b}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}