import LinhaListaPessoa from "./LinhaListaPessoa";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;

export default function ListaDePessoas(){

    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const endpoint=`${servidor}todaspessoas/`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaPessoa funcao={deletarDados} key={e.n_id_pessoa} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("A pessoa será removida!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}pessoa`
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
                <div className="c250">Nome</div>
                <div className="c150">Tipo</div>
                <div className="c150">Status</div>
                <div className="c300">Empresa</div>
                <div className="c120 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
