import BotaoVoltar from "@/components/BotaoVoltar"
import Topo from "@/components/Topo/Topo"
import ListarEstoques from "@/components/Estoque/Lista/ListaEstoque"

export default function ListaEstoque() {

    return (
        <div>
            <Topo />
            <div className="flex flex-col gap-5 justify-start items-center p-5">
                <BotaoVoltar txt="Voltar" caminho="/estoque/estoque" />
                <h1>Lista de Estoques</h1>
                
                <div className='flex flex-col gap-5 justify-center items-center p-5'>
                    <ListarEstoques/>
                </div>
            </div>
        </div>
    )
}