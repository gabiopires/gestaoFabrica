import LinhaDashboardFiltro from "./LinhaDashboardFiltro"
import { useState, useEffect } from "react";
import Configuracao from "../Configuracao/Configuracao";

const servidor = Configuracao.servidor;
let idFabrica: any = ''

export default function ListaDashboardFiltro() {

    const [linhas, setLinhas] = useState<any[]>([])
    const [fabrica, setFabrica] = useState<any>(0)

    useEffect(() => {
        idFabrica = localStorage.getItem("fabrica")
    }, [])

    function carregarDados(fab?:any) {
        const endpoint = `${servidor}pedido`
        setFabrica(fab)
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                setLinhas(criarLinhas(res,fab))
            })
    }

    const criarLinhas = (p: any[], fab?:number) => {
        return p.map((evt) => {
            if(evt.n_id_fabrica == fab){
                return <LinhaDashboardFiltro dados={evt.produto} key={Math.random() * 9999999999999999999} fab={fab}/>
            }if(fab == 4){
                return <LinhaDashboardFiltro dados={evt.produto} key={Math.random() * 9999999999999999999} fab={fab}/>
            }
        })
    }

    return (
        <div className="flex flex-col justify-center items-center p-1">
            <div className="tituloDashboard mt-3">
                <label>
                    Filtrar pedidos por Fabrica: 
                    <select style={{backgroundColor:'#00438c',fontSize:'medium',paddingLeft:'5px'}} value={fabrica} onChange={((e)=> carregarDados(e.target.value))}>
                        <option selected value={0}></option>
                        <option value={1}>Centro 4.0</option>
                        <option value={2}>Juiz de fora</option>
                        <option value={3}>Extrema</option>
                        <option value={4}>Todas</option>
                    </select>
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

 