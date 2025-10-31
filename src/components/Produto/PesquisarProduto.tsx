interface PesquisarUnidadeProps{
    id:any;
    setId:any;
    f_pesquisar:any;
}

export default function PesquisarProduto(props:PesquisarUnidadeProps){

    function enterPesquisar(evt:any){
        if(evt.key==="Enter"){
            props.f_pesquisar()
        }
    }

    return(
        <div className='flex gap-2 w-96 border p-2 rounded-md justify-center items-center'>
            <div className='campoForm'>
                <label>Pesquisar por ID</label>
                <input type="text" value={props.id} onKeyUp={(evt)=>enterPesquisar(evt)} onChange={e=>props.setId(e.target.value)} placeholder="Digite o ID do produto que deseja pesquisar"></input>
            </div>   
            <button className='btnPadrao w-full h-[40px]' onClick={()=>props.f_pesquisar()}>Pesquisar</button>          
        </div>
    )
}