import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import EtapasAdicionadas from '@/components/Item/EtapasAdicionadas';
import MateriasPrimasAdicionadas from '@/components/Item/MateriasPrimasAdicionadas';
import LinhaListaEtapa from '@/components/ListaItensSimples/LinhaListaEtapa';
import AddMateriaPrima from '@/components/Item/AddMateriaPrima';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

let dadosLinhaItem:any[]=[]
let idadosLinhaItem:number=0;

let dadosLinhaMp:any[]=[]
let idadosLinhaMp:number=0;

export default function PaginaNovoItem(){
  const [linhasEtapas,setLinhasEtapas]=useState<any[]>([])
  const [nome_item,setNomeItem]=useState<string>("")
  const [desc_item,setDescItem]=useState<string>("")
  const [programaOptions,setProgramaOptions]=useState<any>(null)
  const [programa_idPrograma,setIdPrograma]=useState<string>("-1")
  const [unidadeOptions,setUnidadeOptions]=useState<any>(null)
  const [fabricaOptions,setFabricaOptions]=useState<any>(null)
  const [unidade_idUnidade,setIdUnidade]=useState<string>("-1")

  const [modalAddMateriaPrima,setModalAddMateriaPrima]=useState<boolean>(false)
  const [listaMateriasPrimasAdicionadas,setListaMateriasPrimasAdicionadas]=useState<any[]>([])

  useEffect(()=>{
    carregarFabricas()
    carregarProgramas()
    carregarUnidades()
    dadosLinhaItem=[]
    idadosLinhaItem=0
    dadosLinhaMp=[]
    idadosLinhaMp=0;  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[])

  function gravarDados(){  
    const dadosEtapas:any=[]
    const dadosMp:any=[]
    const linhasEtapas:any=document.getElementById("etapas")?.childNodes
    const linhasMp:any=document.getElementById("mp")?.childNodes
    let ordem:number=0;    
    if(nome_item===""){
      alert("Digite o nome do item")
      document.getElementById("nomeItem")?.focus()
      return
    }
    if(desc_item===""){
      alert("Digite a descrição do Item")
      document.getElementById("descItem")?.focus()
      return
    }      
    if(linhasEtapas.length<=0){
      alert("É necessário adicionar ao menos uma etapa de fabricação")
      return
    }
    if(linhasMp.length<=0){
      alert("É necessário adicionar ao menos uma Matéria Prima")
      return
    }
    linhasEtapas?.forEach((e:any)=>{
      dadosEtapas.push({
        "n_id_unidade":e.dataset.idunidade,
        "n_id_programa":e.dataset.idprograma.split(" ")[0],
        "n_id_fabrica":e.dataset.idfabrica,
        "n_ordem_etapa":ordem
      })
      ordem++
    })
    let qtde_aux:boolean=true;
    linhasMp?.forEach((e:any)=>{
      if(e.childNodes[2].childNodes[0].value==""){
        qtde_aux=false;
      }
      dadosMp.push({
        "n_id_materiaprima":e.childNodes[0].innerHTML,
        "n_qtde_itemMateriaPrima":e.childNodes[2].childNodes[0].value
      })
    })
    if(!qtde_aux){
      alert("É necessário que todas as matérias primas tenham quantidade definida")
      return
    }
    const endpoint=`${Configuracao.servidor}item`
    const dados={
      s_nome_item:nome_item,
      s_desc_item:desc_item,
      dadosEtapas:dadosEtapas,
      n_id_fabrica:Configuracao.fabrica,
      dadosMp:dadosMp,
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

  function carregarProgramas(){
    const endpoint=`${Configuracao.servidor}programa/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setProgramaOptions(criarOptionsProgramas(res))
    })
  }

  function criarOptionsProgramas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_programa} data-fabrica={e.n_id_fabrica} value={e.n_id_programa}>{e.s_nome_programa}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarFabricas(){
    const endpoint=`${Configuracao.servidor}fabrica/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setFabricaOptions(criarOptionsFabricas(res))
    })
  }  

  function criarOptionsFabricas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_fabrica} value={e.n_id_fabrica}>{e.s_nome_fabrica}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }  
  
  function carregarUnidades(){
    const endpoint=`${Configuracao.servidor}unidade/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setUnidadeOptions(criarOptionsUnidades(res))
    })
  }

  function criarOptionsUnidades(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_unidade} data-fabrica={e.n_id_fabrica} value={e.n_id_unidade}>{e.s_nome_unidade}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }  

  function f_nova(){
    dadosLinhaItem=[]
    idadosLinhaItem=0; 
    dadosLinhaMp=[]
    idadosLinhaMp=0;           
    setNomeItem("")
    setDescItem("")
    setIdUnidade("")
    setIdPrograma("")
    setLinhasEtapas([])
    setListaMateriasPrimasAdicionadas([])
    document.getElementById("nomeItem")?.focus()    
  }  

  function deletarItemEtapa(linha:any){
    const l=linha.parentNode.parentNode.parentNode
    let dadosLinhaItem_aux=dadosLinhaItem.filter((e)=>{
      if(e.i!=l.dataset.id){
        return e
      }
    })
    dadosLinhaItem=dadosLinhaItem_aux
    setLinhasEtapas(criarLinhasGridEtapas(dadosLinhaItem))
  }

  function deletarItemMp(linha:HTMLElement){
    let dadosLinhaMp_aux=dadosLinhaMp.filter((e)=>{
      if(e.i!=linha.dataset.id){
        return e
      }
    })
    dadosLinhaMp=dadosLinhaMp_aux
    setListaMateriasPrimasAdicionadas(criarLinhasGridMp(dadosLinhaMp))
  }  

  function moverEtapaCima(linha:any){
    const l=linha.parentNode.parentNode.parentNode
    l.classList.remove("linhaGrid")
    l.classList.add("linhaGridCinza")
    l.classList.add("destaque")
    setTimeout(()=>{     
      const linhaMover=l
      const linhaAnte=l.previousSibling
      linhaAnte?.before(linhaMover)
      linhaAnte.classList.remove("linhaGrid")
      linhaAnte.classList.add("linhaGridCinza")
      linhaMover.classList.add("destaque")
      setTimeout(()=>{
        linhaMover.classList.remove("destaque")
        linhaMover.classList.add("linhaGridCinza")
        linhaMover.classList.remove("linhaGridCinza")
        linhaMover.classList.add("linhaGrid")
        linhaAnte.classList.add("linhaGrid")
        linhaAnte.classList.remove("linhaGridCinza")
      },1000)

    },250)
  }

  function moverEtapaBaixo(linha:any){
    const l=linha.parentNode.parentNode.parentNode
    l.classList.remove("linhaGrid")
    l.classList.add("linhaGridCinza")
    l.classList.add("destaque")
    setTimeout(()=>{
      const linhaMover=l
      const linhaProx=l.nextSibling
      linhaProx?.after(linhaMover)
      linhaProx.classList.remove("linhaGrid")
      linhaProx.classList.add("linhaGridCinza")
      linhaMover.classList.add("destaque")
      setTimeout(()=>{
        linhaMover.classList.remove("destaque")
        linhaMover.classList.add("linhaGridCinza")
        linhaMover.classList.remove("linhaGridCinza")
        linhaMover.classList.add("linhaGrid")

        linhaProx.classList.add("linhaGrid")
        linhaProx.classList.remove("linhaGridCinza")
      },1000)
      
    },250)
  }  

  function criarLinhasGridMp(r:any){
    const ld=r.map((e:any)=>{
        return (
          <div className="linhaGrid flex" key={e.n_id_materiaprima} data-id={e.n_id_materiaprima}>
            <div className="c1_materiasprimasadicionadas">{e.n_id_materiaprima}</div>
            <div className="c2_materiasprimasadicionadas">{e.s_nome_materiaprima}</div>
            <div className="c3_materiasprimasadicionadas"><input type="number" min={0} className='w-[90%]'/></div>
            <div className="c4_materiasprimasadicionadas">{e.s_desc_unidademedida}</div>
            <div className="c5_materiasprimasadicionadas flex justify-center"><Image width={0} height={0} alt='' onClick={(evt:any)=>{deletarItemMp(evt.target.parentNode.parentNode)}} className="cursor-pointer iconeOper" title="Remover Matéria Prima" src="/images/delete.svg"/></div>
          </div>
        )
    })
    return ld;
  }    

  function addEtapa(){
    if(!unidade_idUnidade){
      alert("Selecione a célula da etapa")
      return
    }
    if(!programa_idPrograma){
      alert("Selecione o programa da etapa")
      return
    }
    const selunidade:any=document.getElementById("idunidade")
    const txtunidade:any=selunidade?.options[selunidade.selectedIndex].text;
    const selprograma:any=document.getElementById("idprograma")
    const txtprograma:any=selprograma?.options[selprograma.selectedIndex].text;
    const dado={
      //"idunidade":unidade_idUnidade.split(" ")[0],
      "idunidade":unidade_idUnidade,
      "idprograma":programa_idPrograma,
      "unidade":txtunidade,
      "programa":txtprograma,
      "fabrica":Configuracao.nomefabrica,
      "idfabrica":Configuracao.fabrica,
      "i":idadosLinhaItem
    }
    idadosLinhaItem++;
    dadosLinhaItem.push(dado)
    setLinhasEtapas(criarLinhasGridEtapas(dadosLinhaItem))
  } 

  function criarLinhasGridEtapas(r:any){
    const ld=r.map((e:any)=>{
        return <LinhaListaEtapa funcaoBtn={(evt)=>deletarItemEtapa(evt)} moverEtapaCima={(evt)=>{moverEtapaCima(evt)}} moverEtapaBaixo={(evt)=>{moverEtapaBaixo(evt)}} key={e.i} dados={e}/>
    })
    return ld;
  }  

  function addMatPrima(mp:any){
    idadosLinhaMp++
    mp.i=mp.n_id_materiaprima
    dadosLinhaMp.push(mp)
    setListaMateriasPrimasAdicionadas(criarLinhasGridMp(dadosLinhaMp))
  }

  return (
    <div>
      <Topo/>
      <Transition
        show={modalAddMateriaPrima}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <AddMateriaPrima addMatPrima={addMatPrima} setModalAddMateriaPrima={setModalAddMateriaPrima} listaMateriasPrimasAdicionadas={listaMateriasPrimasAdicionadas}/>
      </Transition>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <BotaoVoltar txt="Itens" caminho="/item/item"/>
        <h1>Novo Item</h1>
        <div className='flex flex-col gap-5 w-[100%] justify-start items-center'>
          <div className='campoForm w-96'>
            <label>Nome do Item</label>
            <input type="text" id="nomeItem" value={nome_item} onChange={(e)=>setNomeItem(e.target.value)}></input>
          </div>   
          <div className='campoForm w-96'>
            <label>Descrição do Item</label>
            <textarea rows={1} id="descItem" value={desc_item} onChange={(e)=>setDescItem(e.target.value)}></textarea>
          </div>  
          <div className='flex gap-5'>
            <MateriasPrimasAdicionadas setModalAddMateriaPrima={setModalAddMateriaPrima} listaMateriasPrimas={listaMateriasPrimasAdicionadas}/>
          </div>
          <div className='flex gap-5'>
            <div className='w-[500px]'>
              <label>Etapas de Fabricação do Item</label>
              <div className='flex flex-col border gap-2 p-2'>
                <div className='campoForm'>
                  <label>Fábrica</label>
                  <input type="text" id="fabrica" value={Configuracao.nomefabrica}></input>
                </div>                 
                <div className='campoForm'>
                  <label>Unidade</label>
                  <select id="idunidade" value={unidade_idUnidade} onChange={(e)=>{setIdUnidade(e.target.value)}}>
                    {unidadeOptions}
                  </select>            
                </div>                            
                <div className='campoForm'>
                  <label>Programa</label>
                  <select id="idprograma" value={programa_idPrograma} onChange={(e)=>setIdPrograma(e.target.value)}>
                    {programaOptions}
                  </select>            
                </div>
                <button title="Clique aqui para adicionar uma nova etapa de fabricação ao item" className='btnPadrao flex self-end w-[250px] justify-center items-center' onClick={()=>addEtapa()}>Add. Etapa <Image width={0} height={0} alt='' className='iconeOper' src="../images/arrow_right_w.svg"/></button>
              </div>
            </div>
            <div className='campoForm'>
              <label>Etapas Adicionadas</label>
              <EtapasAdicionadas linhasEtapas={linhasEtapas}/>
            </div>          
          </div>            
        </div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <button title="Novo Item" className='btnPadrao' onClick={()=>f_nova()}>Novo</button>
          <button title="Gravar Item e suas etapas" className='btnPadrao' onClick={()=>gravarDados()}>Gravar</button>
        </div>

      </div>
    </div>
  );
}
