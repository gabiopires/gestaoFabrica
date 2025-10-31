import Topo from '@/components/Topo/Topo';
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaFabrica(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/sobre.svg"/><h1 className='text-3xl'>Sobre</h1></div>
        <div>Versão atual do sistema: {Configuracao.versao}</div>
      </div>
    </div>
  );
}
