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
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/unidade.svg"/><h1 className='text-3xl'>Unidades</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <Botaolink img="/images/add.svg" txt="Nova Unidade" caminho="/unidade/novaUnidade"/>
          <Botaolink img="/images/edit.svg" txt="Editar Unidade" caminho="/unidade/editarUnidade"/>
          <Botaolink img="/images/list.svg" txt="Listar Unidades" caminho="/unidade/listaUnidades"/>
        </div>
      </div>
    </div>
  );
}
