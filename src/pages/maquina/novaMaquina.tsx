import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaNovaMaquina(){
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function carregarUnidades(){
    const endpoint=`${Configuracao.servidor}unidade/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        setUnidadeOptions(criarOptionsUnidades(res))
    })
  }

  function carregarStatus(){
    const endpoint=`${Configuracao.servidor}todosstatusmaquina/`
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

  function criarOptionsUnidades(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_unidade} value={e.n_id_unidade}>{e.s_nome_unidade}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function gravarDados(){
    if(nome_maquina===""){
      alert("Digite o nome da Máquina")
      document.getElementById("nomeMaquina")?.focus()
      return
    }
    if(ativo==="-1"){
      alert("Selecione se a máquina estará ativa ou não")
      document.getElementById("ativaMaquina")?.focus()
      return
    }
    if(unidade_idunidade===""){
      alert("Selecione a unidade a qual está unidade irá pertencer")
      document.getElementById("unidadeMaquina")?.focus()
      return
    }     
    const endpoint=`${Configuracao.servidor}maquina`
    const dados={
      s_nome_maquina:nome_maquina,
      n_ativo_maquina:ativo,
      n_id_unidade:unidade_idunidade,
      s_codigo_maquina:codigo_maquina,
      n_status_maquina:status,
      n_id_fabrica:Configuracao.fabrica,
    }   
    const cabecalho={
        method:"POST",
        body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
        setNome("")
        setCodigo("")
        setAtivo("-1")
        setIdUnidade("-1")
        setStatus("-1")
        document.getElementById("nomeMaquina")?.focus()
      }
    })
  }

  function f_nova(){
    setNome("")
    setAtivo("")
    setIdUnidade("")
    document.getElementById("nomeMaquina")?.focus()
  }  
 
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Máquinas" caminho="/maquina/maquina"/>
        <h1>Nova Máquina</h1>
        <div className='flex flex-col gap-5 w-96'>
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
              {unidadeOptions?unidadeOptions:""}
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
          <button className='btnPadrao' onClick={()=>f_nova()}>Nova</button>
          <button className='btnPadrao' onClick={()=>gravarDados()}>Gravar</button>
        </div>
      </div>
    </div>
  );
}
