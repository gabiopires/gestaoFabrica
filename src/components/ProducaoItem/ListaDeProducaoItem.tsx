import LinhaListaProducaoItem from "./LinhaListaProducaoItem";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';
import { Transition } from '@headlessui/react';

const servidor=Configuracao.servidor;
let idfabrica=-1;
let idstatus=-1;
let intervalo:any=null

export default function ListaDeProducaoItem(){

    const [linhas,setLinhas]=useState<any>(null)
    const [idfab,setIdFab]=useState("-1")
    const [idfab2,setIdFab2]=useState("-1")
    const [optionsFab,setOptionsFab]=useState<any[]>([])
    const [optionsFab2,setOptionsFab2]=useState<any[]>([])
    const [modalJanelaMudarStatus,setModalJanelaMudarStatus]=useState(false)
    const [modalJanelaMudarProduto,setModalJanelaMudarProduto]=useState(false)
    const [modalJanelaMudarFabrica,setModalJanelaMudarFabrica]=useState(false)
    const [idpedproditem,setIdpedproditem]=useState("0")
    const [idpedprod,setIdpedprod]=useState("0")
    const [idStatus,setIdStatus]=useState("-1")
    const [optionsStatus,setOptionsStatus]=useState<any[]>([])
    const [idStatusv2,setIdStatusv2]=useState("1")
    const [optionsStatusv2,setOptionsStatusv2]=useState<any[]>([])

    const tempoIntervalo:any=5000
  
    useEffect(()=>{
        localStorage.setItem("idstatusclicado","")
        localStorage.setItem("idfabricaclicado","")
        carregarFabricas()
        carregarStatus()
        carregarStatus_v2()
        carregarDados()
        
        return () => {
            clearInterval(intervalo)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarFabricas(){
        const endpoint=`${servidor}fabrica`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            const dados1=[...res];
            const dados2=[...res];
            dados2.unshift(
                {
                    n_id_fabrica:-1,
                    s_cidade_fabrica:"",
                    s_email_fabrica:"",
                    s_nome_fabrica:" ",
                    s_tel_resp_fabrica:""
                }
            )            
            setOptionsFab2(
                dados2.map((f:any)=>{
                    return <option value={f.n_id_fabrica} key={Math.random()}>{f.s_nome_fabrica}</option>
                })
            )            
            dados1.unshift(
                {
                    n_id_fabrica:-1,
                    s_cidade_fabrica:"",
                    s_email_fabrica:"",
                    s_nome_fabrica:"Todas",
                    s_tel_resp_fabrica:""
                }
            )
            setOptionsFab(
                dados1.map((f:any)=>{
                    return <option value={f.n_id_fabrica} key={Math.random()}>{f.s_nome_fabrica}</option>
                })
            )
        })
    }

    function carregarStatus(){
        const endpoint=`${servidor}todosstatuspedido`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            const dados=[...res];
            dados.unshift(
                {
                    n_id_statuspedido:-1,
                    s_desc_statuspedido:"Todos (Menos Aguardando e Finalizado)"
                }
            )
            setOptionsStatus(
                dados.map((f:any)=>{
                    return <option value={f.n_id_statuspedido} key={Math.random()}>{f.s_desc_statuspedido}</option>
                })
            )
        })
    }  
    
    function carregarStatus_v2(){
        const endpoint=`${servidor}todosstatuspedido`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            const dados=[...res];
            dados.shift()
            dados.unshift(
                {
                    n_id_statuspedido:-1,
                    s_desc_statuspedido:" "
                }
            )
            setOptionsStatusv2(
                dados.map((f:any)=>{
                    return <option value={f.n_id_statuspedido} key={Math.random()}>{f.s_desc_statuspedido}</option>
                })
            )
        })
    }      

    function carregarDados(){
        console.log("Intervalo:producaoItem")
        clearTimeout(intervalo)
        const endpoint=`${servidor}pedidositens/${idfabrica}/-1/${idstatus}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
        .finally(()=>{
            intervalo=setTimeout(carregarDados,tempoIntervalo)
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaProducaoItem key={Math.random()} dados={e} setIdpedprod={setIdpedprod} fmodalMudarStatusProduto={setModalJanelaMudarProduto} fmodalMudarStatus={setModalJanelaMudarStatus} fmodalMudarFabrica={setModalJanelaMudarFabrica} setIdpedproditem={setIdpedproditem}/>
        })
        return ld;
    }

    function filtrarFabrica(fid:any,sid:any){
        idfabrica=fid;
        idstatus=sid;
        carregarDados()
    }

    function mudarStatusItem(){
        if(idStatusv2=="-1"){
            alert("Status inválido")
            return
        }
        const endpoint=`${servidor}mudarstatusitem/${idpedproditem}/${idStatusv2}/n`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setModalJanelaMudarStatus(false)
            carregarDados()
        })
    }

    function mudarStatusProduto(){
        if(idStatusv2=="-1"){
            alert("Status inválido")
            return
        }
        const endpoint=`${servidor}mudarstatusitem/${idpedprod}/${idStatusv2}/s`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setModalJanelaMudarStatus(false)
            carregarDados()
        })
    }    

    function mudarFabricaItem(){
        if(idfab2=="-1"){
            alert("Fábrica inválida")
            return
        }        
        const endpoint=`${servidor}mudarfabricaitem/${idpedproditem}/${idfab2}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setModalJanelaMudarFabrica(false)
            carregarDados()
        })
    }    

    function janelaMudarStatus(){
        return(
            <div className="popupFundo">
                <div className="popupBase popupBase300px">
                    <div className="popupTitulo">Mudar Status do item</div>
                    <div className="popupPrincipal popupPrincipalColuna">
                        <div className='campoForm mb-3'>
                            <label>ID Pedido Produto Item</label>
                            <input type="text" value={idpedproditem} onChange={(e)=>setIdpedproditem(e.target.value)}></input>
                        </div>
                        <div className='campoForm'>
                            <label>Status</label>
                            <select value={idStatusv2} onChange={(e)=>{setIdStatusv2(e.target.value)}}>
                                {optionsStatusv2}
                            </select>
                        </div>                         
                    </div>
                    <div className="popupRodape">
                        <button className="btnPadrao" onClick={()=>mudarStatusItem()}>Mudar</button>
                        <button className="btnPadrao" onClick={()=>setModalJanelaMudarStatus(false)}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    }

    function janelaMudarStatusProduto(){
        return(
            <div className="popupFundo">
                <div className="popupBase popupBase300px">
                    <div className="popupTitulo">Mudar Status do Produto</div>
                    <div className="popupPrincipal popupPrincipalColuna">
                        <div className='campoForm mb-3'>
                            <label>ID Pedido Produto</label>
                            <input type="text" value={idpedprod} onChange={(e)=>setIdpedprod(e.target.value)}></input>
                        </div>
                        <div className='campoForm'>
                            <label>Status</label>
                            <select value={idStatusv2} onChange={(e)=>{setIdStatusv2(e.target.value)}}>
                                {optionsStatusv2}
                            </select>
                        </div>                         
                    </div>
                    <div className="popupRodape">
                        <button className="btnPadrao" onClick={()=>mudarStatusProduto()}>Mudar</button>
                        <button className="btnPadrao" onClick={()=>setModalJanelaMudarProduto(false)}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    }    

    function janelaMudarFabrica(){
        return(
            <div className="popupFundo">
                <div className="popupBase popupBase300px">
                    <div className="popupTitulo">Mudar Fábrica do item</div>
                    <div className="popupPrincipal popupPrincipalColuna">
                        <div className='campoForm mb-3'>
                            <label>ID Pedido Produto Item</label>
                            <input type="text" value={idpedproditem} onChange={(e)=>setIdpedproditem(e.target.value)}></input>
                        </div>
                        <div className='campoForm'>
                            <label>Fabricas</label>
                            <select value={idfab2} onChange={(e)=>{setIdFab2(e.target.value)}}>
                                {optionsFab2}
                            </select>
                        </div>                         
                    </div>
                    <div className="popupRodape">
                        <button className="btnPadrao" onClick={()=>mudarFabricaItem()}>Mudar</button>
                        <button className="btnPadrao" onClick={()=>setModalJanelaMudarFabrica(false)}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    }    

    return (
        <div className="flex flex-col gap-5">        
            <div className="">
                <div className='campoForm mb-3'>
                    <label>Filtro por Fábrica</label>
                    <select value={idfab} onChange={(e)=>{setIdFab(e.target.value)}}>
                        {optionsFab}
                    </select>
                </div>
                <div className='campoForm mb-3'>
                    <label>Filtro por Status</label>
                    <select value={idStatus} onChange={(e)=>{setIdStatus(e.target.value)}}>
                        {optionsStatus}
                    </select>
                </div>   
                <div className='campoForm'>
                    <button className="btnPadrao" onClick={()=>filtrarFabrica(idfab,idStatus)}>Filtrar</button>
                </div>               
            </div>
            <div className="flex flex-col">
                <div className="tituloGrid">
                    <div className="c100">Id Pedido</div>
                    <div className="c150">Id Pedido Produto</div>
                    <div className="c190">ID Pedido Produto Item</div>
                    <div className="c200">Produto</div>
                    <div className="c200">Item</div>
                    <div className="c200">Status</div>
                    <div className="c200">Fabrica</div>
                    <div className="c200">Prioridade</div>
                    <div className="c70 ccenter">Oper.</div>
                </div>
                <div>
                    {linhas?linhas:""}
                </div>
            </div>
            <Transition
                show={modalJanelaMudarStatus}
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {janelaMudarStatus()}
            </Transition>
            <Transition
                show={modalJanelaMudarProduto}
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {janelaMudarStatusProduto()}
            </Transition>
            <Transition
                show={modalJanelaMudarFabrica}
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {janelaMudarFabrica()}
            </Transition>                         
        </div>
    );
}