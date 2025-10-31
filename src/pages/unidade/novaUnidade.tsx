import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function PaginaNovaUnidade(){
  const [nome_unidade,setNome]=useState<string>("")
  const [ativo,setAtivo]=useState<string>("")
  const [celula_idcelula,setIdCelula]=useState<string>("")
  const [celulaOptions,setCelulaOptions]=useState<any>(null)

  useEffect(()=>{
    carregarCelulas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function carregarCelulas(){
    const endpoint=`${servidor}celula/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        setCelulaOptions(criarOpstionCelulas(res))
    })
  }

  function criarOpstionCelulas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_celula} value={e.n_id_celula}>{e.s_nome_celula}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function gravarDados(){
    if(nome_unidade===""){
      alert("Digite o nome da Unidade")
      document.getElementById("nomeUnidade")?.focus()
      return
    }
    if(ativo==="-1"){
      alert("Selecione se a unidade estará ativa ou não")
      document.getElementById("ativaUnidade")?.focus()
      return
    }
    if(celula_idcelula===""){
      alert("Selecione a Célula a qual está unidade irá pertencer")
      document.getElementById("celulaUnidade")?.focus()
      return
    }     
    const endpoint=`${servidor}unidade`
    const dados={
      s_nome_unidade:nome_unidade,
      n_ativo_unidade:ativo,
      n_id_celula:celula_idcelula,
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
        setAtivo("")
        setIdCelula("")
        document.getElementById("nomeUnidade")?.focus()
      }
    })
  }

  function f_nova(){
    setNome("")
    setAtivo("")
    setIdCelula("")
    document.getElementById("nomeUnidade")?.focus()
  }

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Unidades" caminho="/unidade/unidade"/>
        <h1>Nova Unidade</h1>
        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>Nome Unidade</label>
            <input type="text" id="nomeUnidade" value={nome_unidade} onChange={(e)=>setNome(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Ativa</label>
            <select id="ativaUnidade" value={ativo} onChange={(e)=>setAtivo(e.target.value)}>
            <option value="-1"></option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>  
          <div className='campoForm'>
            <label>Célula</label>
            <select id="celulaUnidade" value={celula_idcelula} onChange={(e)=>setIdCelula(e.target.value)}>
              {celulaOptions}
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
