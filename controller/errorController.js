const sendDevError = (err, res) => {
    console.log("Hello from sendDevError");
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
}

const sendProductionError = (err, res) => { 
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error("ERROR", err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV === "development") {
        sendDevError(err, res);
    } else if(process.env.NODE_ENV === "production") {
        sendProductionError(err, res);
    }
}