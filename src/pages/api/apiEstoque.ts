import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../components/db";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if(req.method === "GET") {
        const{
            action,
            data,
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
                    SELECT n_id_produto AS id, s_nome_produto AS nome, n_qtd_estoque AS qtd FROM produto WHERE n_id_produto = 20;
                `
                const [rowsProduto] = await connection.query<RowDataPacket[]>(query,[]);

                query = `SELECT 
                        em.n_id_estoque_movimentacao,
                        em.data_movimentacao,
                        em.qtd_movimentada,
                        em.status_movimentacao,
                        em.fornecedor,
                        em.nome_solicitante,
                        em.email_solicitante,
                        pes.s_nome_pessoa AS acompanhante,
                        CASE
                            WHEN em.n_id_item IS NOT NULL THEN i.s_nome_item
                            WHEN em.n_id_materiaPrima IS NOT NULL THEN mp.s_nome_materiaprima
                            WHEN em.n_id_produto IS NOT NULL THEN p.s_nome_produto
                            ELSE ''
                        END AS estoque
                    FROM estoque_movimentacao em
                    LEFT JOIN item i ON em.n_id_item = i.n_id_item
                    LEFT JOIN materiaprima mp ON em.n_id_materiaPrima = mp.n_id_materiaprima
                    LEFT JOIN produto p ON em.n_id_produto = p.n_id_produto
                    LEFT JOIN pessoa pes ON em.acompanhou_producao = pes.n_id_pessoa
                    ORDER BY em.data_movimentacao;`
                ;
                const [rowsMov] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    bruto: rowsBruto,
                    item: rowsItem,
                    produto: rowsProduto,
                    movimentacao: rowsMov
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
        }else if(action == "getItem_materiaprima"){
            try {
                const connection = await pool.getConnection();

                const query = `
                    SELECT itemMP.n_id_materiaprima AS id,
                        mp.n_qtde_materiaprimaPreparado AS qtdAnterior
                    FROM item_materiaprima itemMP 
                    JOIN materiaprima mp ON itemMP.n_id_materiaprima = mp.n_id_materiaprima
                    WHERE itemMP.n_id_item = ?;
                `;
                const [rows_itemsProduto] = await connection.query<RowDataPacket[]>(query,[data]);

                connection.release()
                const dataReturn = rows_itemsProduto
                return res.status(200).json(dataReturn[0]);
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else if(action == "getProduto_item"){
            try {
                const connection = await pool.getConnection();

                const query = `
                    SELECT produto_item.n_id_item,
                        item.n_qtde_item 
                    from produto_item 
                    left join item ON produto_item.n_id_item = item.n_id_item
                    where n_id_produto = ?;
                `;
                const [rows_itemsProduto] = await connection.query<RowDataPacket[]>(query,[data]);

                connection.release()
                const dataReturn = rows_itemsProduto
                return res.status(200).json(dataReturn[0]);
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
            qtdDigitada,
            date,
            fornecedor,
            solicitante,
            emailSolicitante,
            acompanhante,
            tabela,
            colunaTabela,
            action,
            status
        }=req.body;

        let table, id, materiaPrima = null, item = null, produto = null;
        if (tabela == "0"){
            table = "materiaprima";
            id = 'n_id_materiaprima';
            materiaPrima = material;
        }else if (tabela == "1"){
            table = "item";
            id = "n_id_item";
            item = material;
        }else if (tabela == "2"){
            table = "produto";
            id = "n_id_produto";
            produto = material;
        }else{
            return res.status(500).json({message:"Sem informação da tabela"});
        }
        
        if(action == 'movEntrada'){
            try {
                const connection = await pool.getConnection();

                let query=`update ${table} SET ${colunaTabela} = ? WHERE ${id} = ?;`
                const [rows] = await connection.query<RowDataPacket[]>(query,[qtd,material])

                query=`
                    INSERT INTO estoque_movimentacao 
                        (data_movimentacao, qtd_movimentada, status_movimentacao, fornecedor, nome_solicitante, 
                        email_solicitante, acompanhou_producao, n_id_item, n_id_materiaPrima, n_id_produto) 
                    VALUES (?,?,?,?,?,?,?,?,?,?);
                `
                const [rowsMov] = await connection.query<RowDataPacket[]>(query,[date,qtdDigitada,status,fornecedor,solicitante, emailSolicitante,
                    acompanhante, item, materiaPrima, produto
                ]);

                connection.release()

                return res.status(200).json({message:"Ok"});
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }else if(action == 'movSaida'){
            try {
                const connection = await pool.getConnection();

                let query=`update ${table} SET ${colunaTabela} = ? WHERE ${id} = ?;`
                const [rows] = await connection.query<RowDataPacket[]>(query,[qtd,material])

                query=`
                    INSERT INTO estoque_movimentacao 
                        (data_movimentacao, qtd_movimentada, status_movimentacao, fornecedor, nome_solicitante, 
                        email_solicitante, acompanhou_producao, n_id_item, n_id_materiaPrima, n_id_produto) 
                    VALUES (?,?,?,?,?,?,?,?,?,?);
                `
                const [rowsMov] = await connection.query<RowDataPacket[]>(query,[date,qtdDigitada,status,fornecedor,solicitante, emailSolicitante,
                    acompanhante, item, materiaPrima, produto
                ]);

                connection.release()

                return res.status(200).json({message: "Ok"});
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }
    }else{
        res.status(405).json({message:"Method not allowed" });
    }
}