import Topo from '@/components/Topo/Topo';
import Botaolink from '@/components/BotaoLink';
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaFabrica(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <Botaolink img="/images/add.svg" txt="Nova Fábrica" caminho="/fabrica/novaFabrica"/>
          <Botaolink img="/images/edit.svg" txt="Editar Fábrica" caminho="/fabrica/editarFabrica"/>
          <Botaolink img="/images/list.svg" txt="Listar Fábricas" caminho="/fabrica/listaFabricas"/>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='h-screen overflow-hidden'>
  //     {load&&(<Loading/>)}
  //     <Topo/>
  //     <div className='h-screen flex flex-col items-end pb-10'>
  //       <div className='bg-[#1394DA] md:w-[calc(100%-60px)] w-full h-[80px] shadow-[0_5px_5px_rgba(0,0,0,0.3)] flex justify-center items-end'>
  //         <p className='ml-[10%] mt-4 mb-4 text-2xl text-white'>Fábricas</p>
  //         <div className='h-full w-full flex md:flex-row flex-col justify-end items-end gap-2'>
  //           <button className='md:mb-4 mb-2 md:w-[250px] w-[180px] md:mr-[10%] mr-2 h-[30px] rounded-2xl bg-[#FFF] shadow-[0px_3px_10px_rgba(0,0,0,0.3)] hover:bg-slate-300 transition duration-300' onClick={()=>{}}>
  //             Editar/Adicionar fábrica
  //           </button>
  //         </div>
  //       </div>
  //       <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
  //       {/* <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/fabrica.svg"/><h1 className='text-3xl'>Fábricas</h1></div> */}
  //       <div className='w-[100%] md:w-[calc(100%-60px)] h-[calc(100%-80px)] flex flex-col items-center overflow-auto border-2 border-black'>
  //       <p className='mt-5 md:ml-12 ml-8 md:mr-2 mr-5 mb-2'>Bruto/Preparado</p>
  //       <div className='border-2 border-b-0 md:ml-10 md:mr-2 rounded-lg'>
  //         <div className='bg-[#EEEEEE] h-[35px] rounded-t-lg flex md:pb-0 pb-7 pt-7 md:pt-0'>
  //             <p className='w-[50%] flex items-center justify-center text-sm text-center'>Item</p>
  //             <p className='w-[50%] flex items-center justify-center text-sm text-center'>Qtd Bruto</p>
  //             <p className='w-[50%] flex items-center justify-center text-sm text-center'>Qtd Preparado</p>
  //         </div>
  //         <div className='h-auto overflow-auto'>
  //           {/* {bruto.map((a,index)=>( */}
  //             <div className='border-b-2 h-[35px] flex'>
  //               {linhas?linhas:""}
  //             </div>
  //           {/* ))} */}
  //         </div>
  //       </div>
  //         {/* <Botaolink img="/images/add.svg" txt="Nova Fábrica" caminho="/fabrica/novaFabrica"/>
  //         <Botaolink img="/images/edit.svg" txt="Editar Fábrica" caminho="/fabrica/editarFabrica"/>
  //         <Botaolink img="/images/list.svg" txt="Listar Fábricas" caminho="/fabrica/listaFabricas"/> */}
  //       </div>
  //     </div>
  //   </div>
  // );
}
