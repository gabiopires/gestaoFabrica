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
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/maquina.svg"/><h1 className='text-3xl'>Máquinas</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <Botaolink img="/images/add.svg" txt="Nova Máquina" caminho="/maquina/novaMaquina"/>
          <Botaolink img="/images/edit.svg" txt="Editar Máquina" caminho="/maquina/editarMaquina"/>
          <Botaolink img="/images/list.svg" txt="Listar Máquina" caminho="/maquina/listaMaquinas"/>
        </div>
      </div>
    </div>
  );
}
