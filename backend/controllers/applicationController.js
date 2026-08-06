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

export const createApplication = async (req,res) => {
    const {company, role, status, applied_date, notes} = req.body;

    if(!company || !role){
        return res.status(400).json({message: "Company and role are required"});
    }

    try{
        const result = await pool.query(
            "INSERT INTO applications (company, role, status, applied_date, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [company, role, status, applied_date, notes, req.user.id]
        );
        res.status(201).json(result.rows[0]);
    }catch (err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
  
}

export const updateApplication = async (req,res) => {
    const {id} = req.params;
    const {company, role, status, applied_date, notes} = req.body;

    try{
        const result = await pool.query(
        `UPDATE applications
         SET company = $1, role = $2, status = $3, applied_date = $4, notes = $5
         WHERE id = $6 AND user_id = $7 RETURNING *`,
         [company, role, status, applied_date, notes, id, req.user.id]
        );
        res.json(result.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteApplication = async (req,res) => {
    const {id} = req.params;

    try{
        const exsisting = await pool.query(
            "SELECT * FROM applications WHERE id = $1 AND user_id = $2",
            [id, req.user.id]
        );

        if(exsisting.rows.length === 0){
            return res.status(404).json({message: "Application not found"});
        }

        await pool.query(
            "DELETE FROM applications WHERE id=$1 AND user_id = $2",
            [id, req.user.id]
        );
        res.status(204).json({message: "Application deleted successfully"});


    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }

}

