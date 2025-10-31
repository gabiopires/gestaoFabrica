import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarProduto from '@/components/Produto/PesquisarProduto';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaEditarDetalhesPedido(){
  const router = useRouter();
  const pidEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idproduto,setIdproduto]=useState<string>("")
  const [nome_produto,setNome]=useState<string>("")

  useEffect(()=>{
    if(pidEditar){
      const endpoint=`${servidor}produto/${pidEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdproduto(res[0].idproduto)
        setNome(res[0].nome_produto)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  function limparCampos(){
    setIdPesquisa("")
    setIdproduto("")
    setNome("")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID do produto que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${servidor}produto/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdproduto(res[0].idproduto)
        setNome(res[0].nome_produto)
        setIdPesquisa("")
      }else{
        alert(`Nenhum produto encontrado com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_produto===""){
      alert("Digite o nome do produto")
      return
    }  
    const endpoint=`${servidor}produto`
    const dados={
      idproduto:idproduto,
      nome_produto:nome_produto
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
    if(idproduto!=""){
      const endpoint=`${servidor}produto/${idproduto}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdproduto(res[0].idproduto)
          setNome(res[0].nome_produto)
          setIdPesquisa("")
        }
      })
    }
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <BotaoVoltar txt="Produtos" caminho="/produto/produto"/>
        <h1>Editar Produto</h1>
        
        <PesquisarProduto id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Produto</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idproduto} onChange={e=>setIdproduto(e.target.value)}></input>
          </div>           
          <div className='campoForm'>
            <label>Nome do Produto</label>
            <input type="text" id="nomePrograma" value={nome_produto} onChange={(e)=>setNome(e.target.value)}></input>
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

