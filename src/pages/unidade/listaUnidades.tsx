import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeUnidades from '@/components/Unidade/ListaDeUnidades';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaUnidades(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Unidades" caminho="/unidade/unidade"/>
        <h1>Lista Unidades</h1>

        <ListaDeUnidades/>
      </div>
    </div>
  );
}
