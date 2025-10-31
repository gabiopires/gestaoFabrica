import Link from 'next/link';
import Menu from '../Menu/Menu';
import Configuracao from '../Configuracao/Configuracao';
import Image from 'next/image';
import { useEffect } from 'react';

function Topo(){

    useEffect(()=>{
        document.title = `Fábrica 4.0 - v${Configuracao.versao}`;
        Configuracao.nomefabrica=localStorage.getItem("nomefabrica")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <div className="Topo">
            <Menu/>
            <div className='logoContent'>
                <Image width={230} height={30} alt='' src="/images/logo_v3.png" className="Logo"/>
                <p className='flex text-xs w-full justify-center items-center'>{Configuracao.nomefabrica} - v{Configuracao.versao}</p>
            </div>
            {/* <Link href="/configuracao/configuracao" className="IconeTopo">
                <Image width={0} height={0} alt='' src="/images/config.svg" className='IconeTopo'/>
            </Link> */}
        </div>
    );
}

export default Topo;