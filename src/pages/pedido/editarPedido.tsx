import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaEditarPrograma(){
  const router = useRouter();
  const pidEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idpedido,setIdpedido]=useState<string>("")
  const [quantidade,setQuantidade]=useState<string>("")
  const [data,setData]=useState<string>("")
  const [status,setStatus]=useState<string>("")
  const [prioridade,setPrioridade]=useState<string>("-1")

  useEffect(()=>{
    if(pidEditar){
      const endpoint=`${servidor}pedido/${pidEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdpedido(res[0].idpedido)
        setQuantidade(res[0].quantidade)
        setData(res[0].data_pedido)
        setStatus(res[0].status)
        setPrioridade(res[0].prioridade_pedido)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  function gravar(){
    if(quantidade===""){
      alert("Digite o nome do programa")
      return
    }
    if(data===""){
      alert("Digite o código identificador do programa")
      return
    }    
    const endpoint=`${servidor}pedido`
    const dados={
      idpedido:idpedido,
      quantidade:quantidade,
      data_pedido:data,
      status:status,
      prioridade_pedido:prioridade
    }    
    const cabecalho={
      method:"PUT",
      body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Dados alterados com sucesso!")
      }
    })       
  }

  function cancelar(){
    if(idpedido!=""){
      const endpoint=`${servidor}pedido/${idpedido}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdpedido(res[0].idpedido)
          setQuantidade(res[0].quantidade)
          setData(res[0].data)
          setIdPesquisa("")
          setStatus(res[0].status)
          setPrioridade(res[0].prioridade_pedido)          
        }
      })
    }
  }

  function retornatStatus(st:any){
    let r=""
    if(st=="1")
      return "Aguardando"
    else if(st=="2")
      return "Fila Produção"
    else if(st=="3")
      return "Produzindo"
    else if(st=="4")
      return "Finalizado" 
    else if(st=="5")
      return "Bloqueado"    
  }

  function retornatPrioridade(pr:any){
    let r=""
    if(pr=="1")
      return "Master"
    else if(pr=="2")
      return "Prioridade"
    else if(pr=="3")
      return "Padrão" 
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Pedidos" caminho="/pedido/pedido"/>
        <h1>Editar Pedido</h1>
        
        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Pedido</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idpedido} onChange={e=>setIdpedido(e.target.value)}></input>
          </div>           
          <div className='campoForm'>
            <label>Quantidade</label>
            <input type="text" id="nomePrograma" value={quantidade} onChange={(e)=>setQuantidade(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Data</label>
            <input type="text" id="codPrograma" value={data} onChange={(e)=>setData(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Status</label>
            <input type="text" readOnly className='cursor-not-allowed' value={retornatStatus(status)}/>
          </div> 
          <div className='campoForm'>
            <label>Prioridade</label>
            <input type="text" readOnly className='cursor-not-allowed' value={retornatPrioridade(prioridade)}/>
          </div>                                 
        </div>
        <div className='flex gap-5 justify-center items-center p-5'>
            <button className='btnPadrao' onClick={()=>gravar()}>Gravar</button>
            <button className='btnPadrao' onClick={()=>cancelar()}>Cancelar</button>
          </div>          
      </div>
    </div>
  );
}

