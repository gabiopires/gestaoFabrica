interface LoadProps{}
import Image from "next/image";

export default function Loading(props:LoadProps){
    return (
        <div className=" flex w-full h-full absolute left-0 top-0 z-auto justify-center items-center">
            <Image width={0} height={0} alt='' className="w-[100px] opacity-75" src='/images/loading.gif'/>
        </div>
    );
}
  