import BotaoOperLinhaGrid from "../BotaoOperLinhaGrid";

interface LinhaListaProps{
    dados:any;
    funcao:any;
    prioridade:number;
    mudarStatusAguardando:any;
    mudarStatusFila:any;
    mudarStatusProduzindo:any;
    mudarStatusFinalizado:any;
    mudarStatusBloqueado:any;
    finalizarPedido:any;
    mudarPrioridade:any;
}

function dataFormatada(data:any){
    const dt=new Date(data)
    const dia=dt.getDate()
    const mes=dt.getMonth()+1
    const ano=dt.getFullYear()
    return `${dia<10?'0'+dia:dia}/${mes<10?'0'+mes:mes}/${ano}`;
}

function statusPedido(status:number){
    let sp=null;
    if(status===1){
        sp="Aguardando"
    }else if(status===2){
        sp="Fila Produção"
    }else if(status===3){
        sp="Produzindo"
    }else if(status===4){
        sp="Finalizado"
    }else if(status===5){
        sp="Bloqueado"
    }
    return sp
}

function prioridadePedido(pri:number){
    let pp=null;
    if(pri===1){
        pp=`Master (1)`
    }else if(pri===2){
        pp="Prioridade (2)"
    }else if(pri===3){
        pp="Padrão (3)"
    }
    return pp
}

function corFundoLinha(status:any){
    let sp=null;
    if(status===2){
        sp="filaproducao"
    }else if(status===3){
        sp="produzindo"
    }else if(status===4){
        sp="finalizado"
    }else if(status===5){
        sp="bloqueado"
    }
    return sp
}

export default function LinhaListaPedido(props:LinhaListaProps){

    function iconePrioridade(){
        let icone="";
        if(props.prioridade==1){
            icone="/images/p1.svg"
        }else if(props.prioridade==2){
            icone="/images/p2.svg"
        }else if(props.prioridade==3){
            icone="/images/p3.svg"
        }
        return icone;
    }

    return (
        <div key={props.dados.n_id_pedido} className={"linhaGrid "+(corFundoLinha(props.dados.n_status_pedido))} data-status={props.dados.n_status_pedido}>
            <div className="c70">{props.dados.n_id_pedido}</div>
            <div className="c150">{dataFormatada(props.dados.dt_data_pedido)}</div>
            <div className="c150" data-status={props.dados.n_status_pedido}>{statusPedido(props.dados.n_status_pedido)}</div>
            <div className="c150">{prioridadePedido(props.prioridade)}</div>
            <div className="c200">{props.dados.s_nome_fabrica}</div>
            <div className="c100 ccol border-l border-r">
                <BotaoOperLinhaGrid title="Detalhes do Pedido" path="/detalhespedido/detalhespedido" funcao="" tipo="editar" icone="/images/info.svg" prio="" id={props.dados.n_id_pedido}/>
                <BotaoOperLinhaGrid title="Remover Pedido" path="" funcao={props.funcao} tipo="remover" icone="/images/delete.svg" prio="" id={props.dados.n_id_pedido}/>
            </div>
            <div className="c120 ccol border-r">
                <BotaoOperLinhaGrid title="Status Aguardar" path="" funcao={props.mudarStatusAguardando} tipo="status" icone="/images/hand.svg" prio="" id={props.dados.n_id_pedido}/>
                <BotaoOperLinhaGrid title="Enviar para Fila Produção" path="" funcao={props.mudarStatusFila} tipo="status" icone="/images/step.svg" prio="" id={props.dados.n_id_pedido}/>
                <BotaoOperLinhaGrid title="Bloquear pedido" path="" funcao={props.mudarStatusBloqueado} tipo="status" icone="/images/block.svg" prio="" id={props.dados.n_id_pedido}/>
                <BotaoOperLinhaGrid title="Forçar Finalizar pedido" path="" funcao={props.finalizarPedido} tipo="status" icone="/images/checkv2.svg" prio="" id={props.dados.n_id_pedido}/>
            </div>
            <div className="c100 ccol">
                <BotaoOperLinhaGrid title="Mudar Prioridade" path="" funcao={props.mudarPrioridade} tipo="status" icone={iconePrioridade()} prio={props.prioridade} id={props.dados.n_id_pedido}/>
            </div>            
        </div>
    );
}
  