import { useState } from "react"
import Globais from "@/components/Configuracao/Globais";
import Image from "next/image";

interface magPropsE {
    ocultarJanela: any;
    idProd: number;
    idFoto: number;
}

export default function MagPopUp(props: magPropsE) {
    const nProd: any = props.idProd
    const nFoto: any = props.idFoto
    const [opcaoP, setopcaoP] = useState<string>("")

    function StorageID() {
        let prodId: Array<any> = Globais.Estoque_Magazine;
        return prodId
    }

    function mudarFoto() {
        if (opcaoP == "0") {
            return "/images/fundoBranco.png"
        } if (opcaoP == "1") {
            return "/images/martelo-completo.png"
        } if (opcaoP == "2") {
            return "/images/martelo-cabeca.png"
        } if (opcaoP == "3") {
            return "/images/martelo-cabo.png"
        }else{
            return ""
        }
    }

    function GravarDados() {
        let prodId = StorageID()
        let num = parseInt(nProd, 10)
        let num2 = parseInt(opcaoP)
        prodId[num].produto = num2
        Globais.Estoque_Magazine = prodId
    }

    return (
        <div>
            <div className="popupFundo" onClick={() => { }}>
                <div className="popupBase w-[70%]">
                    <div className="popupTitulo">Editar Item n° {nProd}</div>
                    <div className="popupPrincipal">
                        <div className="w-[100%]">
                            <div className='flex flex-col gap-5'>
                                <div className='campoForm'>
                                    <div className="flex w-l[100%]">
                                        <label className="mr-5">Selecione a peça:  </label>
                                        <select name="select" id="selectPeca" value={opcaoP} onChange={(e) => setopcaoP(e.target.value)}>
                                            <option value="0" selected> </option>
                                            <option value="1">Martelo Completo</option>
                                            <option value="2">Cabeça do Martelo</option>
                                            <option value="3">Corpo do Martelo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Image width={0} height={0} className="border border-black w-[35%] max-w-[250px] h-[35%] max-h-[250px]" src={mudarFoto()} alt="" />
                                </div>
                                <div className='campoForm'>
                                    <div className="flex w-[100%]">
                                        <label className="mr-5">Nome do Item:</label>
                                        <h1>Cabeça de martelo</h1>
                                    </div>
                                </div>
                                <div className='campoForm'>
                                    <div className="flex w-[100%]">
                                        <label className="mr-5">Descrição do Item</label>
                                        <h1>Martelo que não pode martelar </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popupRodape">
                        <button title="Editar Item" className='btnPadrao' onClick={() => { GravarDados(), props.ocultarJanela(false) }}>Adicionar</button>
                        <button title="Fechar Janela" className='btnPadrao' onClick={() => { props.ocultarJanela(false) }}>Fechar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

