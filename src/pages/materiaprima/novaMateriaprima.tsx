import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

export default function PaginaNovoMateriaPrima(){
  const [nome_materiaprima,setNomeMateriaPrima]=useState<string>("")
  const [desc_materiaprima,setDescMateriaPrima]=useState<string>("")
  const [qtde_materiaprima,setQtdeMateriaPrima]=useState<string>("")
  const [unmedida_materiaprima,setUnMedidaMateriaprima]=useState<string>("1")

  const [descUnMed,setDescUnMed]=useState<string>("")
  const [optionsUnMed,setOptionsUnMed]=useState<any[]>([])
  const [statusMp,setStatusMp]=useState<string>("1")
  const [optionsStatusMp,setOptionsStatusMp]=useState<any[]>([])

  useEffect(()=>{
    obterUnMed()
    obterStatusMp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function gravarDados(){
    if(nome_materiaprima===""){
      alert("Digite o nome da Matéria Prima")
      document.getElementById("nomeMateriaPrima")?.focus()
      return
    }
    if(desc_materiaprima===""){
      alert("Digite a descrição da Matéria Prima")
      document.getElementById("descMateriaPrima")?.focus()
      return
    }
    if(unmedida_materiaprima===""){
      alert("Selecione a unidade de medida da matéria prima")
      document.getElementById("descMateriaPrima")?.focus()
      return
    }    
    if(qtde_materiaprima===""){
      alert("Digite a quantidade inicial da Matéria Prima")
      document.getElementById("qtdeMateriaPrima")?.focus()
      return
    }    
    const endpoint=`${Configuracao.servidor}materiaprima`
    const dados={
      s_nome_materiaprima:nome_materiaprima,
      s_desc_materiaprima:desc_materiaprima,
      n_id_unidademedida:unmedida_materiaprima,
      n_qtde_materiaprima:qtde_materiaprima,
      n_status_materiaprima:statusMp,
      n_id_fabrica:Configuracao.fabrica
    }   
    const cabecalho={
        method:"POST",
        body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Novos dados gravados com sucesso!")
        setNomeMateriaPrima("")
        setDescMateriaPrima("")
        setUnMedidaMateriaprima("1")
        setStatusMp("1")
        setQtdeMateriaPrima("")        
        document.getElementById("nome_materiaprima")?.focus()
      }
    })
  }

  function f_nova(){
    setNomeMateriaPrima("")
    setDescMateriaPrima("")
    setUnMedidaMateriaprima("1")
    setStatusMp("1")
    setQtdeMateriaPrima("")
    document.getElementById("nome_materiaprima")?.focus()
  }  

  function obterUnMed(){
    const endpoint=`${Configuracao.servidor}todosunmed`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsUnMed(
        res.map((e:any)=>{
          return (
            <option value={e.n_id_unidademedida} key={e.n_id_unidademedida}>{e.s_desc_unidademedida}</option>
          )
        })
      )
    })
  } 

  function obterStatusMp(){
    const endpoint=`${Configuracao.servidor}todosstatusmp`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsStatusMp(
        res.map((e:any)=>{
          return (
            <option value={e.n_id_statusmateriaprima} key={e.n_id_statusmateriaprima}>{e.s_desc_statusmateriaprima}</option>
          )
        })
      )
    })
  } 

  return (
    <div>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Matéria Prima" caminho="/materiaprima/materiaprima"/>
        <h1>Nova Matéria Prima</h1>
        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>Nome da Matéria Prima</label>
            <input type="text" id="nomeMateriaPrima" value={nome_materiaprima} onChange={(e)=>setNomeMateriaPrima(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Descrição da Matéria Prima</label>
            <input type="text" id="descMateriaPrima" value={desc_materiaprima} onChange={(e)=>setDescMateriaPrima(e.target.value)}></input>
          </div>   
          <div className='campoForm'>
            <label>Status</label>
            <select id="unidadeMateriaPrima" value={statusMp} onChange={(e)=>setStatusMp(e.target.value)}>
              {optionsStatusMp?optionsStatusMp:""}
            </select>   
          </div>         
          <div className='campoForm'>
            <label>Unidade de medida</label>
            <select id="unidadeMateriaPrima" value={unmedida_materiaprima} onChange={(e)=>setUnMedidaMateriaprima(e.target.value)}>
              {optionsUnMed?optionsUnMed:""}
            </select>            
          </div>           
          <div className='campoForm'>
            <label>Quantidade</label>
            <input type="number" id="qtdeMateriaPrima" value={qtde_materiaprima} onChange={(e)=>setQtdeMateriaPrima(e.target.value)}></input>
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
