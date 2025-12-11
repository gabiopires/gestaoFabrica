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
                let query=`SELECT maquina.*,
                        unidade.s_nome_unidade,
                        fabrica.s_nome_fabrica,
                        statusmaquina.s_desc_statusmaquina
                    FROM maquina
                    LEFT JOIN statusmaquina ON maquina.n_status_maquina = statusmaquina.n_id_statusmaquina
                    LEFT JOIN unidade ON maquina.n_id_unidade = unidade.n_id_celula
                    LEFT JOIN fabrica ON maquina.n_id_fabrica = fabrica.n_id_fabrica;
                `
                const [rowsMaquina] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    maquina: rowsMaquina
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