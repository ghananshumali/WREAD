import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.access_token;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : cookieToken;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
