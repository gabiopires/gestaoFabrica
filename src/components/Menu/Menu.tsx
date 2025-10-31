import React, {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Globais from '../Configuracao/Globais';

export default function Menu(){   
    const [estadoMenu,setEstadoMenu]=useState<boolean>(false);
    const [subMenuProd,setSubMenuProd]=useState<boolean>(false);
    const divItens = useRef<HTMLDivElement>(null)

    const limparInterval=()=>{
        Globais.limparTodosIntervalos()
    }

    useEffect(()=>{
        scrollToMenuItem()
    },[subMenuProd])

    const scrollToMenuItem = () => {
        if (divItens.current) {
            divItens.current.scrollTo({ behavior: "smooth", top: divItens.current.scrollHeight });
        }
    }

    return(
        <div>
            <Image width={0} height={0} alt='' src="/images/menu.svg" className="iconeMenu" onClick={()=>{setEstadoMenu(!estadoMenu)}}/>
            <nav className={estadoMenu===true?'Menu MenuExibir':'Menu MenuOcultar'}>
                <div className={estadoMenu===true?"tituloMenu":"tituloMenu fechado"}>
                    {estadoMenu&&<h3>Menu</h3>}
                    <Image width={0} height={0} alt='' src="/images/menu_blue.svg" className={estadoMenu===true?"btn_fecharMenu":"btn_fecharMenuFechado"} onClick={()=>setEstadoMenu(!estadoMenu)}/>
                </div>
                <div className='overflow-auto' ref={divItens}>
                    {estadoMenu&&<Link href="/" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/home_blue.svg"/>
                        {estadoMenu&&<p>Home</p>}
                    </Link>}
                    <Link href="/fabrica/fabrica" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/factory_blue.svg"/>
                        {estadoMenu&&<p>Fábricas</p>}
                    </Link>
                    <Link href="/pessoa/pessoa" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/person_blue.svg"/>
                        {estadoMenu&&<p>Clientes</p>}
                    </Link>                
                    <Link href="/celula/celula" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/center_focus_blue.svg"/>
                        {estadoMenu&&<p>Células</p>}
                    </Link>
                    <Link href="/unidade/unidade" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/input_circle_blue.svg"/>
                        {estadoMenu&&<p>Unidades</p>}
                    </Link>
                    <Link href="/maquina/maquina" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/microwave_blue.svg"/>
                        {estadoMenu&&<p>Máquinas</p>}
                    </Link>
                    <Link href="/programa/programa" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/terminal_blue.svg"/>
                        {estadoMenu&&<p>Programas</p>}
                    </Link>
                    <Link href="/materiaprima/materiaprima" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/deployed_code_blue.svg"/>
                        {estadoMenu&&<p>Matérias Primas</p>}
                    </Link>                    
                    <Link href="/item/item" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/place_blue.svg"/>
                        {estadoMenu&&<p>Itens</p>}
                    </Link>                              
                    <Link href="/produto/produto" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/redeem_blue.svg"/>
                        {estadoMenu&&<p>Produtos</p>}
                    </Link>   
                    <Link href="/estoque/estoque" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/stock_blue.svg"/>
                        {estadoMenu&&<p>Estoque</p>}
                    </Link>             
                    <Link href="/pedido/pedido" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/list_blue.svg"/>
                        {estadoMenu&&<p>Pedidos ERP</p>}
                    </Link> 
                    <div className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{setSubMenuProd(!subMenuProd);setEstadoMenu(true);scrollToMenuItem()}}>
                        <Image width={0} height={0} alt='' src="/images/manufacturing_blue.svg"/>
                        {estadoMenu&&<p className='pManufac'>Produção MES</p>}
                        {estadoMenu && subMenuProd ?
                            <Image width={0} height={0} className='itemMenuImage' alt='' src="/images/arrow_up_blue.svg"/>
                        :estadoMenu && !subMenuProd &&
                            <Image width={0} height={0} className='itemMenuImage' alt='' src="/images/arrow_down_blue.svg"/>
                        }
                    </div>
                    {subMenuProd && estadoMenu &&(
                        <div>
                            <Link href="/producao/producao" className="itemSubMenu" onClick={()=>{limparInterval()}}>
                                <Image width={0} height={0} alt='' src="/images/manufacturing_blue.svg"/>
                                <p>Pedidos</p>
                            </Link>
                            <Link href="/producaoItem/producaoItem" className="itemSubMenu" onClick={()=>{limparInterval()}}>
                                <Image width={0} height={0} alt='' src="/images/manufacturing_blue.svg"/>
                                <p>Itens</p>
                            </Link>                                                                             
                        </div>                                               
                    )}
                    <Link href="/simulador/simulador" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/shopping_cart_blue.svg"/>
                        {estadoMenu&&<p>Simulador</p>}
                    </Link>                
                    <Link href="/sobre/sobre" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/chat_blue.svg"/>
                        {estadoMenu&&<p>Sobre</p>}
                    </Link> 
                    <Link href="/configuracao/configuracao" className={estadoMenu?"itemMenu":"itemMenuFechado"} onClick={()=>{limparInterval()}}>
                        <Image width={0} height={0} alt='' src="/images/settings_blue.svg"/>
                        {estadoMenu&&<p>Configuração</p>}
                    </Link> 
                </div>                                                                                                                                                                                                             
            </nav>
        </div>
    )
}