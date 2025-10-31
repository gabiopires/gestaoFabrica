import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDePessoas from '@/components/Pessoa/ListaDePessoas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaPessoas(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Pessoa" caminho="/pessoa/pessoa"/>
        <h1>Lista Pessoas</h1>

        <ListaDePessoas/>
      </div>
    </div>
  );
}
