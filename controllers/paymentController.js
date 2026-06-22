const db =
require("../database/connection");

exports.pagar = async (req,res)=>{

    const {

        usuario_id,
        metodo,
        valor,
        plano

    } = req.body;

    try{

        const [result] =
        await db.query(

            `
            INSERT INTO pagamentos
            (
                usuario_id,
                metodo,
                valor
            )
            VALUES
            (
                ?,
                ?,
                ?
            )
            `,

            [
                usuario_id,
                metodo,
                valor
            ]

        );

        await db.query(

            `
            UPDATE usuarios
            SET plano = ?
            WHERE id = ?
            `,

            [
                plano,
                usuario_id
            ]

        );

        res.json({

            success:true,

            pagamento_id:
            result.insertId,

            message:
            "Pagamento aprovado"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:
            "Erro ao processar pagamento"

        });

    }

};