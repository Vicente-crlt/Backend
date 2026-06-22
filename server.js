const express = require("express");
const cors = require("cors");
const userRoutes =
require("./routes/user");
const stationRoutes =
require("./routes/stations");
const paymentRoutes =
require("./routes/payment");
const aluguelRoutes =
require("./routes/aluguel");
require("./config/database");


require("dotenv").config();

const authRoutes =
require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/usuario",
    userRoutes
);

app.use("/api/auth", authRoutes);

app.use(
    "/api/stations",
    stationRoutes
);

app.use(
    "/api/payment",
    paymentRoutes
);

app.use(
    "/api/aluguel",
    aluguelRoutes
);
app.get("/", (req,res)=>{

    res.json({

        status:"online",

        api:"BikeClick"

    });

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});
