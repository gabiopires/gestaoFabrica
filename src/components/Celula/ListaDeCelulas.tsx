import LinhaListaCelula from "./LinhaListaCelula";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
let idFabrica:any=Configuracao.fabrica;

export default function ListaDeCelulas(){

    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarCelulas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarCelulas(){
        idFabrica=localStorage.getItem("fabrica")
        const endpoint=`${servidor}celula/${idFabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaCelula funcao={deletarDados} key={e.n_id_celula} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("A Célula será removida!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}celula`
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
                    carregarCelulas()
                }else if(res.status==209){
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira. Existe uma ou mais Unidades ligadas a esta célula")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover célula")
                }
            })
        }
    }

    return (
        <div>
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c300">Nome Célua</div>
                <div className="c150">Ativo</div>
                <div className="c300">Fábrica</div>
                <div className="c100 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
