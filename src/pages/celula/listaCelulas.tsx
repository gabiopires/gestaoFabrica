import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeCelulas from '@/components/Celula/ListaDeCelulas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaCelula(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Células" caminho="/celula/celula"/>
        <h1>Lista Células</h1>

        <ListaDeCelulas/>
        
      </div>
    </div>
  );
}
