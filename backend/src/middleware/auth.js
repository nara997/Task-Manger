import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
