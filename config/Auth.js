import jwt from "jsonwebtoken";

export const adminValidation = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const extractToken = token.split(" ")[1];
        const decode = jwt.verify(extractToken, "SID");

        req.user = {
            userId: decode.userId,
            userRole: decode.userRole
        };

        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};
