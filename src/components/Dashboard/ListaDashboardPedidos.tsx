import LinhaDashboardPedido from "./LinhaDashboardPedido"
import { useState, useEffect } from "react";
import Configuracao from "../Configuracao/Configuracao";

const servidor = Configuracao.servidor;
let idFabrica: any = ''

interface ListaDashboardPedidos{
    idFab:any;
}

export default function ListaDashboardPedidos(props:ListaDashboardPedidos) {

    const [linhas, setLinhas] = useState<any[]>([])
    const [botao, setBotoes] =  useState<any[]>([])
    const idFab = props.idFab;

    useEffect(() => {
        idFabrica = localStorage.getItem("fabrica")
        carregarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function carregarDados() {
        const endpoint = `${servidor}pedido`
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setLinhas(criarLinhas(res))
            })
            .finally(()=>{
                setTimeout(() => {
                    carregarDados();
                }, Configuracao.tmpUpdatePedidos);
            })
    }

    const criarLinhas = (p: any[]) => {
        return p.map((evt) => {
            if(evt.n_id_fabrica == idFab)    
                return <LinhaDashboardPedido dados={evt.produto} key={Math.random() * 9999999999999999999} />
        })
    }

    return (
        <div className="flex flex-col justify-center items-center p-1">
            {botao}
            <div className="tituloDashboard mt-3 text-center">
                <label className="">
                    Produtos em produção:
                </label>
            </div>
            <div className="tituloGrid mt-3">
                <div className="c1_dashboard">ID Pedido</div>
                <div className="c2_dashboard">Nome</div>
            </div>
            <div>
                {linhas ? linhas : "-"}
            </div>
        </div>
    );
}