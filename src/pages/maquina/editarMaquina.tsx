import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarCelula from '@/components/Celula/PesquisarCelula';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
const idFabrica=Configuracao.fabrica;

export default function PaginaEditarMaquina(){

  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idmaquina,setIdmaquina]=useState<string>("")
  const [nome_maquina,setNome]=useState<string>("")
  const [codigo_maquina,setCodigo]=useState<string>("")
  const [ativo,setAtivo]=useState<string>("-1")
  const [status,setStatus]=useState<string>("-1")
  const [unidade_idunidade,setIdUnidade]=useState<string>("-1")
  const [unidadeOptions,setUnidadeOptions]=useState<any>(null)
  const [statusOptions,setStatusOptions]=useState<any>(null)

  useEffect(()=>{
    carregarUnidades()
    carregarStatus()
    if(idEditar){
      const endpoint=`${servidor}editarmaquina/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdmaquina(res[0].n_id_maquina)
        setNome(res[0].s_nome_maquina)
        setCodigo(res[0].s_codigo_maquina)
        setAtivo(res[0].n_ativo_maquina)
        setStatus(res[0].n_status_maquina)
        setIdUnidade(res[0].n_id_unidade)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function carregarStatus(){
    const endpoint=`${servidor}todosstatusmaquina/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setStatusOptions(criarOptionsStatus(res))
    })    
  }
  
  function criarOptionsStatus(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_statusmaquina} value={e.n_id_statusmaquina}>{e.s_desc_statusmaquina}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarUnidades(){
    const endpoint=`${servidor}unidade/${idFabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setUnidadeOptions(criarOpstionUnidades(res))
    })
  }

  function criarOpstionUnidades(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_unidade} value={e.n_id_unidade}>{e.s_nome_unidade}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }
  
  function limparCampos(){
    setIdPesquisa("")
    setIdmaquina("")
    setNome("")
    setCodigo("")
    setAtivo("")
    setStatus("")
    setIdUnidade("")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID da Célula que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${servidor}maquina/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdmaquina(res[0].n_id_maquina)
        setNome(res[0].s_nome_maquina)
        setCodigo(res[0].s_codigo_maquina)
        setAtivo(res[0].n_ativo_maquina)
        setIdUnidade(res[0].n_id_unidade)
        setStatus(res[0].n_status_unidade)
        setIdPesquisa("")
      }else{
        alert(`Nenhuma máquina encontrada com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_maquina===""){
      alert("Digite o nome da máquina")
      return
    }
    if(codigo_maquina===""){
      alert("Digite o código identificador da máquina")
      return
    }    
    if(ativo==="-1"){
      alert("Selecione se a máquina estará ativa ou não")
      return
    }
    if(status==="-1"){
      alert("Selecione o status inicial da máquina")
      return
    }    
    if(unidade_idunidade===""){
      alert("Selecione a unidade da máquina")
      return
    }
    const endpoint=`${servidor}maquina`
    const dados={
      n_id_maquina:idmaquina,
      s_nome_maquina:nome_maquina,
      s_codigo_maquina:codigo_maquina,
      n_ativo_maquina:ativo,
      n_id_unidade:unidade_idunidade,
      n_status_unidade:status,
      n_id_fabrica:idFabrica,
    }    
    const cabecalho={
      method:"PUT",
      body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados alterados com sucesso!")
      }
    })       
  }

  function cancelar(){
    if(idmaquina!=""){
      const endpoint=`${servidor}maquina/${idmaquina}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdmaquina(res[0].n_id_maquina)
          setNome(res[0].s_nome_maquina)
          setCodigo(res[0].s_codigo_maquina)
          setAtivo(res[0].n_ativo_maquina)
          setIdUnidade(res[0].n_id_unidade)
          setStatus(res[0].n_status_unidade)
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
          <BotaoVoltar txt="Máquinas" caminho="/maquina/maquina"/>
          <BotaoVoltar txt="Lista Máquinas" caminho="/maquina/listaMaquinas"/>
        </div> 
        <h1>Editar Máquina</h1>

        <PesquisarCelula id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
        <div className='campoForm'>
            <label>ID Máquina</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idmaquina} onChange={e=>setIdmaquina(e.target.value)}></input>
          </div>           
          <div className='campoForm'>
            <label>Nome Máquina</label>
            <input type="text" id="nomeMaquina" value={nome_maquina} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Código Identificador Máquina</label>
            <input type="text" id="codMaquina" value={codigo_maquina} onChange={(e)=>setCodigo(e.target.value)}></input>
          </div>          
          <div className='campoForm'>
            <label>Ativa</label>
            <select id="ativaMaquina" value={ativo} onChange={(e)=>setAtivo(e.target.value)}>
            <option value="-1"></option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>  
          <div className='campoForm'>
            <label>Unidade</label>
            <select id="unidadeMaquina" value={unidade_idunidade} onChange={(e)=>setIdUnidade(e.target.value)}>
              {unidadeOptions}
            </select>            
          </div> 
          <div className='campoForm'>
            <label>Status</label>
            <select id="ativaMaquina" value={status} onChange={(e)=>setStatus(e.target.value)}>
              {statusOptions?statusOptions:""}
            </select>
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
