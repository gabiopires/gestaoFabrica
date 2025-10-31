import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaNovoPedido(){
  const [nome_programa,setNome]=useState<string>("")
  const [codigo_programa,setCodigo]=useState<string>("")

  function gravarDados(){
    if(nome_programa===""){
      alert("Digite o nome do programa")
      document.getElementById("nomePrograma")?.focus()
      return
    }
    if(codigo_programa===""){
      alert("Digite o Código Indentificador do Programa")
      document.getElementById("codPrograma")?.focus()
      return
    }
    const endpoint=`${servidor}programa`
    const dados={
      nome_programa:nome_programa,
      codigo_programa:codigo_programa
    }   
    const cabecalho={
        method:"POST",
        body:JSON.stringify(dados)
    }
    console.log(dados)
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
        setNome("")
        setCodigo("")
        document.getElementById("nomePrograma")?.focus()
      }
    })
  }

  function f_nova(){
    setNome("")
    setCodigo("")
    document.getElementById("nomePrograma")?.focus()
  }  

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Programas" caminho="/programa/programa"/>
        <h1>Novo Programa</h1>
        <div className='flex flex-col gap-5 w-96'>
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
          <button className='btnPadrao' onClick={()=>f_nova()}>Novo</button>
          <button className='btnPadrao' onClick={()=>gravarDados()}>Gravar</button>
        </div>
      </div>

    </div>
  );
}
