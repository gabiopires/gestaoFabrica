interface MateriasPrimasAdicionadasProps{
    listaMateriasPrimas:any;
    setModalAddMateriaPrima:any;
}

export default function MateriasPrimasAdicionadas(props:MateriasPrimasAdicionadasProps){

    return (
        <div className="">
            <div>
                <div className="tituloGrid">
                    <div className="c1_materiasprimasadicionadas" title="ID Matéria Prima">ID</div>
                    <div className="c2_materiasprimasadicionadas" title="Nome Matéria Prima">Matéria Prima</div>
                    <div className="c3_materiasprimasadicionadas" title="Quantidade de Matéria Prima">Quantidade</div>
                    <div className="c4_materiasprimasadicionadas" title="Unidade de Medida">Un.Medida</div>
                    <div className="c5_materiasprimasadicionadas" title="Clique aqui para Adicionar uma Matéria Prima">
                        <button className="bg-slate-500 p-1 rounded-md" onClick={()=>{props.setModalAddMateriaPrima(true)}}>Adicionar</button>
                    </div>
                </div>
                <div className="overflow-y-scroll border" id="mp">
                    {props.listaMateriasPrimas?props.listaMateriasPrimas:""}
                </div>
            </div>
        </div>
    );
}
  