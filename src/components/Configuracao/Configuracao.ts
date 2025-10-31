export default abstract class Configuracao{
    // private static serv='http://172.25.10.7:1880/';
    private static serv='http://localhost:1880/';
    //private static serv='http://129.148.24.214:1880/';
    //public static serv:string='http://127.0.0.1:1880/';
    public static fabrica:any='1';
    public static nomefabrica:any='Centro 4.0';
    public static tmpUpdateProducao:any=10000;
    public static tmpUpdatePedidos:any=10000;
    public static tmpUpdatePedidosItens:any=10000;

    public static versao:any='1.3.2.2';
    public static versaoNovoProduto:any=this.versao+'.'+'1';
    public static versaoPedidoERP:any=this.versao+'.'+'1';
    public static versaoProducaoPedidoMES:any=this.versao+'.'+'1';
    public static versaoProducaoItem:any=this.versao+'.'+'2';

    static get servidor():string{
        return this.serv
    }
}

// export default Configuracao