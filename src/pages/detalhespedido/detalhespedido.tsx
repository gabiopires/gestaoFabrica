import Topo from '@/components/Topo/Topo';
import BotaoVoltar from '@/components/BotaoVoltar';
import LinhaDetalhesPedido from '@/components/DetalhesPedido/LinhaDetalhesPedido';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Configuracao from '@/components/Configuracao/Configuracao';

const servidor = Configuracao.servidor;

interface PaginaProps {

}

function CriarLinhas(l: any) {
  const id = l[0].produtos.map((p: any) => {
    return <LinhaDetalhesPedido dados={p} key={Math.random()*999999999999999999}/>
  })
  return id;
}

export default function Paginadetalhespedido(props: PaginaProps) {
  const router = useRouter();
  const pidPedido = router.query.idEditar;

  const [linhas, setLinhas] = useState<any>(null)
  const [n_id_pedido, setIdPedido] = useState<string>("")
  const [n_id_pedidoProduto, setpedidoProduto] = useState<string>("")
  const [n_id_pessoa, setIdPessoa] = useState<string>("")
  const [s_nome_pessoa, setNomePessoa] = useState<string>("")
  const [dt_data_pedido, setDataPedido] = useState<string>("")
  const [n_status_pedido, setStatusPedido] = useState<string>("")
  const [s_descStatus_pedido, setDescStatusPedido] = useState<string>("")
  const [n_prioridade_pedido, setPrioridadePedido] = useState<string>("")
  const [s_descPrioridade_pedido, setDescPrioridadePedido] = useState<string>("")
  const [produtosPedido, setProdutosPedido] = useState<any[]>([])

  useEffect(() => {
    carregarDados(pidPedido)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function carregarDados(pidPedido: any) {
    const endpoint = `${servidor}obterdadospedido/${pidPedido}`
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setIdPedido(res[0].n_id_pedido)
        setIdPessoa(res[0].n_id_pessoa)
        setpedidoProduto(res[0].n_id_pedido)
        setNomePessoa(res[0].s_nome_pessoa)
        setDataPedido(FormatarData(res[0].dt_data_pedido))
        setStatusPedido(res[0].n_status_pedido)
        setDescStatusPedido(res[0].s_desc_statuspedido)
        setPrioridadePedido(res[0].n_prioridade_pedido)
        setDescPrioridadePedido(res[0].s_desc_prioridadepedido)
        setProdutosPedido(res[0].produtos)
        setLinhas(CriarLinhas(res))
      })
      .finally(() => {
      }
      )
  }

  function FormatarData(data: string) {
    let d1 = data.split("T")
    let d2 = d1[0].split("-")
    let d3 = d1[1].split(":")
    let d4 = d2[2] + "/" + d2[1] + "/" + d2[0] + " às " + d3[0] + ":" + d3[1] || data
    return d4;
  }

  return (
    <div>
      <Topo />
      <div className='flex flex-col justify-center items-center p-5'>
        <BotaoVoltar txt="Pedidos" caminho="/pedido/pedido" />
        <div><h1>Detalhes do Pedido</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <div>
            <div className="tituloGrid">
              <div className="c1_detalhesPedido_produto">N° Pedido</div>
              <div className="c2_detalhesPedido_produto">Pessoa</div>
              <div className="c3_detalhesPedido_produto">Data Pedido</div>
              <div className="c4_detalhesPedido_produto">Status Pedido</div>
              <div className="c5_detalhesPedido_produto">Prioridade Pedido</div>
            </div>
            <div>
              <div className='linhaGrid' key={Math.random() * 9999999999999999999}>
                <div className='c1_detalhesPedido_produto'>{n_id_pedido}</div>
                <div className='c2_detalhesPedido_produto'>{s_nome_pessoa}</div>
                <div className='c3_detalhesPedido_produto'>{dt_data_pedido}</div>
                <div className='c4_detalhesPedido_produto'>{s_descStatus_pedido}</div>
                <div className='c5_detalhesPedido_produto'>{s_descPrioridade_pedido}</div>
              </div>
            </div>
          </div>
        </div>
        <div><h1>Detalhes dos Produtos</h1></div>
        <div className='flex gap-5 justify-center items-center p-5'>
          <div>
            <div className="tituloGrid">
              <div className="c1_detalhesPedido_produto">N° Pedido</div>
              <div className="c1_detalhesPedido_produto">ID Produto</div>
              <div className="c2_detalhesPedido_produto">Nome Produto</div>
              <div className="c3_detalhesPedido_produto">Status Produto</div>
              <div className="c4_detalhesPedido_produto">Origem Fabrica</div>
              <div className="c5_detalhesPedido_produto">Ações</div>
            </div>
            <div>
              {linhas ? linhas : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
