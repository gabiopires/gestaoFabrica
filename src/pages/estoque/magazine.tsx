import Topo from '@/components/Topo/Topo';
import GradeMagazine from '@/components/Estoque/Magazine/GradeMagazine';
import Configuracao from '@/components/Configuracao/Configuracao';
import { useEffect, useState } from 'react';
import MagPopUp from './opcaoMagazine';
import Globais from '@/components/Configuracao/Globais';
import { Transition } from '@headlessui/react'
import BotaoVoltar from '@/components/BotaoVoltar';
import Image from 'next/image';

const servidor = Configuracao.servidor

function PegarEstoque() {
    console.log(Globais.Estoque_Magazine)
    if (Globais.Estoque_Magazine.length == 0) {
        console.log("Array vazio")
        for (let i = 0; i <= 60; i++) {
            Globais.Estoque_Magazine[i] = {
                id: i,
                produto: 0
            };
        }
    }
    console.log("Array já preenchido")
}

function GravarEstoque() {
    if (!Globais.Estoque_Magazine) {
        return "Valor não encontrado"
    } else {
        return Globais.Estoque_Magazine
    }
}

export default function PaginaMagazine() {
    const [opcMag, mudaStateOpc] = useState(false)

    useEffect(() => {
        PegarEstoque()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let idFoto = Globais.idFoto;
    let idItem = Globais.idProd;
    let vp: any = GravarEstoque()
    console.log(vp)
    console.log(idFoto)

    function f_mudaStateOpc(valor1:any, valor2:any) {
        Globais.idFoto = valor1;
        Globais.idProd = valor2;
        console.log(valor2 + ", " + valor1)
        mudaStateOpc(!opcMag)
    }

    function getProdutos(n:any) {
        let valor = Globais.Estoque_Magazine
        if (valor.length > 0) {
            return valor[n].produto
        } else {
            console.log("Error")
            PegarEstoque()
            //setTimeout(getProdutos(n), 1000)
        }
    }

    return (
        <div>
            {opcMag && (
                <Transition
                    show={opcMag}
                    enter="transition-opacity duration-0"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-0"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <MagPopUp idFoto={Globais.idFoto} idProd={Globais.idProd} ocultarJanela={mudaStateOpc} />
                </Transition>
            )}
            <Topo />
            <div className='flex'>
                <div className='w-[100px]'>
                    <BotaoVoltar txt="Voltar" caminho="/estoque/estoque" />
                </div>
                <div className='flex justify-center items-center w-[100%]'><Image width={0} height={0} alt='' className='iconeTitulo' src="/images/magazine.svg" />
                    <h1 className='text-3xl'>Magazine</h1>
                </div>
            </div>
            <div className='flex justify-center items-center flex-wrap'>
                <div className='flex flex-col justify-center items-center'>
                    <h1>Lado 1</h1>
                    <div className='border border-black m-2'>
                        <div className='te1'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={1} nfoto={getProdutos(1)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={2} nfoto={getProdutos(2)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={3} nfoto={getProdutos(3)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={4} nfoto={getProdutos(4)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={5} nfoto={getProdutos(5)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={6} nfoto={getProdutos(6)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={7} nfoto={getProdutos(7)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={8} nfoto={getProdutos(8)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={9} nfoto={getProdutos(9)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={10} nfoto={getProdutos(10)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={11} nfoto={getProdutos(11)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={12} nfoto={getProdutos(12)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={13} nfoto={getProdutos(13)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={14} nfoto={getProdutos(14)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={15} nfoto={getProdutos(15)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={16} nfoto={getProdutos(16)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={17} nfoto={getProdutos(17)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={18} nfoto={getProdutos(18)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={19} nfoto={getProdutos(19)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={20} nfoto={getProdutos(20)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={21} nfoto={getProdutos(21)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={22} nfoto={getProdutos(22)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={23} nfoto={getProdutos(23)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={24} nfoto={getProdutos(24)} />
                        </div>
                        <div className='te3'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={25} nfoto={getProdutos(25)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={26} nfoto={getProdutos(26)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={27} nfoto={getProdutos(27)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={28} nfoto={getProdutos(28)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={29} nfoto={getProdutos(29)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={30} nfoto={getProdutos(30)} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1>Lado 2</h1>
                    <div className='border border-black m-2'>
                        <div className='te1'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={31} nfoto={getProdutos(31)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={32} nfoto={getProdutos(32)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={33} nfoto={getProdutos(33)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={34} nfoto={getProdutos(34)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={35} nfoto={getProdutos(35)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={36} nfoto={getProdutos(36)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={37} nfoto={getProdutos(37)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={38} nfoto={getProdutos(38)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={39} nfoto={getProdutos(39)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={40} nfoto={getProdutos(40)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={41} nfoto={getProdutos(41)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={42} nfoto={getProdutos(42)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={43} nfoto={getProdutos(43)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={44} nfoto={getProdutos(44)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={45} nfoto={getProdutos(45)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={46} nfoto={getProdutos(46)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={47} nfoto={getProdutos(47)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={48} nfoto={getProdutos(48)} />
                        </div>
                        <div className='te2'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={49} nfoto={getProdutos(49)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={50} nfoto={getProdutos(50)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={51} nfoto={getProdutos(51)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={52} nfoto={getProdutos(52)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={53} nfoto={getProdutos(53)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={54} nfoto={getProdutos(54)} />
                        </div>
                        <div className='te3'>
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={55} nfoto={getProdutos(55)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={56} nfoto={getProdutos(56)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={57} nfoto={getProdutos(57)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={58} nfoto={getProdutos(58)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={59} nfoto={getProdutos(59)} />
                            <GradeMagazine mostraOpc={f_mudaStateOpc} npedido={60} nfoto={getProdutos(60)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}