import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeFabricas from '@/components/Fabrica/ListaDeFabricas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaFabricas(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Fábrica" caminho="/fabrica/fabrica"/>
        <h1>Lista Fábricas</h1>

        <ListaDeFabricas/>

      </div>
    </div>
  );
}
