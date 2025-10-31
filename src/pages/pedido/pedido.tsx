import Topo from '@/components/Topo/Topo';
import ListaDePedidos from '@/components/Pedido/ListaDePedidos';
import Image from 'next/image';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaPedido(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versaoPedidoERP}</div>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/reportList.svg"/><h1 className='text-3xl'>Pedidos - ERP</h1></div>
        <div className='flex flex-col gap-5 justify-center items-center p-5'>
          <ListaDePedidos/>
        </div>
      </div>
    </div>
  );
}
