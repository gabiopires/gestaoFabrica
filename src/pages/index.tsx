import Topo from '@/components/Topo/Topo'
import { Inter } from 'next/font/google'
import { useState,useEffect } from 'react';
import { Transition } from '@headlessui/react'
import Configuracao from '@/components/Configuracao/Configuracao';
import Globais from '@/components/Configuracao/Globais';
import Image from 'next/image';

const servidor=Configuracao.servidor;

const inter = Inter({ subsets: ['latin'] })

let fb:any=""
let nomefa:any=""
let statusprod:any=""

export default function Home() { 

  const [logado,setLogado]=useState<boolean>(true)
  const [fabricaSelecionada,setFabricaSelecionada]=useState<string>("")
  const [nomeFabricaSelecionada,setNomeFabricaSelecionada]=useState<string>("")
  const [fabricasOptions,setFabricasOptions]=useState<any[]>([])

  useEffect(()=>{
    const idfabrica:any=localStorage.getItem("fabrica")
    const nomefabrica:any=localStorage.getItem("nomefabrica")
    Globais.idfabrica=idfabrica
    Globais.nomefabrica=nomefabrica
    if(idfabrica==null){
      setLogado(false)
      setNomeFabricaSelecionada("")
    }else{
      const endpoint=`${servidor}fabrica/${idfabrica}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res.length <= 0){
          setLogado(false)
          alert('Não foi encontrada fábrica com os dados especificados')
        }else{
          setLogado(true)
          localStorage.setItem("fabrica",res[0].n_id_fabrica)
          localStorage.setItem("nomefabrica",res[0].s_nome_fabrica)
          Configuracao.fabrica=res[0].n_id_fabrica
          Configuracao.nomefabrica=res[0].s_nome_fabrica
          setNomeFabricaSelecionada(res[0].s_nome_fabrica)
          setFabricaSelecionada(res[0].n_id_fabrica)
        }
      })
    }
    buscarFabricas()
    fb=document.getElementById("statusProduto")
    nomefa=document.getElementById("statusProduto")
    statusprod=document.getElementById("statusProduto")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function buscarFabricas(){
    const endpoint=`${servidor}fabrica`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setFabricasOptions(
        res.map((f:any)=>{
          return <option value={f.n_id_fabrica} key={f.n_id_fabrica}>{f.s_nome_fabrica}</option>
        })
      )
    })
  }

  function logar(){
    localStorage.setItem("fabrica",fb.value)
    Configuracao.fabrica=fb.value
    Configuracao.nomefabrica=nomefa.children[statusprod.selectedIndex].innerHTML
    setNomeFabricaSelecionada(nomefa.children[statusprod.selectedIndex].innerHTML)
    setLogado(true)
  }

  function mudarFabrica(){
    localStorage.setItem("fabrica",fb.value)
    localStorage.setItem("nomefabrica",nomefa.children[statusprod.selectedIndex].innerHTML)
    Configuracao.fabrica=fb.value
    Configuracao.nomefabrica=nomefa.children[statusprod.selectedIndex].innerHTML
    setNomeFabricaSelecionada(nomefa.children[statusprod.selectedIndex].innerHTML)
    setLogado(true)
  }  

  function telaLogin(){
    return(
      <div className='popupFundo'>
        <div className='popupBase popupBase30'>
          <div className='popupTitulo'>Login</div>
          <div className='popupPrincipal'>
            <div className='campoForm w-[100%]'>
              <label>Selecione a Fábrica</label>
              <div className='flex gap-3'>
                <select id="statusProduto" value={fabricaSelecionada} onChange={(e)=>setFabricaSelecionada(e.target.value)}>
                  {fabricasOptions?fabricasOptions:""}
                </select>
              </div>
            </div>
          </div>
          <div className='popupRodape'>
            <button className='btnPadrao' onClick={logar}>Login</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Transition
        show={!logado}
        enter="transition-opacity duration-50"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {telaLogin()}
      </Transition> 
      <Transition
        show={logado}
        enter="transition-opacity duration-50"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Topo/>
        <div className='flex flex-col justify-center items-center p-5'>
          <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
          <Image width={0} height={0} alt='' className='iconeTitulo' src="/images/home.svg"/>
          <h1 className='text-3xl'>Home</h1>
          <h2>Fábrica Selecionada: {nomeFabricaSelecionada}</h2>

          <br/>
          <br/>
          <br/>

          <div className='campoForm'>
            <label>Selecione a Fábrica</label>
            <div className='flex gap-3'>
              <select id="statusProduto" value={fabricaSelecionada} onChange={(e)=>setFabricaSelecionada(e.target.value)}>
                {fabricasOptions?fabricasOptions:""}
              </select>
            </div>
          </div>
          <br/>
          <div className='campoForm'>
            <button className='btnPadrao' onClick={mudarFabrica}>Mudar Fábrica</button>
          </div>

        </div>

      </Transition>         
 
    </div>
  )
}
