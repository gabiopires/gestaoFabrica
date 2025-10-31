import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../components/db";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if(req.method === "GET") {
        const{
            action,
            data
        }=req.query;

        if(action=="getInitData"){
            try{
                const connection = await pool.getConnection();
                let query=`
                    SELECT n_id_materiaprima AS id, s_nome_materiaprima AS nome, n_qtde_materiaprimaBruto AS qtdBruto, n_qtde_materiaprimaPreparado AS qtdPreparado FROM materiaprima;
                `
                const [rowsBruto] = await connection.query<RowDataPacket[]>(query,[]);

                query=`
                    SELECT n_id_item AS id, s_nome_item AS nome, n_qtde_item AS qtd FROM item;
                `
                const [rowsItem] = await connection.query<RowDataPacket[]>(query,[]);

                query=`
                    SELECT n_id_produto AS id, s_nome_produto AS nome, n_qtd_estoque AS qtd FROM produto;
                `
                const [rowsProduto] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    bruto: rowsBruto,
                    item: rowsItem,
                    produto: rowsProduto
                }

                return res.status(200).json(dataReturn);
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else if(action=="getMovEstoque"){
            try{
                const connection = await pool.getConnection();
                let query=`
                    SELECT n_id_materiaprima AS id, s_nome_materiaprima AS nome, n_qtde_materiaprimaBruto AS qtdBruto, n_qtde_materiaprimaPreparado AS qtdPreparado, 0 AS tabela FROM materiaprima;
                `
                const [rowsBruto] = await connection.query<RowDataPacket[]>(query,[]);

                query=`
                    SELECT n_id_item AS id, s_nome_item AS nome, n_qtde_item AS qtd, 1 AS tabela FROM item;
                `
                const [rowsItem] = await connection.query<RowDataPacket[]>(query,[]);

                query=`
                    SELECT n_id_produto AS id, s_nome_produto AS nome, n_qtd_estoque AS qtd, 2 AS tabela FROM produto;
                `
                const [rowsProduto] = await connection.query<RowDataPacket[]>(query,[]);

                query=`
                    SELECT n_id_pessoa AS id, s_nome_pessoa AS nome FROM pessoa WHERE s_nome_pessoa != "";
                `
                const [rowsPessoas] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    bruto: rowsBruto,
                    item: rowsItem,
                    produto: rowsProduto,
                    pessoas: rowsPessoas
                }

                return res.status(200).json(dataReturn);
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else{
            res.status(400).json('Bad Request');
        }
    }else if (req.method === "PUT") {

        const{
            material,
            qtd,
            date,
            fornecedor,
            solicitante,
            emailSolicitante,
            status,
            acompanhante,
            pessoas,
            tabela,
            action
        }=req.body;

        let table, qtdTabela, id;
        if (tabela == "0"){
            table = "materiaprima";
            qtdTabela = 'n_qtde_materiaprima';
            id = 'n_id_materiaprima';
        }else if (tabela == "1"){
            table = "item";
        }else if (tabela == "2"){
            table = "produto";
        }else{
            return res.status(500).json({message:"Sem informação da tabela"});
        }
        
        if(action == 'movEntrada'){
            try {
                const connection = await pool.getConnection();

                const query=`update ${table} SET ${qtdTabela} = ? WHERE ${id} = ?;`
                const [rows] = await connection.query<RowDataPacket[]>(query,[qtd,material])

                connection.release()
                const dataReturn=rows[0]
                return res.status(200).json({dataReturn});
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else if(action == 'movSaida'){
            try {
                const connection = await pool.getConnection();

                const query=`update ${table} SET ${qtdTabela} = ? WHERE ${id} = ?;`
                const [rows] = await connection.query<RowDataPacket[]>(query,[qtd,material])

                connection.release()
                const dataReturn=rows[0]
                return res.status(200).json({dataReturn});
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else if(action == 'movStatus'){
            try {
                const connection = await pool.getConnection();
                const query=`ALTER TABLE ${table};`
                const [rows] = await connection.query<RowDataPacket[]>(query,[])
                connection.release()
                const dataReturn=rows[0]
                return res.status(200).json({dataReturn});
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }
        
    }else{
        res.status(405).json({message:"Method not allowed" });
    }
}