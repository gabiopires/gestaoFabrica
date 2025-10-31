import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
const idFabrica=Configuracao.fabrica;

export default function PaginaNovaPessoa(){
  const [nomePessoa,setNomePessoa]=useState<string>("")
  const [emailPessoa,setEmailPessoa]=useState<string>("")
  const [telefone1,setTelefone1]=useState<string>("")
  const [endereco,setEndereco]=useState<string>("")
  const [tipoPessoa,setTipoPessoa]=useState<string>("")
  const [optionsTipoPessoa,setOptionsTipoPessoa]=useState<any[]>([])
  const [statusPessoa,setStatusPessoa]=useState<string>("")
  const [optionsStatusPessoa,setOptionsStatusPessoa]=useState<any[]>([])
  const [empresaPessoa,setEmpresaPessoa]=useState<string>("")
  const [optionsEmpresaPessoa,setOptionsEmpreesPessoa]=useState<any[]>([])
  const [fabricaPessoa,setFabricaPessoa]=useState<string>("")
  const [optionsFabricaPessoa,setOptionsFabricaPessoa]=useState<any[]>([])


  useEffect(()=>{
    carregarStatus()
    carregarTipos()
    carregarEmpresas()
    buscarFabricas()
    setFabricaPessoa(idFabrica)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function carregarStatus(){
    const endpoint=`${servidor}todosstatuspessoa/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusPessoa(criarOptionsStatus(res))
    })    
  }
  function criarOptionsStatus(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_statuspessoa} value={e.n_id_statuspessoa}>{e.s_desc_statuspessoa}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarTipos(){
    const endpoint=`${servidor}todostipospessoa/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsTipoPessoa(criarOptionsTipos(res))
    })    
  }
  function criarOptionsTipos(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_tipopessoa} value={e.n_id_tipopessoa}>{e.s_desc_tipopessoa}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarEmpresas(){
    const endpoint=`${servidor}todosstatusmaquina/`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsEmpreesPessoa(criarOptionsEmpresas(res))
    })    
  }
  function criarOptionsEmpresas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_statusmaquina} value={e.n_id_statusmaquina}>{e.s_desc_statusmaquina}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }  

  function buscarFabricas(){
    const endpoint=`${servidor}fabrica`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsFabricaPessoa(
        res.map((f:any)=>{
          return <option value={f.n_id_fabrica} key={f.n_id_fabrica}>{f.s_nome_fabrica}</option>
        })
      )
    })
  }  

  function gravarDados(){
    if(nomePessoa===""){
      alert("Digite o nome da Pessoa")
      document.getElementById("f_nomePessoa")?.focus()
      return
    }
    if(statusPessoa===""){
      alert("Selecione o status da pessoa")
      document.getElementById("f_statusPessoa")?.focus()
      return
    }  
    const endpoint=`${servidor}pessoa`
    const dados={
      s_nome_pessoa:nomePessoa,
      n_status_pessoa:statusPessoa,
      n_id_tipopessoa:tipoPessoa,
      s_nome_empresa:empresaPessoa,
      s_email_pessoa:emailPessoa,
      s_telefone1_pessoa:telefone1,
      s_endereco_pessoa:endereco,
      n_id_fabrica:idFabrica
    }   
    const cabecalho={
        method:"POST",
        body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
        f_nova()
      }
    })
  }

  function f_nova(){
    setNomePessoa("")
    setTipoPessoa("")
    setStatusPessoa("")
    setEmpresaPessoa("")
    setEmailPessoa("")
    setTelefone1("")
    setEndereco("")     
    document.getElementById("f_nomePessoa")?.focus()
  }  
 
  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Pessoa" caminho="/pessoa/pessoa"/>
        <h1>Nova</h1>
        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>Nome</label>
            <input type="text" id="f_nomePessoa" value={nomePessoa} onChange={(e)=>setNomePessoa(e.target.value)}></input>
          </div> 
          <div className='campoForm'>
            <label>Email</label>
            <input type="email" id="f_emailPessoa" value={emailPessoa} onChange={(e)=>setEmailPessoa(e.target.value)}></input>
          </div>    
          <div className='campoForm'>
            <label>Telefone 1</label>
            <input type="tel" id="f_telefone1Pessoa" value={telefone1} onChange={(e)=>setTelefone1(e.target.value)}></input>
          </div>    
          <div className='campoForm'>
            <label>Endereço</label>
            <input type="tel" id="f_endrecoPessoa" value={endereco} onChange={(e)=>setEndereco(e.target.value)}></input>
          </div>                               
          <div className='campoForm'>
            <label>Tipo Pessoa</label>
            <select id="f_tipoPessoa" value={tipoPessoa} onChange={(e)=>setTipoPessoa(e.target.value)}>
              {optionsTipoPessoa?optionsTipoPessoa:""}
            </select>            
          </div>                 
          <div className='campoForm'>
            <label>Status</label>
            <select id="f_statusPessoa" value={statusPessoa} onChange={(e)=>setStatusPessoa(e.target.value)}>
              {optionsStatusPessoa?optionsStatusPessoa:""}
            </select>            
          </div>  
          <div className='campoForm'>
            <label>Empresa Pessoa</label>
            <input type="text" id="f_empresaPessoa" value={empresaPessoa} onChange={(e)=>setEmpresaPessoa(e.target.value)}></input>
          </div> 
          <div className='campoForm'>
            <label>Fábrica Senai</label>
            <select id="f_fabricaPessoa" value={fabricaPessoa} onChange={(e)=>setFabricaPessoa(e.target.value)}>
              {optionsFabricaPessoa?optionsFabricaPessoa:""}
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
