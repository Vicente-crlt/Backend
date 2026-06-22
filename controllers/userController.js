const db =
require("../database/connection");

const bcrypt =
require("bcryptjs");

exports.alterarSenha = async (req, res) => {

    try {

        const {

            senhaAtual,
            novaSenha

        } = req.body;

        const [usuario] =
        await db.query(

            `
            SELECT senha

            FROM usuarios

            WHERE id = ?
            `,

            [
                req.user.id
            ]

        );

        const senhaCorreta =
        await bcrypt.compare(

            senhaAtual,

            usuario[0].senha

        );

        if (!senhaCorreta) {

            return res.status(400).json({

                success: false,

                message:
                "Senha atual incorreta"

            });

        }

        const hash =
        await bcrypt.hash(

            novaSenha,

            10

        );

        await db.query(

            `
            UPDATE usuarios

            SET senha = ?

            WHERE id = ?
            `,

            [

                hash,

                req.user.id

            ]

        );

        res.json({

            success: true,

            message:
            "Senha alterada"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

};

exports.atualizarPerfil = async (req, res) => {

    try {

        const {

            email,
            telefone

        } = req.body;

        await db.query(

            `
            UPDATE usuarios

            SET

            email = ?,
            telefone = ?

            WHERE id = ?
            `,

            [

                email,
                telefone,

                req.user.id

            ]

        );

        res.json({

            success: true,

            message:
            "Perfil atualizado"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

};

exports.perfil = async (req, res) => {

    try {

        const [usuario] =
        await db.query(

            `
            SELECT

            id,
            nome,
            email,
            telefone,
            cpf

            FROM usuarios

            WHERE id = ?
            `,

            [
                req.user.id
            ]

        );

        res.json(
            usuario[0]
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

};
