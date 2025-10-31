import Configuracao from '@/components/Configuracao/Configuracao';
import { useState, useEffect } from 'react';
import EtapasAdicionadas from './EtapasAdicionadas';
import LinhasEtapas from '../ListaItensSimples/LinhasEtapas'
import { useRouter } from 'next/router';

interface EditarEtapasProps {
  itens: any[],
  IDatual: string;
}

const servidor = Configuracao.servidor;
let dadosLinhaItem: any[] = []
let idadosLinhaItem: number = 0;
let dadosLinhaMp: any[] = []
let idadosLinhaMp: number = 0
let dadosEtapas: any = []
let fab : any = ["-", "Centro 4.0", "Juíz de Fora", "Extrema"]

export default function EditarEtapas(props: EditarEtapasProps) {

  const router = useRouter();
  const piditem = router.query.idEditar;

  const [linhasEtapas, setLinhasEtapas] = useState<any[]>([])
  const [unidadeOptions, setUnidadeOptions] = useState<any>(null)
  const [unidade_idUnidade, setIdUnidade] = useState<string>("-1")
  const [programa_idPrograma, setIdPrograma] = useState<string>("-1")
  const [programaOptions, setProgramaOptions] = useState<any>(null)
  const [fabrica_idFabrica,setIdFabrica]=useState<string>("-1")
  const [fabricaOptions,setFabricaOptions]=useState<any>(null)

  useEffect(() => {
    dadosEtapas = []
    dadosLinhaItem = []
    idadosLinhaItem = 0
    dadosLinhaMp = []
    idadosLinhaMp = 0;
    etapas();
    carregarProgramas()
    carregarUnidades()
    carregarFabricas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function addEtapa() {
    if (!unidade_idUnidade) {
      alert("Selecione a célula da etapa")
      return
    }
    if (!programa_idPrograma) {
      alert("Selecione o programa da etapa")
      return
    }
    const selunidade: any = document.getElementById("idunidade")
    const txtunidade: any = selunidade?.options[selunidade.selectedIndex].text;
    const selprograma: any = document.getElementById("idprograma")
    const txtprograma: any = selprograma?.options[selprograma.selectedIndex].text;
    const selfabrica: any = document.getElementById("idfabrica")
    const txtfabrica: any = selfabrica?.options[selfabrica.selectedIndex].text;
    dadosEtapas.push({
      "n_id_unidade": unidade_idUnidade,
      "n_id_programa": programa_idPrograma,
      "s_nome_programa": txtprograma,
      "s_nome_unidade": txtunidade,
      "s_nome_fabrica": Configuracao.nomefabrica,
      "idfabrica": Configuracao.fabrica,
      "i": soma()
    });
    console.log(dadosEtapas)
    setLinhasEtapas(criarLinhasEtapas(dadosEtapas))
  }

  function etapas(fb?: any) {
    const endpoint = `${servidor}etapa_item/${piditem}`
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        if (dadosEtapas.length == 0)
          res.forEach((e: any) => {
            dadosEtapas.push({
              "n_id_unidade": e.n_id_unidade,
              "n_id_etapa": e.n_id_etapa,
              "n_id_programa":e.n_id_programa,
              "s_nome_programa": e.s_nome_programa,
              "s_nome_unidade": e.s_nome_unidade,
              "n_ordem_etapa": e.n_ordem_etapa,
              "s_nome_fabrica":fab[e.n_id_fabrica],
              "n_id_fabrica":e.n_id_fabrica,
              "i": soma()
            });
            setLinhasEtapas(criarLinhasEtapas(dadosEtapas))
          });
        console.log(dadosEtapas)
      })
  }

  function deletarItemEtapa(linha: any) {
    const l = linha.target.parentNode.parentNode;
    let dadosLinhaItem_aux = dadosEtapas.filter((e: any) => {
      if (e.i != l.dataset.id) {
        return e
      }
    })
    dadosLinhaItem = dadosLinhaItem_aux
    dadosEtapas = dadosLinhaItem_aux;
    setLinhasEtapas(criarLinhasEtapas(dadosLinhaItem))

    const idDeletar ={
      "idDeletar":l.dataset.idetapa
    }

    const endpoint=`${servidor}etapa`
    const cabecalho = {
      method: "DELETE",
      body: JSON.stringify(idDeletar)
    }

    fetch(endpoint,cabecalho)
    .then(res => {
      console.log(res)
      if (res.status == 200) {
        alert("Dados alterados com sucesso!")
      } else {
        alert("ERRO")
      }
    })
  }

  function moverEtapaCima(linha: any) {
    const l = linha.target.parentNode.parentNode.parentNode
    l.classList.remove("linhaGrid")
    l.classList.add("linhaGridCinza")
    l.classList.add("destaque")
    setTimeout(() => {
      const linhaMover = l
      const linhaAnte = l.previousSibling
      linhaAnte?.before(linhaMover)
      linhaAnte.classList.remove("linhaGrid")
      linhaAnte.classList.add("linhaGridCinza")
      linhaMover.classList.add("destaque")
      setTimeout(() => {
        linhaMover.classList.remove("destaque")
        linhaMover.classList.add("linhaGridCinza")
        linhaMover.classList.remove("linhaGridCinza")
        linhaMover.classList.add("linhaGrid")

        linhaAnte.classList.add("linhaGrid")
        linhaAnte.classList.remove("linhaGridCinza")
      }, 1000)

    }, 250)
  }

  function moverEtapaBaixo(linha: any) {
    const l = linha.target.parentNode.parentNode.parentNode
    l.classList.remove("linhaGrid")
    l.classList.add("linhaGridCinza")
    l.classList.add("destaque")
    setTimeout(() => {
      const linhaMover = l
      const linhaProx = l.nextSibling
      linhaProx?.after(linhaMover)
      linhaProx.classList.remove("linhaGrid")
      linhaProx.classList.add("linhaGridCinza")
      linhaMover.classList.add("destaque")
      setTimeout(() => {
        linhaMover.classList.remove("destaque")
        linhaMover.classList.add("linhaGridCinza")
        linhaMover.classList.remove("linhaGridCinza")
        linhaMover.classList.add("linhaGrid")

        linhaProx.classList.add("linhaGrid")
        linhaProx.classList.remove("linhaGridCinza")
      }, 1000)

    }, 250)
  }

  function soma() {
    return idadosLinhaItem++;
  }

  function criarLinhasEtapas(r: any,) {
    const ld = r.map((e: any) => {
      return <LinhasEtapas funcaoBtn={(evt) => deletarItemEtapa(evt)} moverEtapaCima={(evt) => { moverEtapaCima(evt) }} moverEtapaBaixo={(evt) => { moverEtapaBaixo(evt) }} key={e.i} dados={e} />

    })
    return ld;
  }

  function carregarFabricas(){
    const endpoint=`${Configuracao.servidor}fabrica/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setFabricaOptions(criarOptionsFabricas(res))
    })
  }  

  function criarOptionsFabricas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_fabrica} value={e.n_id_fabrica}>{e.s_nome_fabrica}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarProgramas(){
    const endpoint=`${Configuracao.servidor}programa/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setProgramaOptions(criarOptionsProgramas(res))
    })
  }

  function criarOptionsProgramas(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_programa} data-fabrica={e.n_id_fabrica} value={e.n_id_programa}>{e.s_nome_programa}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  function carregarUnidades(){
    const endpoint=`${Configuracao.servidor}unidade/${Configuracao.fabrica}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
      setUnidadeOptions(criarOptionsUnidades(res))
    })
  }

  function criarOptionsUnidades(r:any){
    const ld=r.map((e:any)=>{
      return <option key={e.n_id_unidade} data-fabrica={e.n_id_fabrica} value={e.n_id_unidade}>{e.s_nome_unidade}</option>
    })
    ld.unshift(<option key="-1" value="-1"></option>)
    return ld;
  }

  return (
    <div className='flex gap-5'>
      <div className='flex flex-col gap-5 justify-start items-center p-3 bg-slate-100 border-2 border-gray-300 rounded-lg'>
        <label>Seleção de Etapas de Fabricação do Item</label>
        <div className='flex flex-col border gap-2 p-2 w-full'>
          <div className='campoForm'>
            <label>Fábricas</label>
            <select id="idfabrica" value={fabrica_idFabrica} onChange={(e) => {
              setIdFabrica(e.target.value)
            }}>
              {fabricaOptions}
            </select>
          </div>
          <div className='campoForm'>
            <label>Unidade</label>
            <select id="idunidade" value={unidade_idUnidade} onChange={(e) => setIdUnidade(e.target.value)}>
              {unidadeOptions}
            </select>
          </div>
          <div className='campoForm'>
            <label>Programa</label>
            <select id="idprograma" value={programa_idPrograma} onChange={(e) => setIdPrograma(e.target.value)}>
              {programaOptions}
            </select>
          </div>
          <button title="Clique aqui para adicionar uma nova etapa de fabricação ao item" className='btnPadrao flex self-end' onClick={() => addEtapa()}>Adicionar Etapa --&gt;</button>
        </div>
      </div>
      <div className='campoForm'>
        <div className='flex flex-col gap-5 justify-start items-center p-3 bg-slate-100 border-2 border-gray-300 rounded-lg'>
          <label>Etapas adicionadas</label>
          <EtapasAdicionadas linhasEtapas={linhasEtapas} />
        </div>
      </div>
    </div>
  );
}