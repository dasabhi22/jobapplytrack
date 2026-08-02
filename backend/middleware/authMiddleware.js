import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next)=>{
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Invalid or expiredtoken"});
        }
        req.user = decoded;
        next();
    })
}

export default authMiddleware;