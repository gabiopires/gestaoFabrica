abstract class Globais {
    public static Estoque_Magazine: Array<any> = [];
    public static teste: any = null;
    public static idProd: number = 0;
    public static idFoto: number = 0;

    static intervaloGlobal:any=null
    static intervaloProducao:any=null
    static intervaloPedidos:any=null
    static intervaloEstoqueProducao:any=null
    static tempoRequisicao:number=5000
    static idfabrica:any=""
    static nomefabrica:any=""

    static limparTodosIntervalos=()=>{
        if(this.intervaloGlobal){
            clearInterval(this.intervaloGlobal)
            clearTimeout(this.intervaloGlobal)
        }
        if(this.intervaloProducao){
            clearInterval(this.intervaloProducao)
            clearTimeout(this.intervaloProducao)
        }
        if(this.intervaloPedidos){
            clearInterval(this.intervaloPedidos)
            clearTimeout(this.intervaloPedidos)
        }
        if(this.intervaloEstoqueProducao){
            clearInterval(this.intervaloEstoqueProducao)
            clearTimeout(this.intervaloEstoqueProducao)
        }
    }
}

export default Globais