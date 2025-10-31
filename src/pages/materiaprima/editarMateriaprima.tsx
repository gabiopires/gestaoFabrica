import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarMateriaprima from '@/components/MateriaPrima/PesquisarMateriaprima';
import AddRem from '@/components/MateriaPrima/AddRem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
const idFabrica=Configuracao.fabrica;

export default function PaginaEditarMateriaPrima(){
  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idmateriaprima,setIdmateriaprima]=useState<string>("")
  const [nome_materiaprima,setNomeMateriaPrima]=useState<string>("")
  const [desc_materiaprima,setDescMateriaPrima]=useState<string>("")
  const [qtde_materiaprima,setQtdeMateriaPrima]=useState<string>("")
  const [unmedida_materiaprima,setUnMedidaMateriaprima]=useState<string>("")
  const [optionsUnMed_mp,setOptionsUnMed_mp]=useState<any[]>([])
  const [stateMostrarAddRem,setMostrarAddRem]=useState<boolean>(false);
  const [opAddRem,setOpAddRem]=useState<number>(1);
  const [statusMp,setStatusMp]=useState<string>("1")
  const [optionsStatusMp,setOptionsStatusMp]=useState<any[]>([])  

  useEffect(()=>{
    obterUnMed()
    obterStatusMp()
    if(idEditar){
      const endpoint=`${servidor}editarmateriaprima/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdmateriaprima(res[0].n_id_materiaprima)
        setNomeMateriaPrima(res[0].s_nome_materiaprima)
        setDescMateriaPrima(res[0].s_desc_materiaprima)
        setQtdeMateriaPrima(res[0].n_qtde_materiaprima)
        setUnMedidaMateriaprima(res[0].n_id_unidademedida)
        setStatusMp(res[0].n_status_materiaprima)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function obterUnMed(){
    const endpoint=`${servidor}todosunmed`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setOptionsUnMed_mp(
        res.map((e:any)=>{
          return (
            <option value={e.n_id_unidademedida} key={e.n_id_unidademedida}>{e.s_desc_unidademedida}</option>
          )
        })
      )
    })
  } 
 
  function obterStatusMp(){
    const endpoint=`${servidor}todosstatusmp`
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

  function limparCampos(){
    setIdPesquisa("")
    setIdmateriaprima("")
    setNomeMateriaPrima("")
    setDescMateriaPrima("")
    setQtdeMateriaPrima("")
    setUnMedidaMateriaprima("1")
    setStatusMp("1")
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID da Matéria Prima que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${servidor}editarmateriaprima/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdmateriaprima(res[0].n_id_materiaprima)
        setNomeMateriaPrima(res[0].s_nome_materiaprima)
        setDescMateriaPrima(res[0].s_desc_materiaprima)
        setQtdeMateriaPrima(res[0].n_qtde_materiaprima)
        setUnMedidaMateriaprima(res[0].n_id_unidademedida)   
        setStatusMp(res[0].n_status_materiaprima)     
        setIdPesquisa("")
      }else{
        alert(`Nenhuma Matéria Prima encontrada com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_materiaprima===""){
      alert("Digite o nome da matéria prima")
      return
    }
    if(desc_materiaprima===""){
      alert("Digite a descrição da matéria prima")
      return
    }    
    const endpoint=`${servidor}materiaprima`
    const dados={
      n_id_materiaprima:idmateriaprima,
      s_nome_materiaprima:nome_materiaprima,
      s_desc_materiaprima:desc_materiaprima,
      n_id_unidademedida:unmedida_materiaprima,
      n_qtde_materiaprima:qtde_materiaprima,
      n_status_materiaprima:statusMp,
      n_id_fabrica:idFabrica
    }    
    const cabecalho={
      method:"PUT",
      body:JSON.stringify(dados)
    }
    fetch(endpoint,cabecalho)
    .then(res=>{
      if(res.status==200){
        alert("Dados alterados com sucesso!")
      }
    })       
  }

  function cancelar(){
    if(idmateriaprima!=""){
      const endpoint=`${servidor}materiaprima/${idmateriaprima}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdmateriaprima(res[0].n_id_materiaprima)
          setNomeMateriaPrima(res[0].s_nome_materiaprima)
          setDescMateriaPrima(res[0].s_desc_materiaprima)
          setQtdeMateriaPrima(res[0].n_qtde_materiaprima)
          setUnMedidaMateriaprima(res[0].s_unidademedida_materiaprima)      
          setStatusMp(res[0].n_status_materiaprima)      
          setIdPesquisa("")
        }
      })
    }
  }

  function mostrarAddRem(o:number){
    setOpAddRem(o)
    setMostrarAddRem(true);
  }

  return (
    <div>
      <AddRem op={opAddRem} stateCampo={qtde_materiaprima} setStateCampo={setQtdeMateriaPrima} stateMostrar={stateMostrarAddRem} setStateMostrar={setMostrarAddRem}/>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex gap-5 justify-around'>  
          <BotaoVoltar txt="Matéria Prima" caminho="/materiaprima/materiaprima"/>
          <BotaoVoltar txt="Lista Matéria Prima" caminho="/materiaprima/listaMateriasprimas"/>
        </div>
        <h1>Editar Matéria Prima</h1>
        
        <PesquisarMateriaprima id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>

        <div className='flex flex-col gap-5 w-96'>
          <div className='campoForm'>
            <label>ID Matéria Prima</label>
            <input type="text" readOnly className='cursor-not-allowed' value={idmateriaprima} onChange={e=>setIdmateriaprima(e.target.value)}></input>
          </div>           
          <div className='campoForm'>
            <label>Nome da Matéria Prima</label>
            <input type="text" id="nomeMateriaPrima" value={nome_materiaprima} onChange={(e)=>setNomeMateriaPrima(e.target.value)}></input>
          </div>
          <div className='campoForm'>
            <label>Status</label>
            <select id="unidadeMateriaPrima" value={statusMp} onChange={(e)=>setStatusMp(e.target.value)}>
              {optionsStatusMp?optionsStatusMp:""}
            </select>   
          </div>           
          <div className='campoForm'>
            <label>Descrição da Matéria Prima</label>
            <input type="text" id="descMateriaPrima" value={desc_materiaprima} onChange={(e)=>setDescMateriaPrima(e.target.value)}></input>
          </div>   
          <div className='campoForm'>
            <label>Unidade de medida</label>
            <select id="unidadeMateriaPrima" value={unmedida_materiaprima} onChange={(e)=>setUnMedidaMateriaprima(e.target.value)}>
              {optionsUnMed_mp?optionsUnMed_mp:""}
            </select>            
          </div>           
          <div className='campoForm'>
            <label>Quantidade</label>
            <div className='flex gap-2'>
              <input readOnly type="number" id="qtdeMateriaPrima" value={qtde_materiaprima} className='cursor-not-allowed' onChange={(e)=>setQtdeMateriaPrima(e.target.value)}></input>
              <button className='btnPadrao' onClick={()=>mostrarAddRem(1)}>+</button>
              <button className='btnPadrao' onClick={()=>mostrarAddRem(-1)}>-</button>
            </div>
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

