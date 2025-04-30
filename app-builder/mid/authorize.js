const authorize = (req,res,next)=>{
    console.log("Hello")
    next();
}

module.exports = authorize;