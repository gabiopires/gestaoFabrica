import Topo from "@/components/Topo/Topo"
import ListaHistorico from "@/components/Historico/ListaHistorico"
import Image from "next/image"

export default function PaginaHistorico(){
    return(
        <div>
            <Topo/>
            <div className="flex flex-col justify-center items-center p-5">
                <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/historico.svg"/><h1 className='text-3xl'>Histórico</h1></div>
                <ListaHistorico/>
            </div>
        </div>
    )
}