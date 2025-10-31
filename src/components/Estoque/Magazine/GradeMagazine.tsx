import Image from "next/image"
interface GradeProps {
    npedido: number
    nfoto: number
    mostraOpc:any
}

let ColocarFoto = (n: number) => {
    if (n == 0) {1
        return "/images/fundoBranco.png"
    } else if (n == 1) {
        return "/images/martelo-completo.png"

    } else if (n == 2) {
        return "/images/martelo-cabeca.png"

    } else if (n == 3) {
        return "/images/martelo-cabo.png"
    }else{
        return ""
    }
}

let ColocarEstilo = (n: number) => {
    if(n==0){
        return "max-w-[75%]"
    }else if (n==1){
        return "max-w-[33px]"
    } else if (n==3){
        return "max-w-[17px]"
    }
}


export default function GradeMagazine(props: GradeProps) {

    return (
        <div className="flex justify-center items-center w-[120px] h-[120px]">
            <div className="border border-black w-[95%] h-[95%]">
                <h1>Item n° {props.npedido}</h1>
                <hr />
                    <div className="flex justify-center items-center" onClick={()=>props.mostraOpc(props.nfoto,props.npedido)}>
                        <Image width={0} height={0} className={ColocarEstilo(props.nfoto)} src={ColocarFoto(props.nfoto)} alt="" />
                    </div>
            </div>
        </div >
    )
}