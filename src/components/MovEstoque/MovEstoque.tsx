import React, {useState, useEffect} from 'react';
import Entrada from "./Entrada"
import Saida from "./Saida"

interface MovProps {
    set: (value: boolean) => void;
}

export default function MovEstoque(props: MovProps){

    const [type, setType] = useState("0");
    const [materialId, setMaterialId] = useState("");
    const [quantidade, SetQuantidade] = useState("");
    const [date, setDate] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [emailSolicitante, setEmailSolicitante] = useState("");
    const [status, setStatus] = useState("");
    const [acompanhante, setAcompanhante] = useState("");
    const [itemFabricado, setItemFabricado] = useState("");
    const [itemData, setItemData] = useState<{id: number, nome: string, qtd: number}[]>([]);
    const [materialData, setMaterialData] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto: string, qtdPreparado: string}[]>([]);
    const [materialStatus, setMaterialStatus] = useState<{id: string, tabela: string, nome: string, qtd: string, qtdBruto?: string, qtdPreparado?: string}[]>([]);
    const [pessoas, setPessas] = useState<{id: number, nome: string}[]>([]);
    const [seeEntrada, setSeeEntrada] = useState(true);
    const [seeSaida, setSeeSaida] = useState(false);
    const [seeItems, setSeeItems] = useState(false);

    useEffect(()=>{
        carregarMateriais()
    },[])

    async function carregarMateriais(){
        // const k = JSON.parse(data).key;
        // const key = k.s_key_apiKey
        try {
            const endpoint = `/api/apiEstoque?action=getMovEstoque`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if (response.status === 200) {
                const returnDataApi = await response.json()
                setItemData(returnDataApi.item)

                const tmpMaterialData = [...materialData];
                const tmpStatus = [...materialStatus]

                returnDataApi.bruto.map((a: any)=>{
                    tmpMaterialData.push(a)
                    tmpStatus.push(a)
                })

                returnDataApi.item.map((b: any)=>{
                    tmpMaterialData.push(b)
                })

                returnDataApi.produto.map((c: any)=>{
                    tmpMaterialData.push(c)
                })

                setMaterialData(tmpMaterialData);
                setMaterialStatus(tmpStatus);

                setPessas(returnDataApi.pessoas)
            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    function confirmData(){
        if(materialId == ""){
            alert("Informe um material");
        }else if(quantidade == "" || quantidade <= "0"){
            alert("Informe uma quantidade valida");
        }else if(date == ""){
            alert("Informe a data");
        }else if(type == "1" && solicitante == ""){
            alert("Informe o nome do solicitante");
        }else if(type == "1" && emailSolicitante == ""){
            alert("Informe o e-mail do solicitante");
        }else if(type == "2" && status == ""){
            alert("Informe o status que o material vai ser movimentado");
        }else if(type == "2" && acompanhante == ""){
            alert("Informe quem acompanhou a parodução");
        }else{
            FiltrarFunção()
        }
    }

    function FiltrarFunção(){
        let tabela, materialNovoStatus, qtdAnterior, qtdAnteriorBruto, qtdAnteriorPreparado;
        materialData.map((a)=>{
            //pegando as informações de tabela e qtd anteriores do material
            if(materialId == a.id){
                tabela = a.tabela;
                //se a tabela for igual a 0 quer dizer que é um material bruto ou preparado, então precisamos
                // saber a informação da qtd anterior bruta ou preparado
                if(tabela == "0"){
                    qtdAnteriorBruto = a.qtdBruto;
                    qtdAnteriorPreparado = a.qtdPreparado;
                }else{
                    qtdAnterior = a.qtd;
                }
            }

            //pegando as informações do item se a pessoa está mov. o status de um item preparado para item produzido
            if(itemFabricado != "" && itemFabricado == a.id){
                qtdAnterior = a.qtd;
                materialNovoStatus = a.id;
            }
        })

        if(tabela == "2" && type == "0"){
            //se for um produto pronto, vai buscar todos os itens do produto para descontar a qtd de itens utilizados
            getProdutoItemData(tabela, qtdAnterior);
        }else if(type == "0"){ 
            EntradaMaterial(tabela, qtdAnterior, materialId);
        }else if(type == "1"){
            SaidaMaterial(tabela, qtdAnterior, materialId);
        }else if(type == "2"){
            MovMaterial(tabela, materialId, qtdAnterior, qtdAnteriorPreparado, qtdAnteriorBruto);
        }
    }

    async function getProdutoItemData(tabela: any, qtdAnterior: any){
        try {
            const endpoint = `/api/apiEstoque?action=getProduto_item&data=${materialId}`
            const response = await fetch(endpoint, { cache: "reload", method: "GET" })
            if(response.status === 200){
                const returnDataApi = await response.json();

                //valida o estoque dos items do produto
                let validarEstoque = true;
                returnDataApi.dataReturn.map((a: {n_id_item:number, n_qtde_item:number})=>{
                    if(a.n_qtde_item <= 0 || a.n_qtde_item < Number(quantidade)){
                        validarEstoque = false;
                    }
                })
                //Se tiver estoque, vai ser decontado a qtd necessaria para cada item
                if(validarEstoque == true){
                    returnDataApi.dataReturn.map((a: {n_id_item:number, n_qtde_item:number})=>{
                        if(a.n_qtde_item >= 0){
                            SaidaItemProduto(a.n_qtde_item - qtdAnterior, a.n_id_item)
                        }
                    })
                    // adicionar a quantidade no produto final
                    EntradaMaterial(tabela, qtdAnterior, materialId); 
                }else{
                    alert("Estoque insuficiente para o produto");
                }
            }else{
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    //função para descontar 1 unidade de cada item do produto
    async function SaidaItemProduto(qtd: number, materialId: number){
        try {
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: materialId,
                    qtd: qtd,
                    tabela: "1",
                    action: "movSaida"
                })
            })
            if (response.status === 200) {
                const returnDataApi = await response.json()
            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    async function EntradaMaterial(tabela: any, qtdAnterior: any, materialId: string){
        const qtd = Number(quantidade) + Number(qtdAnterior);
        console.log(qtdAnterior)
        try{
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: materialId,
                    qtd: qtd,
                    date: date,
                    fornecedor: fornecedor,
                    tabela: tabela,
                    action: "movEntrada"
                })
            })
            if(response.status === 200) {
                const returnDataApi = await response.json();
            }else{
                console.error(`Error ${response.status}`)
            }
        }catch(error){
            console.error("Error fetching data:", error)
        }
    }

    async function SaidaMaterial(tabela: any, qtdAnterior: any, materialId: string){
        const qtd = Number(qtdAnterior) - Number(quantidade);
        try{
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    material: materialId,
                    qtd: qtd,
                    date: date,
                    tabela: tabela,
                    action: "movSaida"
                })
            })
            if(response.status === 200) {
                const returnDataApi = await response.json();
                alert("Produto descontado com sucesso!");
                props.set(false);
            }else{
                console.error(`Error ${response.status}`)
            }
        }catch(error){
            console.error("Error fetching data:", error)
        }
    }

    async function MovMaterial(tabela: any, materialId: string, qtdAnterior: any, qtdAnteriorPreparado: any, qtdAnteriorBruto: any){
        let qtd, qtdStatus = -1;
        if(status == "0" && !(qtdAnteriorBruto <= 0)){

            qtdStatus = Number(qtdAnteriorPreparado) + Number(quantidade);
            qtd = Number(qtdAnteriorBruto) - Number(quantidade);

        }else if(status == "1" && !(qtdAnteriorBruto <= 0)){

            qtdStatus = Number(qtdAnterior) + Number(quantidade);
            qtd = Number(qtdAnteriorPreparado) - Number(quantidade);

        }
    }

    async function SaveData(tabela: any, materialNovoStatus: any, qtdAnterior: any, qtdAnteriorBruto: any, qtdAnteriorPreparado: any){
        try {
            const endpoint = `/api/apiEstoque`
            const response = await fetch(endpoint, { 
                cache: "reload", 
                headers:{'Content-Type':'application/json'},
                method: "PUT",
                // body: JSON.stringify({
                //     material: materialId,
                //     qtd: qtd,
                //     qtdStatus: qtdStatus,
                //     date: date,
                //     fornecedor: fornecedor,
                //     solicitante: solicitante,
                //     emailSolicitante: emailSolicitante,
                //     status: status,
                //     acompanhante: acompanhante,
                //     pessoas: pessoas,
                //     tabela: tabela,
                //     materialNovoStatus: materialNovoStatus,
                //     action: action
                // })
            })
            if (response.status === 200) {
                const returnDataApi = await response.json()

            } else {
                console.error(`Error ${response.status}`)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
        props.set(false);
    }

    function selecionarMov(type: string){
        if(type == '0'){
            setSeeEntrada(true);
            setSeeSaida(false);
            setSeeItems(false);
            setType('0');
        }else if (type == '1'){
            setSeeSaida(true);
            setSeeEntrada(false);
            setSeeItems(false);
            setType('1');
        }else{
            setSeeEntrada(false);
            setSeeSaida(false);
            setSeeItems(true);
            setType('2');
        }
    }

    return(
        <div className='fixed z-[200] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
            <div className='h-[80%] md:w-[60%] w-[90%] bg-white rounded-xl flex flex-col'>
                <div className='w-[100%] bg-[#1394DA] h-[10%] rounded-t-xl flex items-center justify-between'>
                    <p className='md:ml-10 ml-5 text-xl text-white'>Movimentar estoque</p>
                    <p onClick={()=>props.set(false)} className='text-xl text-white md:mr-10 mr-5 cursor-pointer'>X</p>
                </div>
                <div className='w-[100%] h-[90%] rounded-b-xl md:pl-5 pl-2 md:pr-5 pr-2 flex flex-col gap-4'>
                    <div className='w-[100%] h-[25%] flex flex-col justify-end gap-2 pl-2'>
                        <p className='text-sm'>Tipo de movimentação</p>
                        <select className='md:w-[45%] border-2 rounded-xl p-1 text-sm' value={type} onChange={(evt)=>{selecionarMov(evt.target.value)}}>
                            <option value="0">Entrada de produto pronto/materia prima</option>
                            <option value="1">Saida de produto pronto/materia prima</option>
                            <option value="2">Gerenciar items produzidos</option>
                        </select>
                    </div>
                    <div className='border-2 w-[100%] h-[75%] mb-5 rounded-xl flex md:flex-col flex-wrap md:flex-nowrap overflow-auto overflow-x-hidden gap-5 pb-5'>
                        {type == "0" ?
                            <>{seeEntrada&&<Entrada onAction={()=>props.set(false)}/>}</>
                        : type == "1" ? 
                            <>{seeSaida&&<Saida onAction={()=>props.set(false)}/>}</>
                        : 
                            ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}