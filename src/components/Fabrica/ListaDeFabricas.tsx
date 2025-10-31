import LinhaListaFabrica from "./LinhaListaFabrica";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';
import Loading from "../Loading/Loading";

const servidor=Configuracao.servidor;

export default function ListaDeFabricas(){

    const [linhas,setLinhas]=useState<any>(null)
    const [load,setLoad]=useState<boolean>(false)
   
    useEffect(()=>{
        carregarFabricas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarFabricas(){
        const endpoint=`${servidor}fabrica/`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaFabrica funcao={deletarDados} key={e.n_id_fabrica} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("A fábrica será removida!")
        if(res){
            setLoad(true)
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}fabrica`
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
                    carregarFabricas()
                }else if(res.status==209){
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira. Existem registros ligados a esta Fábrica")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover Fábrica")
                }
            })
            .finally(()=>{
                setLoad(false)
            })
        }
    }

    return (
        <div>
            {load&&(<Loading/>)}
            <div className="tituloGrid">
                <div className="c50">ID</div>
                <div className="c250">Nome</div>
                <div className="c250">Cidade</div>
                <div className="c200">Telefone</div>
                <div className="c300">E-Mail</div>
                <div className="c100 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
