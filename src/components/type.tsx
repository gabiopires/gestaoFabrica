export type TypeDataAlerta ={
    title: string;
    buttonTitle: string[];
    buttonAction: (()=>void)[];
    movItem?: boolean;
}