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
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/celula.svg"/><h1 className='text-3xl'>Células</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <Botaolink img="/images/add.svg" txt="Nova Célula" caminho="/celula/novaCelula"/>
          <Botaolink img="/images/edit.svg" txt="Editar Célula" caminho="/celula/editarCelula"/>
          <Botaolink img="/images/list.svg" txt="Listar Célula" caminho="/celula/listaCelulas"/>
        </div>
      </div>
    </div>
  );
}
