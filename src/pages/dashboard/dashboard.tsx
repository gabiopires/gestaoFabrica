import Topo from "@/components/Topo/Topo";
import Botaolink from '@/components/BotaoLink';
import ListaDashboardPedidos from "@/components/Dashboard/ListaDashboardPedidos";
import ListaDashboardFiltro from "@/components/Dashboard/ListaDashboardFiltro";

export default function acompanhamento() {
    return (
        <div>
            <Topo/>
            <div className="grid grid-rows-1 grid-flow-col gap-4 text-center justify-around p-3">
                <div className="row-span-3 flex flex-col justify-center items-center border-b-2 border-r-2">
                    <div className='flex flex-col gap-2 border p-2 mt-3 rounded-md w-[600px]'>
                        <div className="flex flex-col w-full gap-1">
                            <div className="flex justify-center">Legenda:</div>
                        </div>
                        <div className='flex gap-5 text-center'>
                            <div className="flex flex-col w-full gap-1 ">
                                <div>Aguardando</div>
                                <div className="aguardando rounded-lg">&nbsp;</div>
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <div>Fila Prod.</div>
                                <div className="filaproducao rounded-lg">&nbsp;</div>
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <div>Produzindo</div>
                                <div className="produzindo rounded-lg">&nbsp;</div>
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <div>Finalizado</div>
                                <div className="finalizado rounded-lg">&nbsp;</div>
                            </div>
                            <div className="flex flex-col w-full gap-1 ">
                                <div>Bloqueado</div>
                                <div className="bloqueado rounded-lg">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-start gap-4 p-5 '>
                        <div className='flex flex-col justify-center items-center p-3 border-2 border-black'>
                            <Botaolink img="/images/fabrica.svg" txt="Centro 4.0" caminho="/programa/novoPrograma" />
                            <ListaDashboardPedidos idFab={1} />
                        </div>
                        <div className='flex flex-col justify-center items-center p-3 border-2 border-black'>
                            <Botaolink img="/images/fabrica.svg" txt="Juiz de Fora" caminho="/programa/novoPrograma" />
                            <ListaDashboardPedidos idFab={2} />
                        </div>
                        <div className='flex flex-col justify-center items-center p-3 border-2 border-black'>
                            <Botaolink img="/images/fabrica.svg" txt="Extrema" caminho="/programa/novoPrograma" />
                            <ListaDashboardPedidos idFab={3} /> 
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-l-2 border-b-2">
                    <div className='flex justify-center items-start'>
                        <ListaDashboardFiltro />
                    </div>
                </div>
            </div>
        </div>
    )
} 