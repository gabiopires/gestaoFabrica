import Topo from "@/components/Topo/Topo"
import Image from "next/image"
import EstoqueProducao from "@/components/EstoqueProducao/EstoqueProducao"

export default function estoqueproducao(){
    return(
        <div>
        <Topo/>
        <div className='flex flex-col justify-center items-center p-5'>
          <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/robo.svg"/><h1 className='text-3xl'>Estoque de Produção</h1></div>
          <div className='flex flex-col gap-5 justify-center items-center p-5'>
            <EstoqueProducao/>
          </div>
        </div>
      </div>
    )
}