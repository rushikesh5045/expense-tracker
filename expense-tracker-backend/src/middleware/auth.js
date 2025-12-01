import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "changeme";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return next();
  const token = parts[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.userId = payload.id;
  } catch (err) {
    // invalid token — ignore and continue as unauthenticated
  }
  return next();
}
