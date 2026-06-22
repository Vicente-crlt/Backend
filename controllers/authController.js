const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db =
require("../database/connection");

/*
CADASTRO
*/

exports.register =
async (req,res)=>{

    try{

        const {

            nome,
            email,
            telefone,
            cpf,
            senha

        } = req.body;

        const [usuario] =
        await db.query(

            "SELECT * FROM usuarios WHERE email = ?",

            [email]

        );

        if(usuario.length > 0){

            return res.status(400).json({

                success:false,

                message:"Email já cadastrado"

            });

        }

        const hash =
        await bcrypt.hash(
            senha,
            10
        );

        await db.query(

            `INSERT INTO usuarios
            (nome,email,telefone,cpf,senha)
            VALUES (?,?,?,?,?)`,

            [
                nome,
                email,
                telefone,
                cpf,
                hash
            ]

        );

        res.status(201).json({

            success:true,

            message:"Conta criada"

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false

        });

    }

};

/*
LOGIN
*/

exports.login =
async (req,res)=>{

    try{

        const {

            email,
            senha

        } = req.body;

        const [usuario] =
        await db.query(

            "SELECT * FROM usuarios WHERE email = ?",

            [email]

        );

        if(usuario.length === 0){

            return res.status(404).json({

                success:false,

                message:"Usuário não encontrado"

            });

        }

        const user =
        usuario[0];

        const senhaValida =
        await bcrypt.compare(

            senha,

            user.senha

        );

        if(!senhaValida){

            return res.status(401).json({

                success:false,

                message:"Senha incorreta"

            });

        }

        const token =
        jwt.sign(

            {
                id:user.id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );

        res.json({

            success:true,

            token,

            usuario:{

                id:user.id,
                nome:user.nome,
                email:user.email,
                plano:user.plano

            }

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false

        });

    }

};
