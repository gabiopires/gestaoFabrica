import Topo from '@/components/Topo/Topo';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

const servidor=Configuracao.servidor;

export default function PaginaConfiguracao(){

  const [optionsStatusPedido,setOptionsStatusPedido]=useState<any[]>([])

  const [optionsStatusProduto,setOptionsStatusProduto]=useState<any[]>([])

  const [optionsStatusItem,setOptionsStatusItem]=useState<any[]>([])  

  const [optionsStatusEtapa,setOptionsStatusEtapa]=useState<any[]>([])  

  const [optionsStatusMp,setOptionsStatusMp]=useState<any[]>([])    

  const [optionsUnMed,setOptionsUnMed]=useState<any[]>([])    

  const [optionsPrioPed,setOptionsPrioPed]=useState<any[]>([])      

  useEffect(()=>{
    obterStatusPedido()
    obterStatusProduto()
    obterStatusItem()
    obterStatusEtapa()
    obterStatusMp()
    obterUnMed()
    obterPrioPed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function obterStatusPedido(){
    const endpoint=`${servidor}todosstatuspedido`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusPedido(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_statuspedido}</div>
              <div className='c200'>{e.s_desc_statuspedido}</div>
            </div> 
          )
        })
      )
    })
  }

  function obterStatusProduto(){
    const endpoint=`${servidor}todosstatusproduto`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusProduto(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_statusproduto}</div>
              <div className='c200'>{e.s_desc_statusproduto}</div>
            </div> 
          )
        })
      )
    })
  } 
  
   function obterStatusItem(){
    const endpoint=`${servidor}todosstatusitem`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusItem(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_statusitem}</div>
              <div className='c200'>{e.s_desc_statusitem}</div>
            </div> 
          )
        })
      )
    })
  }  
  
  function obterStatusEtapa(){
    const endpoint=`${servidor}todosstatusetapa`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusEtapa(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_statusetapa}</div>
              <div className='c200'>{e.s_desc_statusetapa}</div>
            </div> 
          )
        })
      )
    })
  } 
  
  function obterStatusMp(){
    const endpoint=`${servidor}todosstatusmp`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusMp(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_statusmateriaprima}</div>
              <div className='c200'>{e.s_desc_statusmateriaprima}</div>
            </div> 
          )
        })
      )
    })
  }    

  function obterUnMed(){
    const endpoint=`${servidor}todosunmed`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsUnMed(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_unidademedida}</div>
              <div className='c200'>{e.s_desc_unidademedida}</div>
            </div> 
          )
        })
      )
    })
  }   
  
  function obterPrioPed(){
    const endpoint=`${servidor}todosprioridadepedido`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsPrioPed(
        res.map((e:any)=>{
          return (
            <div className='linhaGrid' key={Math.random()*9999999999999999999}>
              <div className='c70'>{e.n_id_prioridadepedido}</div>
              <div className='c200'>{e.s_desc_prioridadepedido}</div>
            </div> 
          )
        })
      )
    })
  }    

  function deletarTodosPedidos(){
    const endpoint=`${servidor}deletarTodosPedidos`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      alert("Todos pedidos deletados")
    })    
  }

  function concluirTodosItens(){
    const endpoint=`${servidor}concluirTodosItens`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      alert("Todos Itens Concluídos")
    })    
  }  

  return (
    <div>
      <Topo/>
      <div className='flex flex-col justify-center items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex justify-center items-center'><Image width={0} height={0} alt='' src="/images/config_b.svg"/><h1 className='text-3xl'>Configurações</h1></div>
        <div className='flex justify-center items-center gap-3'>
          <button className='btnPadrao' onClick={()=>deletarTodosPedidos()}>Deletar Todos Pedidos</button>
          <button className='btnPadrao' onClick={()=>concluirTodosItens()}>Concluir Todos os Itens em Produção</button>
        </div>
        <div className='flex gap-5 justify-center items-center p-5 w-[100%]'>
          
          <div className='flex gap-5 flex-wrap justify-around items-start'>

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Status Pedido</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Status Pedido</label>
                  <div className='flex gap-3'>
                      <input type="text" id="descPedido" value={descStatusPedido} onChange={(evt)=>{setDescStatusPedido(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsStatusPedido?optionsStatusPedido:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div>

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Status Produto</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Status Produto</label>
                  <div className='flex gap-3'>
                      <input type="text" id="descProduto" value={descStatusProduto} onChange={(evt)=>{setDescStatusProduto(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsStatusProduto?optionsStatusProduto:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div>

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Status Item</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Status Ítem</label>
                  <div className='flex gap-3'>
                      <input type="text" id="descItem" value={descStatusItem} onChange={(evt)=>{setDescStatusItem(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsStatusItem?optionsStatusItem:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div>         

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Status Etapa</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Status Etapa</label>
                  <div className='flex gap-3'>
                      <input type="text" id="descEtapa" value={descStatusEtapa} onChange={(evt)=>{setDescStatusEtapa(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsStatusEtapa?optionsStatusEtapa:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div>  

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Status Matéria Prima</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Status Matéria Prima</label>
                  <div className='flex gap-3'>
                      <input type="text" id="descMateriaPrima" value={descStatusMp} onChange={(evt)=>{setDescStatusMp(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsStatusMp?optionsStatusMp:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div> 

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Unidades de Medida</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Unidades de Medida</label>
                  <div className='flex gap-3'>
                      <input type="text" id="unMed" value={descUnMed} onChange={(evt)=>{setDescUnMed(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsUnMed?optionsUnMed:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div> 

            <div className='flex flex-col p-1 border painelConfig'>
              <div className='tituloConfig'>Prioridades do Pedido</div>
              <div className='principalConfig'>
                {/* <div className='campoForm w-[100%]'>
                  <label>Descrição Unidades de Medida</label>
                  <div className='flex gap-3'>
                      <input type="text" id="unMed" value={descUnMed} onChange={(evt)=>{setDescUnMed(evt.target.value)}}></input>
                  </div>
                </div> */}
                <div className='campoForm w-[100%]'>
                  <div className='flex flex-col w-[100%]'>
                    <div className='tituloGrid'>
                      <div className='c70'>ID</div>
                      <div className='c200'>Descrição</div>
                    </div>
                    <div className='h-[200px] max-h-[200px] overflow-y-scroll border'>
                      {optionsPrioPed?optionsPrioPed:""}
                    </div>
                  </div>
                </div>                  
              </div>
              {/* <div className='rodapeConfig'>
                <button className='btnPadrao' onClick={()=>{}}>Novo</button>
                <button className='btnPadrao' onClick={()=>{}}>Gravar</button>
              </div> */}
            </div>                                                      

          </div>     

        </div>
      </div>
    </div>
  );
}
