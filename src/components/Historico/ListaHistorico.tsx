import LinhaHistoricoPedidos from "./LinhaHistoricoPedidos";
import { useState,useEffect } from "react";
import Configuracao from "../Configuracao/Configuracao";

const servidor= Configuracao.servidor;
let idFabrica:any=''

export default function ListaHistorico(){

    const [linhas,setLinhas]=useState<any[]>([])
   
    useEffect(()=>{
        idFabrica=localStorage.getItem("fabrica")
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const endpoint=`${servidor}pedido`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhas(res))
            console.log(res)
        })
    }

    const criarLinhas = (p:any[])=>{
        return p.map((evt:any)=>{
            return <LinhaHistoricoPedidos dados={[...evt]} key={Math.random()*9999999999999999999}/>
        })
    }

    return (
        <div>
            <div className="tituloGrid mt-3">
                <div className="c1_historico">ID Pedido</div>
                <div className="c2_historico">Data</div>
                <div className="c3_historico">Hora</div>
                <div className="c4_historico">Status</div>
                <div className="c5_historico">Oper.</div>
            </div>
            <div>
                {linhas?linhas:"-"}
            </div>
        </div>
    );
}