import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";

import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Backend Running");
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});