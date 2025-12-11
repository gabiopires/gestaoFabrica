import Topo from '@/components/Topo/Topo';
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';
import { useState, useEffect } from "react";

export default function PaginaFabrica(){

  const [celula, setCelula] = useState<{
    n_id_celula: number, s_nome_celula: string, n_ativo_celula: string, s_nome_fabrica: string, s_telefone1_pessoa: string, s_endereco_pessoa:number
  }[]>([]);
  
  useEffect(()=>{
    carregarCelulas()
  },[])

  async function carregarCelulas(){
    try {
      const endpoint = `/api/apiCelula?action=getInitData`
      const response = await fetch(endpoint, { cache: "reload", method: "GET" })
      if (response.status === 200) {
        const returnDataApi = await response.json()
        setCelula(returnDataApi.celula)
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
  //       <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/celula.svg"/><h1 className='text-3xl'>Células</h1></div>
  //       <div className='flex gap-5 justify-center items-center p-5'>
  //         <Botaolink img="/images/add.svg" txt="Nova Célula" caminho="/celula/novaCelula"/>
  //         <Botaolink img="/images/edit.svg" txt="Editar Célula" caminho="/celula/editarCelula"/>
  //         <Botaolink img="/images/list.svg" txt="Listar Célula" caminho="/celula/listaCelulas"/>
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
          <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Células</p>
          <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
            <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[35px] rounded-xl bg-[#FFF] hover:bg-slate-300 transition duration-300' onClick={()=>{}}>
              Adicionar célula
            </button>
          </div>
        </div>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        {/* <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div> */}
        <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-100px)] flex flex-col items-center pb-5 md:overflow-hidden overflow-auto'>
          <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2 h-[20px]'>Lista de Células</p>
          <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg md:w-[70%] w-[95%] h-[calc(100%-20px)]'>
            <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
              {/* <p className='w-[50%] flex items-center justify-center text-sm text-center'>Id</p> */}
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Nome</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Ativo</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Fábrica</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Oper.</p>
            </div>
            <div className='h-auto md:h-[calc(100%-35px)] overflow-auto'>
              {celula.map((a,index)=>(
                <div className='border-b-2 h-[35px] flex' key={index}>
                  {/* <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.n_id_celula}</p> */}
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_celula}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{Number(a.n_ativo_celula) == 1 ? "Sim" : "Não"}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_fabrica}</p>
                  <div className='w-[50%] flex items-center justify-center text-sm text-center'>
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
