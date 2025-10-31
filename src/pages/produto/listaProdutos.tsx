import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeProdutos from '@/components/Produto/ListaDeProdutos';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaProduto(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Produtos" caminho="/produto/produto"/>
        <h1>Lista de Produtos</h1>

        <ListaDeProdutos/>
      </div>
    </div>
  );
}
