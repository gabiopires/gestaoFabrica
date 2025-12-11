import Topo from '@/components/Topo/Topo';
import Configuracao from '@/components/Configuracao/Configuracao';
import { useState, useEffect } from "react";
import Image from 'next/image';

export default function PaginaFabrica(){

  const [fabrica, setFabrica] = useState<{
    n_id_fabrica: number, s_nome_fabrica: string, s_cidade_fabrica: string, s_tel_resp_fabrica: string, s_email_fabrica: string, n_status_fabrica:number
  }[]>([]);
  
  useEffect(()=>{
    carregarEstoques()
  },[])

  async function carregarEstoques(){
    try {
      const endpoint = `/api/apiFabrica?action=getInitData`
      const response = await fetch(endpoint, { cache: "reload", method: "GET" })
      if (response.status === 200) {
        const returnDataApi = await response.json()
        setFabrica(returnDataApi.fabrica)
      } else {
        console.error(`Error ${response.status}`)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // return (
  //   <div>
  //     <Topo/>
  //     <div className='flex flex-col justify-center items-center p-5'>
  //       <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
  //       <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div>
  //       <div className='flex gap-5 justify-center items-center p-5'>
  //         <Botaolink img="/images/add.svg" txt="Nova Fábrica" caminho="/fabrica/novaFabrica"/>
  //         <Botaolink img="/images/edit.svg" txt="Editar Fábrica" caminho="/fabrica/editarFabrica"/>
  //         <Botaolink img="/images/list.svg" txt="Listar Fábricas" caminho="/fabrica/listaFabricas"/>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className='h-screen overflow-hidden'>
      {/* {load&&(<Loading/>)} */}
      <Topo/>
      <div className='h-screen flex flex-col items-end pb-10'>
        <div className='bg-[#1394DA] md:w-[calc(100%-60px)] w-full h-[80px] flex justify-center items-end'>
          <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Fábricas</p>
          <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
            <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[35px] rounded-xl bg-[#FFF] hover:bg-slate-300 transition duration-300' onClick={()=>{}}>
              Adicionar fábrica
            </button>
          </div>
        </div>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        {/* <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div> */}
        <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-80px)] flex flex-col items-center overflow-auto'>
        <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2'>Lista de fabricas</p>
        <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg w-[70%]'>
          <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Id</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Nome</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Cidade</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Telefone</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>E-mail</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Oper.</p>
          </div>
          <div className='h-auto overflow-auto'>
            {fabrica.map((a,index)=>(
              <div className='border-b-2 h-[35px] flex' key={index}>
                <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.n_id_fabrica}</p>
                <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_fabrica}</p>
                <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_cidade_fabrica}</p>
                <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_tel_resp_fabrica}</p>
                <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_email_fabrica}</p>
                <div className='w-[50%] flex items-center justify-center text-sm text-center'>
                  <Image alt='edit' width={20} height={20} src={'/images/edit.svg'} className='cursor-pointer'/>
                </div>
              </div>
            ))}
          </div>
        </div>
          {/* <Botaolink img="/images/add.svg" txt="Nova Fábrica" caminho="/fabrica/novaFabrica"/>
          <Botaolink img="/images/edit.svg" txt="Editar Fábrica" caminho="/fabrica/editarFabrica"/>
          <Botaolink img="/images/list.svg" txt="Listar Fábricas" caminho="/fabrica/listaFabricas"/> */}
        </div>
      </div>
    </div>
  );
}
