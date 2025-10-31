import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarUnidade from '@/components/Unidade/PesquisarUnidade';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaEditarUnidade(){
  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idunidade,setIdunidade]=useState<string>("")
  const [nome_unidade,setNome]=useState<string>("")
  const [ativo,setAtivo]=useState<string>("")
  const [celula_idcelula,setIdCelula]=useState<string>("")
  const [celulaOptions,setCelulaOptions]=useState<any>(null)

  useEffect(()=>{
    carregarCelulas()
    if(idEditar){
      const endpoint=`${Configuracao.servidor}editarunidade/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdunidade(res[0].n_id_unidade)
        setNome(res[0].s_nome_unidade)
        setAtivo(res[0].n_ativo_unidade)
        setIdCelula(res[0].n_id_celula)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function carregarCelulas(){
    const endpoint=`${Configuracao.servidor}celula/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        setCelulaOptions(criarOptionsCelulas(res))
    })
  }

  function criarOptionsCelulas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_celula} value={e.n_id_celula}>{e.s_nome_celula}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }
  
  function limparCampos(){
    setIdPesquisa("")
    setIdunidade("")
    setNome("")
    setAtivo("")
    setIdCelula("")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID da Célula que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${Configuracao.servidor}editarunidade/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdunidade(res[0].n_id_unidade)
        setNome(res[0].s_nome_unidade)
        setAtivo(res[0].n_ativo_unidade)
        setIdCelula(res[0].n_id_celula)
        setIdPesquisa("")
      }else{
        alert(`Nenhuma fábrica encontrada com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_unidade===""){
      alert("Digite o nome da unidade")
      return
    }
    if(ativo==="-1"){
      alert("Selecione se a unidade estará ativa ou não")
      return
    }
    if(celula_idcelula===""){
      alert("Digite o telefone da célula")
      return
    }
    const endpoint=`${Configuracao.servidor}unidade`
    const dados={
      n_id_unidade:idunidade,
      s_nome_unidade:nome_unidade,
      n_ativo_unidade:ativo,
      n_id_celula:celula_idcelula,
      n_id_fabrica:Configuracao.fabrica,
    }    
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
    if(idunidade!=""){
      const endpoint=`${Configuracao.servidor}editarunidade/${idunidade}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdunidade(res[0].n_id_unidade)
          setNome(res[0].s_nome_unidade)
          setAtivo(res[0].n_ativo_unidade)
          setIdCelula(res[0].n_id_celula)
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
          <BotaoVoltar txt="Unidades" caminho="/unidade/unidade"/>
          <BotaoVoltar txt="Lista Unidades" caminho="/unidade/listaUnidades"/>
        </div>
        <h1>Editar Unidade</h1>

        <PesquisarUnidade id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Unidade</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idunidade} onChange={e=>setIdunidade(e.target.value)}></input>
          </div>          
          <div className='campoForm'>
            <label>Nome Unidade</label>
            <input type="text" id="nomeCelula" value={nome_unidade} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Ativa</label>
            <select id="ativaCelula" value={ativo} onChange={(e)=>setAtivo(e.target.value)}>
            <option value="-1"></option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>  
          <div className='campoForm'>
            <label>Célula</label>
            <select id="unidadeCelula" value={celula_idcelula} onChange={(e)=>setIdCelula(e.target.value)}>
              {celulaOptions}
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