import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarProduto from '@/components/Produto/PesquisarProduto';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react'
import Loading from '@/components/Loading/Loading';
import Configuracao from '@/components/Configuracao/Configuracao';
import Image from 'next/image';
import ListaItensAddNovoProd from './listaItensAddNovoProd';
import LinhaListaItens from '@/components/Produto/LinhaListaItens';

const servidor=Configuracao.servidor;

export default function PaginaEditarProduto(){
  const router = useRouter();
  const idEditar = router.query.idEditar;
  
  const [telaLoading,setTelaLoading]=useState<boolean>(false)
  const [idPesquisa,setIdPesquisa]=useState<string>("");
  const [idproduto,setIdproduto]=useState<string>("")
  const [nome_produto,setNome]=useState<string>("")
  const [desc_produto,setDesc]=useState<string>("")
  const [valor_produto,setValor]=useState<string>("")
  const [person_produto,setPersonalizavel]=useState<string>("")
  const [listaItensAdd,setListaItensAdd]=useState<any[]>([])
  const [statusProduto,setStatusProduto]=useState<string>('0')
  const [listaStatus,setListaStatus]=useState<any[]>([])
  const [telaTrocarImagem,setTelaTrocarImagem]=useState<boolean>(false)
  const [novaImagemASerTrocada,setNovaImagemASerTrocada]=useState<any>("")
  const [imagem1,setImagem1]=useState<any>("")
  const [imagem2,setImagem2]=useState<any>("")
  const [imagem3,setImagem3]=useState<any>("") 
  const [mostrarAddItens,setMostrarAddItens]=useState<boolean>(false) 

  useEffect(()=>{
    criarOptionsStatus()
    if(idEditar){
      setTelaLoading(true)
      const endpoint=`${servidor}produto/${idEditar}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        setIdproduto(res.n_id_produto)
        setNome(res.s_nome_produto)
        setStatusProduto(res.n_status_produto)
        setDesc(res.s_desc_produto)
        setPersonalizavel(res.n_personalizavel_produto)
        setValor(res.f_valor_produto)
        setImagem1(res.s_imagem1_produto)
        setImagem2(res.s_imagem2_produto)
        setImagem3(res.s_imagem3_produto)
        setListaItensAdd(criarLinhasGrid(res.itens))
        setTelaLoading(false)
      })
      .catch(()=>{
        setTelaLoading(false)
      })
      .finally(()=>{
        setTelaLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function criarLinhasGrid(r:any){
    const ld=r.map((e:any)=>{
      return <LinhaListaItens tipobtn="del" funcaoBtn={deletarItem} key={e.n_id_item} dados={{...e}}/>
    })
    return ld;
  }
 
  function limparCampos(){
    setIdPesquisa("")
    setIdproduto("")
    setNome("")
    setStatusProduto("0")
    setDesc("")
    setPersonalizavel("")
    setValor("")
    setImagem1(null)
    setImagem2(null)
    setImagem3(null)    
  }

  function pesquisar(){
    if(idPesquisa===""){
      alert("Informe o ID do produto que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint=`${servidor}produto/${idPesquisa}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      if(res[0]){
        setIdproduto(res[0].n_id_produto)
        setNome(res[0].s_nome_produto)
        setStatusProduto(res[0].n_status_produto)
        setDesc(res[0].s_desc_produto)
        setPersonalizavel(res[0].n_personalizavel_produto)
        setValor(res[0].f_valor_produto)
        setImagem1(res[0].s_imagem1_produto)
        setImagem2(res[0].s_imagem2_produto)
        setImagem3(res[0].s_imagem3_produto)        
        setIdPesquisa("")
      }else{
        alert(`Nenhum produto encontrado com o ID: ${idPesquisa}`)
        limparCampos()
      }
    })
  }

  function gravar(){
    if(nome_produto===""){
      alert("Digite o nome do produto")
      return
    }  
    const endpoint=`${servidor}produto`

    const listaitens=[]
    let itens:any=document.getElementById("listaItens")?.children
    for(let i=0;i<itens.length;i++){
      listaitens.push(
        {
          'id':itens[i].childNodes[0].innerHTML,
          'nome':itens[i].childNodes[1].innerHTML
        }
      )
    }

    const dados={
      n_id_produto:idproduto,
      s_nome_produto:nome_produto,
      n_status_produto:statusProduto,
      s_imagem1_produto:imagem1,
      s_imagem2_produto:imagem2,
      s_imagem3_produto:imagem3,
      s_desc_produto:desc_produto,
      f_valor_produto:valor_produto,
      n_personalizavel_produto:person_produto,
      itensProduto:listaitens
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


  function deletarItem(evt:any){
    const res=confirm("O item será removido do produto!")
    if(res){
      const l=evt.target.parentNode.parentNode.parentNode
      l.remove()
    }
  }

  function cancelar(){
    if(idproduto!=""){
      const endpoint=`${servidor}produto/${idproduto}`
      fetch(endpoint)
      .then(res=>res.json())
      .then(res=>{
        if(res[0]){
          setIdproduto(res[0].n_id_produto)
          setNome(res[0].s_nome_produto)
          setStatusProduto(res[0].n_status_produto)
          setDesc(res[0].s_desc_produto)
          setPersonalizavel(res[0].n_personalizavel_produto)
          setValor(res[0].f_valor_produto)
          setImagem1(res[0].s_imagem1_produto)
          setImagem2(res[0].s_imagem2_produto)
          setImagem3(res[0].s_imagem3_produto) 
          setIdPesquisa("")
        }
      })
    }
  }

  function criarOptionsStatus(){
    const endpoint=`${servidor}todosstatusproduto`
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

  async function manipularImagemAserTrocada(evt:any){
    const arquivo=evt.target.files[0]
    if(arquivo){
      const base64=await converterParaBase64(arquivo)
      setNovaImagemASerTrocada(base64)
    }
  }

  function f_telaAddItem(){
    return(
      <div className='popupFundo'>
        <div className='popupBase popupBase50'>
          <div className='popupTitulo'>Adicionar Novo Item</div>
          <div className='popupPrincipal'>
            <div className='border rounded-md p-1'>
              <div>Recurso ainda não foi implementado</div>
            </div> 
          </div>
          <div className='popupRodape'>            
            <button className='btnPadrao' onClick={()=>setMostrarAddItens(false)}>Fechar</button>
          </div>
        </div>
      </div>      
    )
  }

  function f_telaTrocarImagen(){
    return(
      <div className='popupFundo'>
        <div className='popupBase popupBase50'>
          <div className='popupTitulo'>Trocar Imagem</div>
          <div className='popupPrincipal'>

            <div className='border rounded-md p-1'>
              <label>Imagem 1</label>
              <div className='flex gap-3'>
                <input type="file" accept="image/*" id="imagem1Produto" onChange={manipularImagemAserTrocada}></input>
              </div>
                {novaImagemASerTrocada&&(
                  <div>
                    <p>Nome Arquivo: {novaImagemASerTrocada.name}</p>
                    <p>Tamanho Arquivo: {novaImagemASerTrocada.size} bytes</p>
                    <Image width={0} height={0}
                      src={novaImagemASerTrocada}
                      alt="Imagem selecionada"
                      style={{maxWidth:'150px',maxHeight:'150px'}}
                    />
                  </div>
                )}
            </div> 
          </div>
          <div className='popupRodape'>
            <button className='btnPadrao'>Trocar</button>
            <button className='btnPadrao' onClick={()=>setTelaTrocarImagem(false)}>Fechar</button>
          </div>
        </div>
      </div>
    )
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

  return (
    <div>
      {telaLoading&&
          <Loading/>
      }        
      <Topo/>
      <Transition
        show={telaTrocarImagem}
        enter="transition-opacity duration-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >            
        {f_telaTrocarImagen()}
      </Transition>
      <Transition
        show={mostrarAddItens}
        enter="transition-opacity duration-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >            
        {f_telaAddItem()}
      </Transition>  
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex gap-5 justify-around'>  
          <BotaoVoltar txt="Produtos" caminho="/produto/produto"/>
          <BotaoVoltar txt="Lista Produtos" caminho="/produto/listaProdutos"/>
        </div>
        <h1>Editar Produto</h1>
        
        <PesquisarProduto id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar}/>
        
        <div className='flex w-[100%]'>

          <div className='flex flex-col gap-5 w-1/3 border border-zinc-300 p-2 m-1'>
            <div className='campoForm'>
              <label>ID Produto</label>
              <input type="text" readOnly className='cursor-not-allowed' value={idproduto} onChange={e=>setIdproduto(e.target.value)}></input>
            </div>           
            <div className='campoForm'>
              <label>Nome do Produto</label>
              <input type="text" id="nomePrograma" value={nome_produto} onChange={(e)=>setNome(e.target.value)}></input>
            </div>
            <div className='campoForm'>
              <label>Descrição</label>
              <div className='flex gap-3'>
                <textarea rows={4} id="descProduto" value={desc_produto} onChange={(e)=>setDesc(e.target.value)}></textarea>
              </div>
            </div> 
            <div className='campoForm'>
              <label>Valor</label>
              <div className='flex gap-3'>
                <input type="text" id="descProduto" value={valor_produto} onChange={(e)=>setValor(e.target.value)}></input>
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
              <div className='flex gap-3'>
                <input type="file" accept=".jpg" id="imagem1Produto" onChange={manipularImagem1}></input>
              </div>
              <Image width={150} height={150}
                src={imagem1?imagem1:""}
                alt="Imagem 1"
                className=''
              />
            </div>
            <div className='border rounded-md p-1'>
              <div className='flex gap-3'>
                <input type="file" accept=".jpg" id="imagem2Produto" onChange={manipularImagem2}></input>
              </div>
              <Image width={150} height={150}
                src={imagem2?imagem2:""}
                alt="Imagem 2"
                className=''
              />
            </div>
            <div className='border rounded-md p-1'>
              <div className='flex gap-3'>
                <input type="file" accept=".jpg" id="imagem3Produto" onChange={manipularImagem3}></input>
              </div>
              <Image width={150} height={150}
                src={imagem3?imagem3:""}
                alt="Imagem 3"
                className=''
              />
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

