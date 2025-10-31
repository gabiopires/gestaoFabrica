import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import PesquisarItem from '@/components/Item/PesquisarItem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Configuracao from '@/components/Configuracao/Configuracao';
import EditarEtapas from '@/components/Item/EditarEtapas';

const servidor = Configuracao.servidor;
let dadosLinhaItem: any[] = []
let idadosLinhaItem: number = 0;
let dadosLinhaMp: any[] = []
let idadosLinhaMp: number = 0;

export default function PaginaEditarItem() {
  const router = useRouter();
  const idEditar = router.query.idEditar;

  const [idPesquisa, setIdPesquisa] = useState<string>("");
  const [n_id_item, setIdItem] = useState<string>("")
  const [s_nome_item, setSNomeItem] = useState<string>("")
  const [desc_item, setDescItem] = useState<string>("")
  const [programasItens, setProgramasItens] = useState<any[]>([])

  useEffect(() => {
    if (idEditar) {
      const endpoint = `${servidor}item/${idEditar}`
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          setIdItem(res[0].n_id_item)
          setSNomeItem(res[0].s_nome_item)
          setDescItem(res[0].s_desc_item)
          carregarProgramas()
          dadosLinhaItem = []
          idadosLinhaItem = 0
          dadosLinhaMp = []
          idadosLinhaMp = 0;
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function limparCampos() {
    setIdPesquisa("")
    setIdItem("")
    setSNomeItem("")
    setDescItem("")
  }

  function pesquisar() {
    if (idPesquisa === "") {
      alert("Informe o ID do Item que deseja pesquisar")
      limparCampos()
      return
    }
    const endpoint = `${servidor}item/${idPesquisa}`
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        if (res[0]) {
          setIdItem(res[0].n_id_item)
          setSNomeItem(res[0].s_nome_item)
          setDescItem(res[0].s_desc_item)
        } else {
          alert(`Nenhum Item encontrado com o ID: ${idPesquisa}`)
          limparCampos()
        }
        console.log(res)
      })
  }

  function gravar() {
    if (s_nome_item === "") {
      alert("Digite o nome do Item")
      document.getElementById("nomeItem")?.focus()
      return
    }
    if (desc_item === "") {
      alert("Digite a descrição do Item")
      document.getElementById("descItem")?.focus()
      return
    }

    const endpoint = `${servidor}item`
    const dados = {
      n_id_produto: n_id_item,
      s_nome_item: s_nome_item,
      s_desc_item: desc_item,
    }
    const cabecalho = {
      method: "POST",
      body: JSON.stringify(dados)
    }
    fetch(endpoint, cabecalho)
      .then(res => {
        if (res.status == 200) {
          alert("Dados alterados com sucesso!")
        } else {
          alert("ERRO")
        }
      })
  }

  function cancelar() {
    if (n_id_item != "") {
      const endpoint = `${servidor}item/${n_id_item}`
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          if (res[0]) {
            setIdItem(res[0].n_id_item)
            setSNomeItem(res[0].s_nome_item)
            setDescItem(res[0].s_desc_item)
          }
        })
    }
  }

  function carregarProgramas() {
    const endpoint = `${servidor}item`
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        setProgramasItens(listProgramas(res))
      })
  }

  function listProgramas(p: any) {
    return p.map((e: any) => {
      let pr = e.n_id_item
      return pr;
    })
  }


  return (
    <div>
      <Topo />
      <div className='flex flex-col gap-5 justify-start items-center p-5'>
        <div className='versaoTela'>Versão da Tela: {Configuracao.versao}.1</div>
        <div className='flex gap-5 justify-around '>
          <BotaoVoltar txt="Itens" caminho="/item/item" />
          <BotaoVoltar txt="Lista Itens" caminho="/item/listaItens" />
        </div>
        <h1>Editar Item</h1>

        <div className='flex flex-row gap-5 justify-start items-start p-0'>
          <div className='flex flex-col gap-5 justify-start items-center p-3 bg-slate-100 border-2 border-gray-300 rounded-lg'>
            <label>Nome e Descrição do Item</label>
            <PesquisarItem id={idPesquisa} setId={setIdPesquisa} f_pesquisar={pesquisar} />
            <div className='flex flex-col gap-5 w-96'>
              <div className='campoForm'>
                <label>ID Item</label>
                <input type="text" readOnly className='cursor-not-allowed' value={n_id_item} onChange={e => setIdItem(e.target.value)}></input>
              </div>
              <div className='campoForm'>
                <label>Nome do Item</label>
                <input type="text" id="nomeItem" value={s_nome_item} onChange={(e) => setSNomeItem(e.target.value)}></input>
              </div>
              <div className='campoForm'>
                <label>Descrição do Item</label>
                <textarea rows={4} id="descItem" value={desc_item} onChange={(e) => setDescItem(e.target.value)}></textarea>
              </div>
            </div>
          </div>

          <EditarEtapas itens={programasItens} IDatual={n_id_item} />
        </div>

        <div className='flex gap-5 justify-center items-center p-5'>
          <button className='btnPadrao' onClick={() => gravar()}>Gravar</button>
          <button className='btnPadrao' /*onClick={() => cancelar()}*/>Cancelar</button>
      </div>
      </div>
    </div>
  );
}

