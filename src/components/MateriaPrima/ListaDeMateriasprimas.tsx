import LinhaListaMateriaprima from "./LinhaListaMateriaprima";
import { useState, useEffect } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

export default function ListaDeMateriasprimas(){

    const [linhas,setLinhas]=useState<any>(null)
   
    useEffect(()=>{
        carregarDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function carregarDados(){
        const endpoint=`${Configuracao.servidor}materiaprima/${Configuracao.fabrica}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            setLinhas(criarLinhasGrid(res))
        })
    }

    function criarLinhasGrid(r:any){
        const ld=r.map((e:any)=>{
            return <LinhaListaMateriaprima funcao={deletarDados} key={e.n_id_materiaprima} dados={{...e}}/>
        })
        return ld;
    }

    function deletarDados(evt:any){
        const res=confirm("O programa será removido!")
        if(res){
            const idDeletar=evt.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
            const endpoint=`${Configuracao.servidor}materiaprima`
            console.log(idDeletar)
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
                    alert("Não é possível excluir o registro devido a uma restrição de chave estrangeira. Esta Matéria Prima está associada a algum Ítem")
                }else if(res.status==405){
                    alert("Erro desconhecido ao remover Matéria Prima.")
                }
            })
        }
    }

    return (
        <div>
            <div className="tituloGrid">
                <div className="c70">ID</div>
                <div className="c350">Nome Matéria Prima</div>
                <div className="c350">Descrição Matéria Prima</div>
                <div className="c150">Quantidade</div>
                <div className="c150">Un. Medida</div>
                <div className="c100 ccenter">Oper.</div>
            </div>
            <div>
                {linhas?linhas:""}
            </div>
        </div>
    );
}
