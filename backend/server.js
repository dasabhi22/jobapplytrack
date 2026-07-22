import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.post("/test", (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});