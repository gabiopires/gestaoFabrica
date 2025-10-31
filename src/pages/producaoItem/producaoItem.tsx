import Topo from '@/components/Topo/Topo';
import ListaDeProducaoItem from '@/components/ProducaoItem/ListaDeProducaoItem';
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

export default function PaginaProducao(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versaoProducaoItem}</div>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/robo.svg"/><h1 className='text-3xl'>Acompanhamento de Produção por ITENS</h1></div>

        <div className='flex flex-col gap-2 border p-2 rounded-md w-[500px]'>
          <div className='flex gap-5'>
              <div className="flex flex-col w-full gap-1">
                  <div className="flex justify-center">Legenda:</div>
              </div>
              <div className="flex flex-col w-full gap-1">
                  <div>Fila Prod.</div>
                  <div className="filaproducao rounded-lg">&nbsp;</div>
              </div>
              <div className="flex flex-col w-full gap-1">
                  <div>Produzindo</div>
                  <div className="produzindo rounded-lg">&nbsp;</div>
              </div>
              <div className="flex flex-col w-full gap-1">
                  <div>Finalizado</div>
                  <div className="finalizado rounded-lg">&nbsp;</div>
              </div>              
          </div>
        </div>
        <div className='flex flex-col gap-5 justify-center items-center p-5'>
          <ListaDeProducaoItem/>
        </div>
      </div>
    </div>
  );
}
