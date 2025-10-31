import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarFabrica from '@/components/Fabrica/PesquisarFabrica';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaEditarFabrica(){
  const router = useRouter();
  const pidFabrica = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idfabrica,setIdfabrica]=useState<string>("");
  const [nome_fabrica,setNome_fabrica]=useState<string>("");
  const [cidade,setCidade]=useState<string>("");
  const [telefone,setTelefone]=useState<string>("");
  const [email,setEmail]=useState<string>("");

  useEffect(()=>{
    if(pidFabrica){
      const endpoint=`${Configuracao.servidor}fabrica/${pidFabrica}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdfabrica(res[0].n_id_fabrica)
        setNome_fabrica(res[0].s_nome_fabrica)
        setCidade(res[0].s_cidade_fabrica)
        setTelefone(res[0].s_tel_resp_fabrica)
        setEmail(res[0].s_email_fabrica)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  function limparCampos(){
    setIdPesquisa("")
    setIdfabrica("")
    setNome_fabrica("")
    setCidade("")
    setTelefone("")
    setEmail("")  
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID da fábrica que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${Configuracao.servidor}fabrica/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdfabrica(res[0].n_id_fabrica)
        setNome_fabrica(res[0].s_nome_fabrica)
        setCidade(res[0].s_cidade_fabrica)
        setTelefone(res[0].s_tel_resp_fabrica)
        setEmail(res[0].s_email_fabrica)
        setIdPesquisa("")
      }else{
        alert(`Nenhuma fábrica encontrada com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_fabrica===""){
      alert("Digite o nome da fábrica")
      return
    }
    if(cidade===""){
      alert("Digite a cidade da fábrica")
      return
    }
    if(telefone===""){
      alert("Digite o telefone da fábrica")
      return
    }
    if(email===""){
      alert("Digite o E-Mail da fábrica")
      return
    }
    const endpoint=`${Configuracao.servidor}fabrica`
    const dados={
      n_id_fabrica:idfabrica,
      s_nome_fabrica:nome_fabrica,
      s_cidade_fabrica:cidade,
      s_tel_resp_fabrica:telefone,
      s_email_fabrica:email
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
    if(idfabrica!=""){
      const endpoint=`${Configuracao.servidor}fabrica/${idfabrica}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdfabrica(res[0].n_id_fabrica)
          setNome_fabrica(res[0].s_nome_fabrica)
          setCidade(res[0].s_cidade_fabrica)
          setTelefone(res[0].s_tel_resp_fabrica)
          setEmail(res[0].s_email_fabrica)
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
          <BotaoVoltar txt="Fábrica" caminho="/fabrica/fabrica"/>
          <BotaoVoltar txt="Lista Fábricas" caminho="/fabrica/listaFabricas"/>
        </div>
        <h1>Editar Fábrica</h1>

        <PesquisarFabrica id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>         
          <div className='campoForm'>
            <label>ID Fábrica</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idfabrica} onChange={e=>setIdfabrica(e.target.value)}></input>
          </div>          
          <div className='campoForm'>
            <label>Nome Fábrica</label>
            <input type="text" value={nome_fabrica} onChange={e=>setNome_fabrica(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Cidade</label>
            <input type="text" value={cidade} onChange={e=>setCidade(e.target.value)}></input>
          </div>  
          <div className='campoForm'>
            <label>Telefone</label>
            <input type="text" value={telefone} onChange={e=>setTelefone(e.target.value)}></input>
          </div>   
          <div className='campoForm'>
            <label>E-Mail</label>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)}></input>
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
