import Topo from '@/components/Topo/Topo';
import BotaoAcao from '@/components/Gerais/BotaoAcao';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

const servidor=Configuracao.servidor;

let prodAdd:any[]=[];
let iProdAdd:number=0;

export default function PaginaSimulador(){
  const [dataPedido,setDataPedido]=useState<any>("")
  const [statusPedido,setStatusPedido]=useState<any>("1")
  const [optionStatusPedido,setOptionStatusPedido]=useState<any>("")
  const [prioridadePedido,setPrioridadePedido]=useState<any>("3")
  const [optionsPrioridadePedido,setOptionsPrioridadePedido]=useState<any>("")
  const [listaProdutos,setListaProdutos]=useState<any>("")
  const [produtosAdicionados,setProdutosAdicionados]=useState<any[]>([])
  const [idPessoa,setIdPessoa]=useState<string>("")
  const [optionsPessoa,setOptionsPessoa]=useState<any[]>([])
  const [idFabrica,setIdFabrica]=useState<string>("1")
  const [optionsFabricaPedido,setOptionsFabricaPedido]=useState<any[]>([])

  useEffect(()=>{
    criarOpstionsStatusPedido()
    criarOpstionsPrioPed()
    carregarProdutos()
    carregarFabricas()
    setProdutosAdicionados([])
    carregarPessoa()
    prodAdd=[]
    iProdAdd=0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function criarOpstionsStatusPedido(){
    const endpoint=`${servidor}todosstatuspedido/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionStatusPedido(
        res.map((e:any)=>{
          return <option key={e.n_id_statuspedido} value={e.n_id_statuspedido}>{e.s_desc_statuspedido}</option>
        })
      )
    })
  }

  function criarOpstionsPrioPed(){
    const endpoint=`${servidor}todosprioridadepedido/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsPrioridadePedido(
        res.map((e:any)=>{
          return <option key={e.n_id_prioridadepedido} value={e.n_id_prioridadepedido}>{e.s_desc_prioridadepedido}</option>
        })
      )
    })
  }  

  function carregarFabricas(){
    const endpoint=`${servidor}fabrica/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsFabricaPedido(criarOptionsFabricas(res))
    })    
  }
  function criarOptionsFabricas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_fabrica} value={e.n_id_fabrica}>{e.s_nome_fabrica}</option>
    })
    // ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }  

  function carregarProdutos(idfab?:any){
    const endpoint=`${servidor}produtosfab/${idfab?idfab:idFabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setListaProdutos(
        res.map((e:any)=>{
          return(
            <div className='linhaGrid' key={e.n_id_produto}>
              <div className='c1_simulador'>{e.n_id_produto}</div>
              <div className='c2_simulador'>{e.s_nome_produto}</div>
              <div className='c3_simulador'><input className='w-[90%]' type='number'/></div>
              <div className='c4_simulador cursor-pointer'><BotaoAcao icone="/images/add.svg" funcao={addProd} title='Adicionar Produto'/></div>              
            </div>
          )
        })
      )
    })
  }

  function carregarPessoa(){
    const endpoint=`${servidor}pessoa/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsPessoa(criarOptionsPessoas(res))
    })    
  }
  function criarOptionsPessoas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_pessoa} value={e.n_id_pessoa}>{e.s_nome_pessoa}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function addProd(prod:any){
    const p={
      'id':prod.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML || 0,
      'desc':prod.target.parentNode.parentNode.parentNode.childNodes[1].innerHTML || 0,
      'qtde':prod.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].value || 0,
      'fabrica':idFabrica,
      'i':prod.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML || 0
    }
    prodAdd.push(p)
    iProdAdd++
    setProdutosAdicionados(criarLinhasProdAdd(prodAdd))
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

  function registrarPedido(){
    const dados={
      'pessoa':idPessoa,
      'data':dataPedido,
      'status':statusPedido,
      'prioridade':prioridadePedido,
      'n_id_fabrica':idFabrica,
      'produtos':prodAdd
    }
    const endpoint=`${servidor}registrarPedido/${JSON.stringify(dados)}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      alert("Pedido Realizado")
    })
  } 

  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' className='iconeTitulo iconeOper' src="/images/shopsim.svg"/><h1 className='text-3xl'>Simulador de Novos Pedidos</h1></div>

        <div className='flex flex-col gap-1 justify-start items-start p-5 w-full mb-1'>
          <h1>Dados do Pedido</h1>
          <div className='flex flex-col border w-[90%] p-1'>
            <div className='flex gap-5'>
              <div className='campoForm'>
                <label>Data</label>
                <input type="datetime-local" id="dataPedido" value={dataPedido} onChange={(e)=>setDataPedido(e.target.value)}></input>
              </div>
              <div className='campoForm'>
                <label>Fábrica</label>
                <select id="prioridadePedido" value={idFabrica} onChange={
                  (e)=>{
                    setIdFabrica(e.target.value)
                    carregarProdutos(e.target.value)
                  }
                }>
                  {optionsFabricaPedido?optionsFabricaPedido:""}
                </select>
              </div>                
              <div className='campoForm'>
                <label>Status</label>
                <select id="statusPedido" value={statusPedido} onChange={(e)=>setStatusPedido(e.target.value)}>
                  {optionStatusPedido?optionStatusPedido:""}
                </select>
              </div>
              <div className='campoForm'>
                <label>Prioridade</label>
                <select id="prioridadePedido" value={prioridadePedido} onChange={(e)=>setPrioridadePedido(e.target.value)}>
                  {optionsPrioridadePedido?optionsPrioridadePedido:""}
                </select>
              </div>                             
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 justify-start items-start p-5 w-full mb-1'>
          <div className='campoForm'>
            <label>Pessoa</label>
            <select id="f_statusPessoa" value={idPessoa} onChange={(e)=>setIdPessoa(e.target.value)}>
              {optionsPessoa?optionsPessoa:""}
            </select> 
          </div>
        </div>        

        <div className='flex flex-col gap-1 justify-start items-start p-5 w-full mb-1'>
          <h1>Produtos do Pedido</h1>
          <div className='flex border w-[90%] p-1 gap-5'>
            <div className='flex flex-col w-full'>
              <h1>Lista de Produtos</h1>
              <div className='tituloGrid'>
                <div className='c1_simulador'>ID</div>
                <div className='c2_simulador'>Produto</div>
                <div className='c3_simulador'>Qtde</div>
                <div className='c4_simulador'>Add</div>
              </div>
              <div className='areaConfig'>
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
              <div className='areaConfig'>
                {produtosAdicionados?produtosAdicionados:""}
              </div>              
            </div>           
          </div>

          <div className='flex flex-col gap-1 justify-start items-start p-5 w-full mb-1'>
            <button title="Registrar novo Pedido" className='btnPadrao' onClick={()=>{registrarPedido()}}>Registrar Novo Pedido</button>
          </div>       

        </div>

      </div>
    </div>
  );
}
