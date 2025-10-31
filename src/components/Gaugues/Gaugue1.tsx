import Image from "next/image"

interface GaugueProps{
    min:number,
    max:number,
    valor:any
}

export default function Gaugue_1(props:GaugueProps){
    function map(val:number,min:number,max:number){
        const min_in=min
        const max_in=max
        const min_out=0
        const max_out=180
        const ret=Math.floor((val - min_in)*(max_out-min_out)/(max_in-min_in)+min_out)
        console.log(`val:${val} | rot:${ret}`)
        return ret
    }

    function rot(r:number){
        const ret=`rotate-[${r}deg]`
        return ret
    }
    const ro:number=180
    return(
        <div className=''>
            <Image src="/images/gaugues/gaugue_1.svg" width={300} height={300} alt="Gaugue 1" id="g1" className='absolute'/>
            <Image src="/images/gaugues/ponteiro_1.svg" width={300} height={300} alt="Gaugue 1" id="g1" className={`absolute ${rot(map(props.valor,props.min,props.max))}`} style={anima}/>
            <div>{props.valor}</div>
        </div>
    )
}

const anima={
    transitionDuration:'1s',
    transitionTimingFunction:'linear'
}