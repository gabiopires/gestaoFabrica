import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import ListaItensAddNovoProd from './listaItensAddNovoProd';
import LinhaListaItens from '@/components/Produto/LinhaListaItens';
import { useState, useEffect } from 'react';
import AddItens from '@/components/Produto/AddItens';
import ListaProdutosExistentes from '@/components/Produto/ListaProdutosExistentes';
import { Transition } from '@headlessui/react'
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';

let dadosLinha:any[]=[]

export default function PaginaNovoProduto(){
  const [mostrarAddItens,setMostrarAddItens]=useState<boolean>(false)
  const [mostrarListaProdutosExistentes,setMostrarListaProdutosExistentes]=useState<boolean>(false)
  const [nome_produto,setNome]=useState<string>("")
  const [desc_produto,setDesc]=useState<string>("")
  const [valor_produto,setValor]=useState<string>("")
  const [person_produto,setPersonalizavel]=useState<string>("1")
  const [listaItensAdd,setListaItensAdd]=useState<any[]>([])
  const [statusProduto,setStatusProduto]=useState<string>('1')
  const [listaStatus,setListaStatus]=useState<any[]>([])
  const [imagem1,setImagem1]=useState<any>("")
  const [imagem2,setImagem2]=useState<any>("")
  const [imagem3,setImagem3]=useState<any>("")
  
  useEffect(()=>{
    setListaItensAdd(criarLinhasGrid(dadosLinha))
    criarOptionsStatus()
    dadosLinha=[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function gravarDados(){
    console.log("gravarDados()")
    if(nome_produto===""){
      alert("Digite o nome do produto")
      document.getElementById("nomePrograma")?.focus()
      return
    }
    if(dadosLinha.length<=0){
      alert("É necessário inserir pelo menos um item ao produto")
      return
    }
    const endpoint=`${Configuracao.servidor}produto`
    const val=valor_produto.replace(",",".")
    const dados={
      s_nome_produto:nome_produto,
      itensProduto:dadosLinha,
      n_status_produto:statusProduto,
      s_imagem1_produto:imagem1,
      s_imagem2_produto:imagem2,
      s_imagem3_produto:imagem3,
      s_desc_produto:desc_produto,
      f_valor_produto:val,
      n_personalizavel_produto:person_produto,
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
        setNome("")
        setListaItensAdd([])
        dadosLinha=[]
        document.getElementById("nomeProduto")?.focus()
      }
    })
  }

  function f_nova(){
    setNome("")
    document.getElementById("nomeProduto")?.focus()
  }  

  function deletarItem(evt:any){
    const res=confirm("O item será removido do produto!")
    if(res){
      const l=evt.target.parentNode.parentNode.parentNode
      l.remove()
    }
  }

  function criarLinhasGrid(r:any){
    const ld=r.map((e:any)=>{
      return <LinhaListaItens tipobtn="del" funcaoBtn={deletarItem} key={e.n_id_item} dados={{...e}}/>
    })
    return ld;
  }

  function criarOptionsStatus(){
    const endpoint=`${Configuracao.servidor}todosstatusproduto`
    const opt:any[]=[]
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      res.forEach((p:any)=>{
        opt.push(
          <option value={p.n_id_statusproduto}>{p.s_desc_statusproduto}</option>
        )
      })
      setListaStatus(opt);
    })
  }  

  function addItem(dados:any){
    dadosLinha.push(dados)
    setListaItensAdd(criarLinhasGrid(dadosLinha))
  }

  function converterParaBase64(arquivo:any){
    return new Promise((resolve,reject)=>{
      const leitor=new FileReader()
      leitor.readAsDataURL(arquivo)
      leitor.onload=()=>{
        resolve(leitor.result)
      }
      leitor.onerror=(error)=>{
        reject(error)
      }
    })
  }

  async function manipularImagem1(evt:any){
    const arquivo=evt.target.files[0]
    if(arquivo){
      const base64=await converterParaBase64(arquivo)
      setImagem1(base64)
    }
  }

  async function manipularImagem2(evt:any){
    const arquivo=evt.target.files[0]
    if(arquivo){
      const base64=await converterParaBase64(arquivo)
      setImagem2(base64)
    }
  }  

  async function manipularImagem3(evt:any){
    const arquivo=evt.target.files[0]
    if(arquivo){
      const base64=await converterParaBase64(arquivo)
      setImagem3(base64)
    }
  }

  function preencherCamposProdutoImportado(dados:any){
    dadosLinha=[]
    setListaItensAdd(criarLinhasGrid(dadosLinha))
    //setNome(dados[0].s_nome_produto)
    setDesc(dados[0].s_desc_produto)
    //setValor(dados[0].f_valor_produto)
    setPersonalizavel(dados[0].n_personalizavel_produto)
    setStatusProduto(dados[0].n_status_produto)
    setImagem1(dados[0].s_imagem1_produto)
    setImagem2(dados[0].s_imagem2_produto)
    setImagem3(dados[0].s_imagem3_produto)
    dados[0].itens.forEach((it:any)=>{
      const dado={
        n_id_item: it.n_id_item,
        s_nome_item: it.s_nome_item
      }
      dadosLinha.push(dado)
    })
    setListaItensAdd(criarLinhasGrid(dadosLinha))
  }

  return (
    <div>
      <Transition
        show={mostrarAddItens}
        enter="transition-opacity duration-50"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <AddItens ocultarJanela={setMostrarAddItens} addItem={addItem}/>
      </Transition>
      <Transition
        show={mostrarListaProdutosExistentes}
        enter="transition-opacity duration-50"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ListaProdutosExistentes ocultarJanela={setMostrarListaProdutosExistentes} preencherCamposProdutoImportado={preencherCamposProdutoImportado}/>
      </Transition>
      <Topo/>
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versaoNovoProduto}</div>
        <BotaoVoltar txt="Produtos" caminho="/produto/produto"/>
        <button
          className={`
            flex
            bg-zinc-200
            border
            border-zinc-400
            rounded-md
            p-2
          `}
          onClick={()=>{
            setMostrarListaProdutosExistentes(true)
          }}
        >
          Importar Dados Produto Existente
        </button>
        <h1>Novo Produto</h1>
        <div className='flex w-[100%]'>

          <div className='flex flex-col gap-5 w-1/3 border border-zinc-300 p-2 m-1'>
            <div className='campoForm'>
              <label>Nome do Produto</label>
              <div className='flex gap-3'>
                <input type="text" id="nomeProduto" value={nome_produto} onChange={(e)=>setNome(e.target.value)}></input>
              </div>
            </div>
            <div className='campoForm'>
              <label>Descrição</label>
              <div className='flex gap-3'>
                <input type="text" id="descProduto" value={desc_produto} onChange={(e)=>setDesc(e.target.value)}></input>
              </div>
            </div> 
            <div className='campoForm'>
              <label>Valor</label>
              <div className='flex gap-3'>
                <input type="text" id="valorProduto" value={valor_produto} onChange={(e)=>setValor(e.target.value)}></input>
              </div>
            </div>   
            <div className='campoForm'>
              <label>Personalizável</label>
              <div className='flex gap-3'>
                <select id="persoProduto" value={person_produto} onChange={(e)=>setPersonalizavel(e.target.value)}>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </select>
              </div>
            </div>                                
            <div className='campoForm'>
              <label>Status do Produto</label>
              <div className='flex gap-3'>
                <select id="statusProduto" value={statusProduto} onChange={(e)=>setStatusProduto(e.target.value)}>
                  {listaStatus?listaStatus:""}
                </select>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5 w-1/3 border border-zinc-300 p-2 m-1'>                         
            <div className='campoForm'>
              <button title="Adicionar Itens" className='btnPadrao btnPadrao100 flex justify-center items-center' onClick={()=>setMostrarAddItens(true)}>Clique aqui para Adicionar Itens ao Produto</button>              
              <div className='flex justify-center items-start gap-3'>
                <ListaItensAddNovoProd plistaItensAdd={listaItensAdd}/>
              </div>
            </div>                 
          </div>

          <div className='flex flex-col gap-5 w-1/3 border border-zinc-300 p-2 m-1'>
            <div className='border rounded-md p-1'>
              <label>Imagem 1</label>
              <div className='flex gap-3'>
                <input type="file" accept=".jpg" id="imagem1Produto" onChange={manipularImagem1}></input>
              </div>
              {imagem1&&(
                  <div>
                    <Image width={150} height={150}
                      src={imagem1}
                      alt="Imagem selecionada"
                    />
                  </div>
                )}
            </div>  
            <div className='border rounded-md p-1'>
              <label>Imagem 2</label>
              <div className='flex gap-3'>
                <input type="file" accept="image/*" id="imagem2Produto" onChange={manipularImagem2}></input>
              </div>
              {imagem2&&(
                  <div>
                    <Image width={150} height={150}
                      src={imagem2}
                      alt="Imagem selecionada"
                    />
                  </div>
                )}
            </div>    
            <div className='border rounded-md p-1'>
              <label>Imagem 3</label>
              <div className='flex gap-3'>
                <input type="file" accept="image/*" id="imagem3Produto" onChange={manipularImagem3}></input>
              </div>
              {imagem3&&(
                  <div>
                    <Image width={150} height={150}
                      src={imagem3}
                      alt="Imagem selecionada"
                    />
                  </div>
                )}
            </div> 
               
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
