import LinhaListaProducao from "./LinhaListaProducao";
import { useState, useEffect, useRef } from "react";
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor = Configuracao.servidor;
let sitListaPeds: any = {};
let listaPeds: any = [];
let intervalo: any = null;

export default function ListaDeProducao() {
    const [linhas, setLinhas] = useState<any>(null);
    const tempoIntervalo: any = 5000;
    
    // Referência para armazenar a posição da rolagem da página
    const scrollPositionRef = useRef(0);

    useEffect(() => {
        carregarDados();
        return () => {
            clearInterval(intervalo);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Função para carregar dados e manter a posição de rolagem da página
    function carregarDados(timer?: any) {
        console.log("Intervalo:producao");
        clearTimeout(intervalo);

        // Salvar a posição Y atual da página
        const scrollPosition = window.scrollY;

        const endpoint = `${servidor}obterpedidos/-1/0`;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                listaPeds = res.map((p: any) => {
                    return p.n_id_pedido;
                });
                atualizar_sitListaPeds(listaPeds);
                setLinhas(criarLinhasGrid(res));

                // Forçar a restauração da rolagem após a atualização do DOM
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                }, 100); // Dê um tempo extra para garantir que o DOM foi atualizado
            })
            .finally(() => {
                intervalo = setTimeout(carregarDados, tempoIntervalo);
            });
    }

    const atualizar_sitListaPeds = (peds: any) => {
        peds.forEach((p: any) => {
            if (!sitListaPeds[p]) {
                sitListaPeds[p] = false;
            }
        });
    };

    const abrirFecharLista = (id: any, sit: boolean) => {
        sitListaPeds[id] = sit;
    };

    function criarLinhasGrid(r: any) {
        const ld = r.map((e: any) => {
            return <LinhaListaProducao dados={e} key={Math.random() * 9999999999999999999} abrirFecharLista={abrirFecharLista} sitListaPeds={sitListaPeds} />;
        });
        return ld;
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                <div className="tituloGrid">
                    <div className="c200">ID Pedido</div>
                    <div className="c200">Data</div>
                    <div className="c200">Status</div>
                    <div className="c200">Prioridade</div>
                </div>
                <div>
                    {linhas ? linhas : ""}
                </div>
            </div>
        </div>
    );
}
