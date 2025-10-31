import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaNovaFabrica(){
  const [nome,setNome]=useState<string>("")
  const [cidade,setCidade]=useState<string>("")
  const [telefone,setTelefone]=useState<string>("")
  const [email,setEmail]=useState<string>("")

  function gravarDados(){
    if(nome===""){
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
    const endpoint=`${servidor}fabrica`
    const dados={
      s_nome_fabrica:nome,
      s_cidade_fabrica:cidade,
      s_tel_resp_fabrica:telefone,
      s_email_fabrica:email
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
        setCidade("")
        setTelefone("")
        setEmail("")
        document.getElementById("nomeFabrica")?.focus()
      }
    })
  }

  function novaFabrica(){
    setNome("")
    setCidade("")
    setTelefone("")
    setEmail("")
    document.getElementById("nomeFabrica")?.focus()
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Fábrica" caminho="/fabrica/fabrica"/>
        <h1>Nova Fábrica</h1>
        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>Nome Fábrica</label>
            <input type="text" id="nomeFabrica" value={nome} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Cidade</label>
            <input type="text" value={cidade} onChange={(e)=>setCidade(e.target.value)}></input>
          </div>  
          <div className='campoForm'>
            <label>Telefone</label>
            <input type="text" value={telefone} onChange={(e)=>setTelefone(e.target.value)}></input>
          </div>   
          <div className='campoForm'>
            <label>E-Mail</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          </div>                           
        </div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <button className='btnPadrao' onClick={()=>novaFabrica()}>Nova</button>
          <button className='btnPadrao' onClick={()=>gravarDados()}>Gravar</button>
        </div>
      </div>
    </div>
  );
}
