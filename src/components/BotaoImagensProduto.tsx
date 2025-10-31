import { Transition } from '@headlessui/react'
import { useState } from "react";
import Loading from '@/components/Loading/Loading';
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

const servidor=Configuracao.servidor;

interface BotaoImagensProdutoProps{
    icone:string;
    title:string;
    id:any;
}

export default function BotaoImagensProduto(props:BotaoImagensProdutoProps){
    const [imagens,setImagens]=useState<boolean>(false)
    const [imagem1,setImagem1]=useState<any>("")
    const [imagem2,setImagem2]=useState<any>("")
    const [imagem3,setImagem3]=useState<any>("")
    const [telaLoading,setTelaLoading]=useState<boolean>(true)

    let novaimagem1:any=''

    function deletarImagem(idprod:any,Image:any){
        const endpoint=`${servidor}deletarimagemproduto/${idprod}/${Image}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            if(Image==1){
                setImagem1("")
            }else if(Image==2){
                setImagem2("")
            }else if(Image==3){
                setImagem3("")
            }
        })            
    }

    function converterParaBase64(arquivo:any){
        return new Promise((resolve,reject)=>{
            const leitor=new FileReader()
            leitor.readAsDataURL(arquivo)
            leitor.onload=()=>{
                resolve(leitor.result)
            }
            leitor.onerror=(error)=>{
                reject(error)
            }
        })
    }

    function mostrarImagens(idprod:any){
        const endpoint=`${servidor}imagensproduto/${idprod}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setImagem1(res[0].s_imagem1_produto)
            setImagem2(res[0].s_imagem2_produto)
            setImagem3(res[0].s_imagem3_produto)
        })
        return(
            <div className='popupFundo'>
                <div className='popupBase popupBase80'>
                    <div className='popupTitulo'>Imagens do Produto</div>
                    <div className='popupPrincipal flex-row popupPrincipalLinha justify-around gap-3'>
                        <div className='ImageProduto flex flex-col justify-center'>
                            <Image width={350} height={350} className='' src={imagem1} alt=''/>
                        </div>
                        <div className='ImageProduto flex flex-col justify-center'>
                            <Image width={350} height={350} alt='' className='' src={imagem2}/>
                        </div>
                        <div className='ImageProduto flex flex-col justify-center'>
                            <Image width={350} height={30} alt='' className='' src={imagem3}/>
                        </div>
                    </div>
                    <div className='popupRodape'>
                        <button className='btnPadrao' onClick={()=>setImagens(false)}>Fechar</button>
                    </div>
                </div>
            </div>            
        )
    }    

    return (
        <div className="">           
            <Image width={0} height={0} alt='' className="cursor-pointer iconeOper" src={props.icone} onClick={()=>setImagens(true)} title={props.title}/>
            <Transition
                show={imagens}
                enter="transition-opacity duration-0"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >            
                {
                    mostrarImagens(props.id)
                }
            </Transition>            
        </div>
    );
}
  