import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeMaquinas from '@/components/Maquina/ListaDeMaquinas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaMaquinas(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Máquina" caminho="/maquina/maquina"/>
        <h1>Lista Máquinas</h1>

        <ListaDeMaquinas/>
      </div>
    </div>
  );
}
