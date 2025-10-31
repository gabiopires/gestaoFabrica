import BotaoVoltar from "@/components/BotaoVoltar"
import Topo from "@/components/Topo/Topo"

export default function EditarEstoque(){

    return (
        <div>
            <Topo/>
            <div className="flex flex-col gap-5 justify-start items-center p-5">
                <div className="flex gap-5 justify-around">
                    <BotaoVoltar txt="Estoque" caminho="/estoque/estoque"/>
                    <BotaoVoltar txt="Lista Estoque" caminho="/estoque/listaEstoque"/>
                </div>
            </div>
        </div>
    )
}