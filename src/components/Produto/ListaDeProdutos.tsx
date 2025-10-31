import LinhaListaProduto from "./LinhaListaProduto";
import Loading from '@/components/Loading/Loading';
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor=Configuracao.servidor;
let idFabrica=Configuracao.fabrica;

export default function ListaDeItens(){
    const [telaLoading,setTelaLoading]=useState<boolean>(false)
    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        setTelaLoading(true)
        idFabrica=localStorage.getItem("fabrica")
        const endpoint=`${servidor}produtoitens/s/${idFabrica}`
        console.log(endpoint)
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
            setTelaLoading(false)
        })
        .catch(()=>{})
        .finally(()=>{
            setTelaLoading(false)
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaProduto funcao={deletarDados} key={Math.random()*9999999999999999999} dados={{...e}} itens={e.itens}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("O produto será removido!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${servidor}produto`
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
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira. Este Produto está associada a algum Pedido e ou existe algum ")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover Produto.")
                }
            })
        }
    }

    return (
        <div>
            {telaLoading&&
                <Loading/>
            }            
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c400">Nome Produto</div>
                <div className="c150 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
