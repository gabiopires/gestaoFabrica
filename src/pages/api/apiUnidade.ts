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
                let query=`SELECT unidade.*,
                        celula.s_nome_celula,
                        fabrica.s_nome_fabrica
                    FROM unidade
                    LEFT JOIN celula ON unidade.n_id_celula = celula.n_id_celula
                    LEFT JOIN fabrica ON celula.n_id_fabrica = fabrica.n_id_fabrica;
                `
                const [rowsUnidade] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    unidade: rowsUnidade
                }

                return res.status(200).json(dataReturn);
            }catch(error){
                console.error(error)
                return res.status(500).json({message:"Internal Server Error"});
            }
        }
    }else{
        res.status(405).json({message:"Method not allowed" });
    }
}