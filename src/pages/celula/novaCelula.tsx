import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
const idFabrica=Configuracao.fabrica;

export default function PaginaNovaCelula(){
  const [nome_celula,setNome]=useState<string>("")
  const [ativo,setAtivo]=useState<string>("")

  function gravarDados(){
    if(nome_celula===""){
      alert("Digite o nome da Célula")
      document.getElementById("nomeCelula")?.focus()
      return
    }
    if(ativo===""){
      alert("Selecione se a célula estará ativa ou não")
      document.getElementById("ativaCelula")?.focus()
      return
    }   
    const endpoint=`${servidor}celula`
    const dados={
      s_nome_celula:nome_celula,
      n_ativo_celula:ativo,
      n_id_fabrica:localStorage.getItem("fabrica")
    }
    console.log(dados)
    const cabecalho={
      method:"POST",
      body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
        setNome("")
        setAtivo("")
        document.getElementById("nomeCelula")?.focus()
      }
    })
  }

  function novaCelula(){
    setNome("")
    setAtivo("")
    document.getElementById("nomeCelula")?.focus()
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Célula" caminho="/celula/celula"/>
        <h1>Nova Célula</h1>
        <div className='flex flex-col gap-5 w-96'>
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
        </div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <button className='btnPadrao' onClick={()=>novaCelula()}>Nova</button>
          <button className='btnPadrao' onClick={()=>gravarDados()}>Gravar</button>
        </div>
      </div>
    </div>
  );
}
