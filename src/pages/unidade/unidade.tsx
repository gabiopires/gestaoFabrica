import Topo from '@/components/Topo/Topo';
import Botaolink from '@/components/BotaoLink';
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';
import { useState, useEffect } from "react";

export default function PaginaFabrica(){

  const [unidade, setUnidade] = useState<{
    n_id_unidade: number, s_nome_unidade: string, n_ativo_unidade: string, s_nome_celula: string, s_nome_fabrica: string, s_endereco_pessoa:number
  }[]>([]);
  
  useEffect(()=>{
    carregarPessoas()
  },[])

  async function carregarPessoas(){
    try {
      const endpoint = `/api/apiUnidade?action=getInitData`
      const response = await fetch(endpoint, { cache: "reload", method: "GET" })
      if (response.status === 200) {
        const returnDataApi = await response.json()
        setUnidade(returnDataApi.unidade)
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
  //       <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/unidade.svg"/><h1 className='text-3xl'>Unidades</h1></div>
  //       <div className='flex gap-5 justify-center items-center p-5'>
  //         <Botaolink img="/images/add.svg" txt="Nova Unidade" caminho="/unidade/novaUnidade"/>
  //         <Botaolink img="/images/edit.svg" txt="Editar Unidade" caminho="/unidade/editarUnidade"/>
  //         <Botaolink img="/images/list.svg" txt="Listar Unidades" caminho="/unidade/listaUnidades"/>
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
          <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Unidades</p>
          <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
            <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[35px] rounded-xl bg-[#FFF] hover:bg-slate-300 transition duration-300' onClick={()=>{}}>
              Adicionar unidade
            </button>
          </div>
        </div>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        {/* <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div> */}
        <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-100px)] flex flex-col items-center pb-5 md:overflow-hidden overflow-auto'>
          <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2 h-[20px]'>Lista de Unidades</p>
          <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg md:w-[70%] w-[95%] h-[calc(100%-20px)]'>
            <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
              {/* <p className='w-[50%] flex items-center justify-center text-sm text-center'>Id</p> */}
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Nome</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Ativo</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Célula</p>
              <p className='w-[50%] flex items-center justify-center text-sm text-center'>Fábrica</p>
              <p className='w-[25%] flex items-center justify-center text-sm text-center'>Oper.</p>
            </div>
            <div className='h-auto md:h-[calc(100%-35px)] md:overflow-auto overflow-hidden'>
              {unidade.map((a,index)=>(
                <div className='border-b-2 h-[35px] flex' key={index}>
                  {/* <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.n_id_unidade}</p> */}
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_unidade}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{Number(a.n_ativo_unidade) == 1 ? "Sim" : "Não"}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_celula}</p>
                  <p className='w-[50%] flex items-center justify-center text-sm text-center'>{a.s_nome_fabrica}</p>
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
