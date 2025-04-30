const logger = (req,res,next)=>{
    const [url, method] = [req.url, req.method];
    const date = new Date().getFullYear();

    console.log(url, method, date);
    next();
}

module.exports = logger