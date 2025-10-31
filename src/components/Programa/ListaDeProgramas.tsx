import LinhaListaPrograma from "./LinhaListaPrograma";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

let idFabrica=Configuracao.fabrica;

export default function ListaDeProgramas(){

    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        idFabrica=localStorage.getItem("fabrica")
        const endpoint=`${Configuracao.servidor}programa/${idFabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaPrograma funcao={deletarDados} key={e.n_id_programa} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("O programa será removido!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${Configuracao.servidor}programa`
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
                }else if(res.status==209){
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira.")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover Programa.")
                }
            })
        }
    }

    return (
        <div>
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c300">Nome Programa</div>
                <div className="c300">Código Identificador</div>
                <div className="c300">Fábrica</div>
                <div className="c100 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
