import { useState } from "react";
import { Transition } from '@headlessui/react'

interface LinhaEstoqueProps{
    dados:any;
}

export default function LinhaListaEstoque(props:LinhaEstoqueProps){
    const [mostrarDados,setMostrarDados]=useState<boolean>(false)
    const [mostrarDados2,setMostrarDados2]=useState<boolean>(false)
    const [mostrarDados3,setMostrarDados3]=useState<boolean>(false)

    return (
        <div>
        <div className="flex flex-col">
            <div  className="linhaGrid cursor-pointer" onClick={()=>setMostrarDados(!mostrarDados)}>
                <div className="c1_producao">01</div>
                <div className="c2_producao">Magazine</div>
                <div className="c3_producao">Fabrica 4.0</div>
                <div className="c4_producao top-[-100px]">Ativo</div>
            </div>
            
            <Transition
                show={mostrarDados}
                enter="transition-opacity duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex border border-blue-950">
                    <div className="flex w-full p-1">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex text-xs justify-around items-center border w-full  bg-zinc-700 text-white">

                                    <div className="">ID Produto: </div>
                                    <div className="">Produto: </div>
                                    <div className="">Quantidade: </div>
                                    <div className="">Descrição: </div>
                                </div>
                                <div className="flex flex-col w-full pl-4">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col w-full">
                                            <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                                                <div className="flex justify-center  w-[100%]">11</div>
                                                <div className="flex justify-center  w-[100%]">Cabo do Martelo</div>
                                                <div className="flex justify-center  w-[100%]">100</div>
                                                <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">Cabo do Martelo</div>
                                            </div>
                                            <hr />
                                            <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                                                <div className="flex justify-center  w-[100%]">12</div>
                                                <div className="flex justify-center  w-[100%]">Cabeça do Martelo</div>
                                                <div className="flex justify-center  w-[100%]">100</div>
                                                <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">Cabeça do Martelo</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <hr />
        <div className="flex flex-col">
            <div  className="linhaGrid cursor-pointer" onClick={()=>setMostrarDados2(!mostrarDados2)}>
                <div className="c1_producao">02</div>
                <div className="c2_producao">Injetora</div>
                <div className="c3_producao">Fabrica 4.0</div>
                <div className="c4_producao top-[-100px]">Ativo</div>
            </div>
            
            <Transition
                show={mostrarDados2}
                enter="transition-opacity duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex border border-blue-950">
                    <div className="flex w-full p-1">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex text-xs justify-around items-center border w-full  bg-zinc-700 text-white">

                                    <div className="">ID Produto: </div>
                                    <div className="">Produto: </div>
                                    <div className="">Quantidade: </div>
                                    <div className="">Descrição: </div>
                                </div>
                                <div className="flex flex-col w-full pl-4">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col w-full">
                                            <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                                                <div className="flex justify-center  w-[100%]">8</div>
                                                <div className="flex justify-center  w-[100%]">Tampa Garrafa</div>
                                                <div className="flex justify-center  w-[100%]">150</div>
                                                <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">Tampa da Garrafa 4.0</div>
                                            </div>
                                            <hr />
                                            <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                                                <div className="flex justify-center  w-[100%]">10</div>
                                                <div className="flex justify-center  w-[100%]">Flip da Garrafa 4.0</div>
                                                <div className="flex justify-center  w-[100%]">80</div>
                                                <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">Flip 4.0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <hr />
        <div className="flex flex-col">
            <div  className="linhaGrid cursor-pointer" onClick={()=>setMostrarDados3(!mostrarDados3)}>
                <div className="c1_producao">03</div>
                <div className="c2_producao">Sopradora</div>
                <div className="c3_producao">Fabrica 4.0</div>
                <div className="c4_producao top-[-100px]">Ativo</div>
            </div>
            
            <Transition
                show={mostrarDados3}
                enter="transition-opacity duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex border border-blue-950">
                    <div className="flex w-full p-1">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex text-xs justify-around items-center border w-full  bg-zinc-700 text-white">

                                    <div className="">ID Produto: </div>
                                    <div className="">Produto: </div>
                                    <div className="">Quantidade: </div>
                                    <div className="">Descrição: </div>
                                </div>
                                <div className="flex flex-col w-full pl-4">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col w-full">
                                            <div className={"flex text-xs justify-between items-center bg-zinc-300 w-full "}>
                                                <div className="flex justify-center  w-[100%]">09</div>
                                                <div className="flex justify-center  w-[100%]">Corpo Garrafa 4.0</div>
                                                <div className="flex justify-center  w-[100%]">200</div>
                                                <div className="flex justify-center m-1 mt-3 mb-3 w-[100%]">Corpo da Garrafa</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
    )
}
  