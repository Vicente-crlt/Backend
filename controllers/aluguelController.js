const db =
require("../database/connection");

/*
INICIAR ALUGUEL
*/

exports.iniciar =
async (req,res)=>{

    try{

        const {

            usuarioId,
            estacaoId

        } = req.body;

        await db.query(

            `
            INSERT INTO alugueis
            (
                usuario_id,
                estacao_id,
                inicio,
                status
            )
            VALUES
            (
                ?, ?, NOW(), 'ativo'
            )
            `,

            [
                usuarioId,
                estacaoId
            ]

        );

        res.json({

            success:true,

            message:"Aluguel iniciado"

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Erro ao iniciar aluguel"

        });

    }

};

/*
FINALIZAR ALUGUEL
*/

exports.finalizar =
async (req,res)=>{

    try{

        const {

            usuarioId

        } = req.body;

        await db.query(

            `
            UPDATE alugueis
            SET
            fim = NOW(),
            status = 'finalizado'
            WHERE
            usuario_id = ?
            AND
            status = 'ativo'
            `,

            [
                usuarioId
            ]

        );

        res.json({

            success:true,

            message:"Aluguel finalizado"

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Erro ao finalizar aluguel"

        });

    }

};