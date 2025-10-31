import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeProgramas from '@/components/Programa/ListaDeProgramas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaProgramas(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Programas" caminho="/programa/programa"/>
        <h1>Lista Programas</h1>

        <ListaDeProgramas/>
      </div>
    </div>
  );
}
