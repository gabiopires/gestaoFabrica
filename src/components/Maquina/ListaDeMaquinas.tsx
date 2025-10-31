import LinhaListaMaquina from "./LinhaListaMaquina";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

let idFabrica=Configuracao.fabrica;

export default function ListaDeMaquinas(){

    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        idFabrica=localStorage.getItem("fabrica")
        const endpoint=`${Configuracao.servidor}maquina/${idFabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaMaquina funcao={deletarDados} key={e.n_id_unidade} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("A unidade será removida!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${Configuracao.servidor}maquina`
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
        <div>
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c300">Nome Máquina</div>
                <div className="c150">Código</div>
                <div className="c100">Ativo</div>
                <div className="c300">Unidade</div>
                <div className="c150">Status</div>
                <div className="c150">Fábrica</div>
                <div className="c100 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
