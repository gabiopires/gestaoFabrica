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
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/programa.svg"/><h1 className='text-3xl'>Programas</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <Botaolink img="/images/add.svg" txt="Novo Programa" caminho="/programa/novoPrograma"/>
          <Botaolink img="/images/edit.svg" txt="Editar Programa" caminho="/programa/editarPrograma"/>
          <Botaolink img="/images/list.svg" txt="Listar Programas" caminho="/programa/listaProgramas"/>
        </div>
      </div>
    </div>
  );
}
