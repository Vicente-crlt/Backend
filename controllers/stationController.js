const db =
require("../database/connection");

/*
LISTAR ESTAÇÕES
*/

exports.getStations = async (req,res)=>{

    try{

        const [result] =
        await db.query(

            `
            SELECT
            id,
            nome,
            latitude,
            longitude,
            bikes
            FROM estacoes
            `
        );

        res.json(result);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false

        });

    }

};

/*
ATUALIZAR LOCALIZAÇÃO
*/

exports.updateLocation = async (req,res)=>{

    const {

        id,
        latitude,
        longitude,
        bikes

    } = req.body;

    try{

        await db.query(

            `
            UPDATE estacoes
            SET
            latitude = ?,
            longitude = ?,
            bikes = ?
            WHERE id = ?
            `,

            [
                latitude,
                longitude,
                bikes,
                id
            ]

        );

        res.json({

            success:true

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false

        });

    }

};