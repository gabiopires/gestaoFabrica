import Topo from "@/components/Topo/Topo"
import Configuracao from "@/components/Configuracao/Configuracao"
import { useState, useEffect } from "react"
import ListaPedidoInterno from "@/components/PedidoInterno/ListaPedidoInterno"
import BotaoAcao from "@/components/Gerais/BotaoAcao"

const nFabrica = Configuracao.fabrica
const servidor = Configuracao.servidor

export default function PedidoInterno() {
  
let prodAdd:any[]=[];
let iProdAdd:number=0;
  const endpoint = servidor + `item/`
  const [linhas, setLinhas] = useState<any>(null)
  const [listaProdutos,setListaProdutos]=useState<any>("")
  const [produtosAdicionados,setProdutosAdicionados]=useState<any[]>([])
  const [dataPedido, setDataPedido] = useState<string>("")
  const [dataArray, setDataArray] = useState<any>()

  useEffect(() => {
    CarregarDados()
    carregarProdutos()
    setDataPedido(Hora())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function Hora(){
    let data = new Date()
    let d = data.toLocaleString()
    let d1 = d.split(",")
    let d2 = d1[0].split("/")
    let d11 = d1[1].split(" ")
    let d3 = d11[1].split(":")
    let string = d2[2]+"-"+d2[1]+"-"+d2[0]+"T"+d3[0]+":"+d3[1]
    console.log(string)
    return string
  }

  function CarregarDados() {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        setLinhas(CriarLinhas(res))
      })
  }

  function CriarLinhas(r: any) {
    const ld = r.map((e: any) => {
      if(e.n_id_fabrica == nFabrica){
        return <ListaPedidoInterno dados={e} key={Math.random()*9999999999999999999}/>
      }
    })
    return ld;
  }

  function criarLinhasProdAdd(r:any){
    const ld=r.map((e:any)=>{
        return(
          <div className='linhaGrid' key={e.i} data-id={e.id}>
            <div className='c1_simulador'>{e.id}</div>
            <div className='c2_simulador'>{e.desc}</div>
            <div className='c3_simulador'>{e.qtde}</div>
            <div className='c4_simulador'><BotaoAcao icone="/images/delete.svg" funcao={removeProd} title='Remover o produto'/></div>              
          </div>          
        )
    })
    return ld;
  }


  function addProd(prod:any){
    const p={
      'id':prod.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML || 0,
      'desc':prod.target.parentNode.parentNode.parentNode.childNodes[1].innerHTML || 0,
      'qtde':prod.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].value || 0,
      'fabrica':nFabrica,
      'i':prod.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML || 0
    }
    prodAdd.push(p)
    console.log(prodAdd)
    setDataArray(prodAdd)
    iProdAdd++
    setProdutosAdicionados(criarLinhasProdAdd(prodAdd))
  }

  function removeProd(prod:any){
    const p=prod.target.parentNode.parentNode.parentNode
    let prodAdd_aux=prodAdd.filter((e)=>{
      if(e.i!=p.dataset.id){
        return e
      }
    })
    prodAdd=prodAdd_aux
    setProdutosAdicionados(criarLinhasProdAdd(prodAdd))
  }

  function carregarProdutos(){
    const endpoint=`${servidor}produto/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setListaProdutos(
        res.map((e:any)=>{
          if(e.n_id_produto == 20){
          return(
            <div className='linhaGrid' key={e.n_id_produto}>
              <div className='c1_simulador'>{e.n_id_produto}</div>
              <div className='c2_simulador'>{e.s_nome_produto}</div>
              <div className='c3_simulador'><input className='w-[90%]' type='number'/></div>
              <div className='c4_simulador cursor-pointer'><BotaoAcao icone="/images/add.svg" funcao={addProd} title='Adicionar Produto'/></div>              
            </div>
          )
          }
        })
      )
    })
  }

  function registrarPedido(){
    const dados={
      'pessoa':1,
      'data':dataPedido,
      'status':1,
      'prioridade': 3,
      'n_id_fabrica':nFabrica,
      'produtos':dataArray
    }
    console.log(dados)
    const endpoint3=`${servidor}registrarPedido/${JSON.stringify(dados)}`
    console.log(endpoint3)
    fetch(endpoint3)
    .then(res=>res.json())
    .then(res=>{
      alert("Pedido Realizado")
    })
  } 

  return (
    <div>
      <Topo />
      <div className='flex flex-row gap-5 justify-start items-start p-5'>
        <div className=' w-[65%] h-[50%]'>
          <div className='flex flex-col justify-start items-center p-5 pt-0'>
            <div className='flex flex-col gap-1 justify-start items-start p-5 pt-0 w-full mb-1'>
              <h1>Realizar novo pedido interno</h1>
              <div className='flex border w-[100%] flex-col p-1 gap-5'>
                <div className='flex flex-col w-full'>
                  <h1>Lista de Produtos</h1>
                  <div className='tituloGrid'>
                    <div className='c1_simulador'>ID</div>
                    <div className='c2_simulador'>Produto</div>
                    <div className='c3_simulador'>Qtde</div>
                    <div className='c4_simulador'>Add</div>
                  </div>
                  <div className='flex flex-col h-50 max-h-50'>
                    {listaProdutos?listaProdutos:""}
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <h1>Produtos Adicionados</h1>
                  <div className='tituloGrid'>
                    <div className='c1_simulador'>ID</div>
                    <div className='c2_simulador'>Produto</div>
                    <div className='c3_simulador'>Qtde</div>
                    <div className='c4_simulador'>Remover</div>
                  </div>
                  <div className='flex flex-col h-50 max-h-50'>
                    {produtosAdicionados?produtosAdicionados:""}
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1 justify-start items-center p-5 w-full mb-1'>
                <button title="Registrar novo Pedido" className='btnPadrao' onClick={()=>{registrarPedido()}}>Registrar Pedido Interno</button>
              </div>

            </div>

          </div>
        </div>
    
        <div className=' max-w-[450px] w-[35%]'>
          <div className="flex flex-col justify-center itens-center">
            <p>Lista de Materiais disponiveis</p>
          </div>
          <div>
            <div className="tituloGrid">
              <div className="c70">ID</div>
              <div className="c300">Nome </div>
              <div className="c100">Qtd.</div>
            </div>
            <div>
              {linhas ? linhas : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}