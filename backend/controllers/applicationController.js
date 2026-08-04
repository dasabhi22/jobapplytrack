import pool from "../db.js";

export const getApplications = async (req,res) => {
    try{
        const result = await pool.query(
            "SELECT * FROM applications WHERE user_id = $1", [req.user.id]
        );
        res.json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}
