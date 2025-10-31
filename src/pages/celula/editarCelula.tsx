import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarCelula from '@/components/Celula/PesquisarCelula';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaEditarCelula(){

  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idcelula,setIdcelula]=useState<string>("")
  const [nome_celula,setNome]=useState<string>("")
  const [ativo,setAtivo]=useState<string>("")

  useEffect(()=>{
    if(idEditar){
      const endpoint=`${Configuracao.servidor}editarcelula/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdcelula(res[0].n_id_celula)
        setNome(res[0].s_nome_celula)
        setAtivo(res[0].n_ativo_celula)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  function limparCampos(){
    setIdPesquisa("")
    setIdcelula("")
    setNome("")
    setAtivo("")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID da Célula que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${Configuracao.servidor}editarcelula/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdcelula(res[0].n_id_celula)
        setNome(res[0].s_nome_celula)
        setAtivo(res[0].n_ativo_celula)
        setIdPesquisa("")
      }else{
        alert(`Nenhuma fábrica encontrada com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_celula===""){
      alert("Digite o nome da fábrica")
      return
    }
    if(ativo===""){
      alert("Digite a cidade da fábrica")
      return
    }
    const endpoint=`${Configuracao.servidor}celula`
    const dados={
      n_id_celula:idcelula,
      s_nome_celula:nome_celula,
      n_ativo_celula:ativo,
      n_id_fabrica:localStorage.getItem("fabrica")
    }
    console.log(dados)
    const cabecalho={
      method:"PUT",
      body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos alterados com sucesso!")
      }
    })       
  }

  function cancelar(){
    if(idcelula!=""){
      const endpoint=`${Configuracao.servidor}editarcelula/${idcelula}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdcelula(res[0].n_id_celula)
          setNome(res[0].s_nome_celula)
          setAtivo(res[0].n_ativo_celula)
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
          <BotaoVoltar txt="Célula" caminho="/celula/celula"/>
          <BotaoVoltar txt="Lista Células" caminho="/celula/listaCelulas"/>
        </div>  
        <h1>Editar Célula</h1>

        <PesquisarCelula id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Célula</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idcelula} onChange={e=>setIdcelula(e.target.value)}></input>
          </div>          
          <div className='campoForm'>
            <label>Nome Célula</label>
            <input type="text" id="nomeCelula" value={nome_celula} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Ativa</label>
            <select id="ativaCelula" value={ativo} onChange={(e)=>setAtivo(e.target.value)}>
            <option value="-1"></option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>  
          <div className='flex gap-5 justify-center items-center p-5'>
            <button className='btnPadrao' onClick={()=>gravar()}>Gravar</button>
            <button className='btnPadrao' onClick={()=>cancelar()}>Cancelar</button>
          </div>          
        </div>
      </div>
    </div>
  )
}
