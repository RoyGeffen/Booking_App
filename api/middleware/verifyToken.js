import jwt  from "jsonwebtoken";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        res.status(401)
        throw new Error("You are not Authenticated");
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            res.status(401)
            throw new Error("Wrong Token, You are not Authenticated");
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next,  () => { 
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403)
        throw new Error("You are not authorized!");
      }
    });
};
  
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
};