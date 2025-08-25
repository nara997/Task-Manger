// src/middleware/errorHandler.js
export const notFound = (req, res, next) => {
    res.status(404).json({ error: "Route not found" });
};

export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err); // ✅ helpful in dev

    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    // Handle common cases
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    if (err.name === "CastError") {
        // Happens if invalid Mongo ObjectId is used in params
        statusCode = 400;
        message = "Invalid ID format";
    }

    if (err.code === 11000) {
        // Mongo duplicate key error (e.g. unique email already exists)
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    // Send clean JSON response
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
