import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaDeMateriasprimas from '@/components/MateriaPrima/ListaDeMateriasprimas';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaListaMateriaPrima(){
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Matéria Prima" caminho="/materiaprima/materiaprima"/>
        <h1>Lista de Matérias Primas</h1>

        <ListaDeMateriasprimas/>
      </div>
    </div>
  );
}
