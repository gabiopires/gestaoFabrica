interface PesquisarUnidadeProps{
    id:any;
    setId:any;
    f_pesquisar:any;
}

export default function PesquisarPrograma(props:PesquisarUnidadeProps){

    function enterPesquisar(evt:any){
        if(evt.key==="Enter"){
            props.f_pesquisar()
        }
    }

    return(
        <div className='flex flex-col gap-2 w-96 border p-2 rounded-md'>
            <div className='campoForm'>
                <label>Pesquisar por ID</label>
                <input type="text" value={props.id} onKeyUp={(evt)=>enterPesquisar(evt)} onChange={e=>props.setId(e.target.value)} placeholder="Digite o ID do programa que deseja pesquisar"></input>
          </div>   
          <button className='btnPadrao w-full' onClick={()=>props.f_pesquisar()}>Pesquisar</button>          
        </div>
    )
}