import Topo from '@/components/Topo/Topo';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaFabrica(){

  const [maquina, setMaquina] = useState<{n_id_programa: number, s_nome_programa: string, s_codigo_programa: string, s_nome_fabrica: string}[]>([]);
  
  useEffect(()=>{
    carregarCelulas()
  },[])

  async function carregarCelulas(){
    try {
      const endpoint = `/api/apiPrograma?action=getInitData`
      const response = await fetch(endpoint, { cache: "reload", method: "GET" })
      if (response.status === 200) {
        const returnDataApi = await response.json()
        setMaquina(returnDataApi.programa)
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
  //       <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/programa.svg"/><h1 className='text-3xl'>Programas</h1></div>
  //       <div className='flex gap-5 justify-center items-center p-5'>
  //         <Botaolink img="/images/add.svg" txt="Novo Programa" caminho="/programa/novoPrograma"/>
  //         <Botaolink img="/images/edit.svg" txt="Editar Programa" caminho="/programa/editarPrograma"/>
  //         <Botaolink img="/images/list.svg" txt="Listar Programas" caminho="/programa/listaProgramas"/>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className='h-screen overflow-hidden'>
      {/* {load&&(<Loading/>)} */}
      <Topo/>
      <div className='h-[calc(100%-70px)] flex flex-col items-end'>
        <div className='bg-[#1394DA] md:w-[calc(100%-60px)] w-full h-[80px] flex justify-center items-end'>
          <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Programas</p>
          <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
            <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[35px] rounded-xl bg-[#FFF] hover:bg-slate-300 transition duration-300' onClick={()=>{}}>
              Adicionar programa
            </button>
          </div>
        </div>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        {/* <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div> */}
        <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-100px)] flex flex-col items-center pb-5 md:overflow-hidden overflow-auto'>
          <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2 h-[20px]'>Lista de Programas</p>
          <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg md:w-[70%] w-[95%] h-[calc(100%-20px)]'>
            <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
              {/* <p className='w-[50%] flex items-center justify-center text-sm text-center'>Id</p> */}
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Nome</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Código</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Fabrica</p>
              <p className='w-[25%] flex items-center justify-center text-sm text-center'>Opr.</p>
            </div>
            <div className='h-auto md:h-[calc(100%-35px)] overflow-auto'>
              {maquina.map((a,index)=>(
                <div className='border-b-2 h-[35px] flex' key={index}>
                  {/* <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.n_id_programa}</p> */}
                  <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.s_nome_programa}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.s_codigo_programa}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center leading-none'>{a.s_nome_fabrica}</p>
                  <div className='w-[20%] flex items-center justify-center text-sm text-center'>
                    <Image alt='edit' width={20} height={20} src={'/images/edit.svg'} className='cursor-pointer'/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
