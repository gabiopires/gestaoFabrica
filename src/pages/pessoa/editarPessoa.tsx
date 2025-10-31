import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaEditarPessoa(){

  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idpessoa,setIdpessoa]=useState<string>("")
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
    if(idEditar){
      const endpoint=`${servidor}pessoa/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setIdpessoa(res[0].n_id_pessoa)
        setNomePessoa(res[0].s_nome_pessoa)
        setEmailPessoa(res[0].s_email_pessoa)
        setTelefone1(res[0].s_telefone1_pessoa)
        setEndereco(res[0].s_endereco_pessoa)
        setTipoPessoa(res[0].n_id_tipopessoa)
        setStatusPessoa(res[0].n_status_pessoa)
        setEmpresaPessoa(res[0].s_nome_empresa)
        setFabricaPessoa(res[0].n_id_fabrica)
      })
    }
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
  
  function limparCampos(){
    setIdPesquisa("")
    setIdpessoa("")
    setNomePessoa("")
    setEmailPessoa("")
    setTelefone1("")
    setEndereco("")    
    setTipoPessoa("")
    setStatusPessoa("")
    setEmpresaPessoa("")
    setFabricaPessoa("")
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
      n_id_pessoa:idEditar,
      s_nome_pessoa:nomePessoa,
      n_status_pessoa:statusPessoa,
      n_id_tipopessoa:tipoPessoa,
      s_nome_empresa:empresaPessoa,
      s_email_pessoa:emailPessoa,
      s_telefone1_pessoa:telefone1,
      s_endereco_pessoa:endereco,
      n_id_fabrica:fabricaPessoa
    }   
    const cabecalho={
        method:"PUT",
        body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
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
    setFabricaPessoa("")
    document.getElementById("f_nomePessoa")?.focus()
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

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex gap-5 justify-around'>
          <BotaoVoltar txt="Pessoa" caminho="/pessoa/pessoa"/>
          <BotaoVoltar txt="Lista Pessoas" caminho="/pessoa/listaPessoas"/>
        </div>
        <h1>Nova Pessoa</h1>
        <div className='flex flex-col gap-5 w-96'>
        <div className='campoForm'>
            <label>ID Pessoa</label>
            <input type="text" id="f_idPessoa" readOnly value={idpessoa} onChange={(e)=>setIdpessoa(e.target.value)}></input>
          </div>             
          <div className='campoForm'>
            <label>Nome Pessoa</label>
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
