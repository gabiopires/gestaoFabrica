import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeItens from '@/components/Item/ListaDeItens';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaItens(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Itens" caminho="/item/item"/>
        <h1>Lista de Itens</h1>

        <ListaDeItens/>
      </div>
    </div>
  );
}
