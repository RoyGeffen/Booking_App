import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({
            success:false,
            title:"Validation Failed",
            message: err.message, 
            stackTrace: err.stack});
        break;

    case constants.NOT_FOUND:
        res.json({
            success:false,
            title:"Not Found",
            message: err.message, 
            stackTrace: err.stack});
        break;

    case constants.FORBIDDEN:
        res.json({
            success:false,
            title:"Forbidden",
            message: err.message, 
            stackTrace: err.stack});
        break;

    case constants.UNAUTHORIZED:
        res.json({
            success:false,
            title:"Unauthorized",
            message: err.message, 
            stackTrace: err.stack});
        break;
    case constants.SERVER_ERROR:
        res.json({
            success:false,
            title:"Server Error",
            message: err.message, 
            stackTrace: err.stack});
        break;
    default:
        // res.json({
        //     success:true,});
        console.log("No Error, All Good");
        break;
  }
};

export default errorHandler;

export const createError = (status,message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}