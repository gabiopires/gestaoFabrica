import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarPrograma from '@/components/Programa/PesquisarPrograma';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaEditarPrograma(){
  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idprograma,setIdprograma]=useState<string>("")
  const [nome_programa,setNome]=useState<string>("")
  const [codigo_programa,setCodigo]=useState<string>("")

  useEffect(()=>{
    if(idEditar){
      const endpoint=`${Configuracao.servidor}editarprograma/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdprograma(res[0].n_id_programa)
        setNome(res[0].s_nome_programa)
        setCodigo(res[0].s_codigo_programa)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  function limparCampos(){
    setIdPesquisa("")
    setIdprograma("")
    setNome("")
    setCodigo("")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID do programa que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${Configuracao.servidor}programa/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdprograma(res[0].n_id_programa)
        setNome(res[0].s_nome_programa)
        setCodigo(res[0].s_codigo_programa)
        setIdPesquisa("")
      }else{
        alert(`Nenhum programa encontrado com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_programa===""){
      alert("Digite o nome do programa")
      return
    }
    if(codigo_programa===""){
      alert("Digite o código identificador do programa")
      return
    }    
    const endpoint=`${Configuracao.servidor}programa`
    const dados={
      n_id_programa:idprograma,
      s_nome_programa:nome_programa,
      s_codigo_programa:codigo_programa,
      n_id_fabrica:Configuracao.fabrica
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
    if(idprograma!=""){
      const endpoint=`${Configuracao.servidor}programa/${idprograma}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdprograma(res[0].n_id_programa)
          setNome(res[0].s_nome_programa)
          setCodigo(res[0].s_codigo_programa)
          setIdPesquisa("")
        }
      })
    }
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex gap-5 justify-around'>
          <BotaoVoltar txt="Programas" caminho="/programa/programa"/>
          <BotaoVoltar txt="Lista Programas" caminho="/programa/listaProgramas"/>
        </div>
        <h1>Editar Programa</h1>
        
        <PesquisarPrograma id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Programa</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idprograma} onChange={e=>setIdprograma(e.target.value)}></input>
          </div>           
          <div className='campoForm'>
            <label>Nome do Programa</label>
            <input type="text" id="nomePrograma" value={nome_programa} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Código Identificador Programa</label>
            <input type="text" id="codPrograma" value={codigo_programa} onChange={(e)=>setCodigo(e.target.value)}></input>
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

