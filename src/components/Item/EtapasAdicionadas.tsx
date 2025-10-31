interface EtapasAdicionadasProps{
    linhasEtapas:any;
}

export default function EtapasAdicionadas(props:EtapasAdicionadasProps){

    return (
        <div className="">
            <div>
                <div className="tituloGrid">
                    <div className="c250">Unidade</div>
                    <div className="c200">Programa</div>
                    <div className="c200">Fábrica</div>
                    <div className="c100 ccenter">Operações</div>
                </div>
                <div className="h-40 max-h-40 overflow-y-scroll border" id="etapas">
                    {props.linhasEtapas?props.linhasEtapas:""}
                </div>
            </div>
        </div>
    );
}
  