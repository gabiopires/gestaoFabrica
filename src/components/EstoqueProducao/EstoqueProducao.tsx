import LinhaListaPedido from "./LinhaListaEstoqueProducao";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';
import Globais from "../Configuracao/Globais";

const servidor=Configuracao.servidor;

let dadosFiltro={
    status:'0',
    fabrica:'0',
    dtini:'0',
    dtfim:'0'
}

export default function EstoqueProducao(){

    const [linhas,setLinhas]=useState<any>(null)
    const [statusListar,setStatusListar]=useState("0");

    const [filtroValorStatus,setFiltroValorStatus]=useState("0")
    const [filtroOptionStatus,setFiltroOptionStatus]=useState<any[]>([])
    const [filtroValorFabrica,setFiltroValorFabrica]=useState("0")
    const [filtroOptionFabrica,setFiltroOptionFabrica]=useState<any[]>([])
    const [filtroValorDataIni,setFiltroValorDataIni]=useState("")
    const [filtroValorDataFim,setFiltroValorDataFim]=useState("")
  
    useEffect(()=>{
        criarOptionsFiltroStatus()
        criarOptionsFabrica()
        timer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function timer(){
        carregarDados()
    }

    function filtrar(){
        dadosFiltro.status=filtroValorStatus
        dadosFiltro.fabrica=filtroValorFabrica
        dadosFiltro.dtini=filtroValorDataIni==""?"0":filtroValorDataIni
        dadosFiltro.dtfim=filtroValorDataFim==""?"0":filtroValorDataFim     
        carregarDados()
    }

    function criarOptionsFiltroStatus(){
        const endpoint=`${servidor}todosstatuspedido`
        const opt:any[]=[]
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            res.forEach((p:any)=>{
                opt.push(
                    <option key={p.n_id_statuspedido} value={p.n_id_statuspedido}>{p.s_desc_statuspedido}</option>
                )
            })
            opt.unshift(<option key={0} value={0}>Todos</option>)
            setFiltroOptionStatus(opt);
        })
    }  

    function criarOptionsFabrica(){
        const endpoint=`${servidor}fabrica`
        const opt:any[]=[]
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            res.forEach((p:any)=>{
                opt.push(
                    <option key={p.n_id_fabrica} value={p.n_id_fabrica}>{p.s_nome_fabrica}</option>
                )
            })
            opt.unshift(<option key={0} value={0}>Todas</option>)
            setFiltroOptionFabrica(opt);
        })
    }  

    function mudaStatus(s:string){
        dadosFiltro.status=s
        setStatusListar(s)
        localStorage.setItem("status",s)
        carregarDados()
        localStorage.setItem("status",s)
    }

    function carregarDados(timer?:any){
        clearInterval(Globais.intervaloEstoqueProducao)
        let st=localStorage.getItem("status")||"0"
        const endpoint=`${servidor}pedidostatus/${st}/${JSON.stringify(dadosFiltro)}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
        .finally(()=>{
            //setTimeout(timer,Configuracao.tmpUpdatePedidos)
            Globais.intervaloEstoqueProducao=setInterval(carregarDados,Configuracao.tmpUpdatePedidos)
        })
    }

    function mudarStatusAguardando(evt:any){
        const statual=evt.target.parentNode.parentNode.parentNode.dataset.status
        if(statual==3 || statual==4){
            alert("Este status não pode ser mais alterado manualmente")
            return
        }
        if(statual==2){
            alert("Este pedido não pode ter seu status alterado")
            return
        }   
        if(statual==4){
            alert("Este pedido já foi finalizado")
            return
        }            
        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        const endpoint=`${servidor}mudarStatusPedido/${id}/1`;
        fetch(endpoint)
        .then(res=>{
            if(res.status==200){
                carregarDados()
            }
        })
    }

    function mudarStatus(evt:any,st:string){
        const statual=evt.target.parentNode.parentNode.parentNode.dataset.status
        if(statual==5 && st=='2'){
            alert("Este pedido não pode ser enviado para fila de produção porque está com status Bloqueado")
            return
        }
        if(statual==3 && st=='5'){
            alert("Este pedido não pode ser Bloqueado porque já está em produção")
            return
        }  
        if(statual==2){
            alert("Este pedido não pode ter seu status alterado")
            return
        }       
        if(statual==4){
            alert("Este pedido já foi finalizado")
            return
        }            

        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        const endpoint=`${servidor}mudarStatusPedido/${id}/${st}`;
        fetch(endpoint)
        .then(res=>{
            if(res.status==200){
                carregarDados()
            }else{
                alert("Não existe quantidade de matéria prima suficiente para enviar este pedido paea fila de produção")
            }
        })
    }
    
    function mudarStatusFila(evt:any){
        mudarStatus(evt,"2");
    }
    
    function mudarStatusProduzindo(evt:any){
        mudarStatus(evt,"3");
    }
    
    function mudarStatusFinalizado(evt:any){
        mudarStatus(evt,"4");
    }
    
    function mudarStatusBloqueado(evt:any){
        mudarStatus(evt,"5");
    }  

    function mudarPrioridade(evt:any){
        const statual=evt.target.parentNode.parentNode.parentNode.dataset.status
        if(statual==3 || statual==4){
            alert("Esta prioridade não pode ser mais alterada manualmente devido ao Status atual do pedido")
            return
        }        
        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        let prio=evt.target.parentNode.childNodes[0].dataset.prio
        if(prio==3){
            prio=2
        }else if(prio==2){
            prio=1
        }else if(prio==1){
            prio=3
        }
        const endpoint=`${servidor}mudarPrioridadePedido/${id}/${prio}`;
        fetch(endpoint)
        .then(res=>{
            if(res.status==200){
                carregarDados()
            }
        })
    }

    function finalizarPedido(evt:any){
        const id=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
        const endpoint=`${servidor}finalizarPedido/${id}`
        fetch(endpoint)
        .then(res=>{
            if(res.status==200){
                carregarDados()
            }
        })
        evt.preventDefault()
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaPedido finalizarPedido={finalizarPedido} mudarPrioridade={mudarPrioridade} mudarStatusAguardando={mudarStatusAguardando} mudarStatusFila={mudarStatusFila} mudarStatusProduzindo={mudarStatusProduzindo} mudarStatusFinalizado={mudarStatusFinalizado} mudarStatusBloqueado={mudarStatusBloqueado} prioridade={e.n_prioridade_pedido} funcao={deletarDados} key={e.n_id_pedido} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const status=evt.target.parentNode.parentNode.parentNode.childNodes[2].dataset.status
        if(status>2){
            alert('Este Pedido não pode ser mais removido')
            return
        }
        const res=confirm("O pedido será removido!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}pedido`
            const dados={
                idDeletar:idDeletar
            }    
            const cabecalho={
                method:"DELETE",
                body:JSON.stringify(dados)
            }
            fetch(endpoint,cabecalho)
            .then(res=>{
                if(res.status==200){
                    carregarDados()
                }
            })
        }
    } 

    return (
        <div className="flex flex-col gap-5">
            <div className='flex flex-col gap-2 border p-2 rounded-md'>
                <div className='campoForm'>
                    <label>Selecione o Status que deseja listar</label>
                </div>
                <div className='flex gap-5'>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="0"?"btnPadrao_cinza_selecionado":"")}>Todos</button>
                        <div className="flex justify-center">Legenda:</div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="1"?"btnPadrao_cinza_selecionado":"")}>Aguardando</button>
                        <div className="aguardando rounded-lg">&nbsp;</div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="2"?"btnPadrao_cinza_selecionado":"")}>Fila Prod.</button>
                        <div className="filaproducao rounded-lg">&nbsp;</div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="3"?"btnPadrao_cinza_selecionado":"")}>Produzindo</button>
                        <div className="produzindo rounded-lg">&nbsp;</div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="4"?"btnPadrao_cinza_selecionado":"")}>Finalizado</button>
                        <div className="finalizado rounded-lg">&nbsp;</div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <button className={'btnPadrao_cinza '+(statusListar=="5"?"btnPadrao_cinza_selecionado":"")}>Bloqueado</button>
                        <div className="bloqueado rounded-lg">&nbsp;</div>
                    </div>                    
                </div>
            </div>
            <div className="flex w-full border justify-between gap-3 p-3 rounded-lg">
                <div className='campoForm w-full'>
                    <label>Filtro Status</label>
                    <select className="" value={filtroValorStatus} onChange={(e)=>setFiltroValorStatus(e.target.value)}>
                        {filtroOptionStatus}
                    </select>
                </div>
                <div className='campoForm w-full'>
                    <label>Filtro Fábrica</label>
                    <select className="" value={filtroValorFabrica} onChange={(e)=>setFiltroValorFabrica(e.target.value)}>
                        {filtroOptionFabrica}
                    </select>
                </div>  
                <div className='campoForm w-full'>
                    <label>Data Inicial</label>
                    <input type='date' onChange={(e)=>setFiltroValorDataIni(e.target.value)}/>
                </div>                 
                <div className='campoForm w-full'>
                    <label>Data Final</label>
                    <input type='date' onChange={(e)=>setFiltroValorDataFim(e.target.value)}/>
                </div>                 
                <div className='campoForm w-full justify-center items-center'>
                    <button className='btnPadrao w-full' onClick={filtrar}>Filtrar</button>
                </div>                                
            </div>
            <div className="flex flex-col">
                <div className="tituloGrid">
                    <div className="c70">ID</div>
                    <div className="c150">Data</div>
                    <div className="c150">Status</div>
                    <div className="c150">Prioridade</div>
                    <div className="c200">Fábrica</div>
                    <div className="c100 ccenter border-l border-r">Oper.</div>
                    <div className="c120 ccenter border-r">Status</div>
                    <div className="c100 ccenter">Prioridade</div>
                </div>
                <div>
                    {linhas?linhas:""}
                </div>
            </div>
        </div>
    );
}
