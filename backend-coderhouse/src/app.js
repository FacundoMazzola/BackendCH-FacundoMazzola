import express from "express";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Proyecto Backend Coderhouse - ¡Servidor funcionando!");
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en: http://localhost:${PORT}`);
});
