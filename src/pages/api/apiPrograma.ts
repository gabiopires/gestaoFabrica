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
                let query=`SELECT programa.*,
                    fabrica.s_nome_fabrica
                    FROM programa
                    LEFT JOIN fabrica ON programa.n_id_fabrica = fabrica.n_id_fabrica;

                `
                const [rowsPrograma] = await connection.query<RowDataPacket[]>(query,[]);

                connection.release()
                const dataReturn= {
                    programa: rowsPrograma
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