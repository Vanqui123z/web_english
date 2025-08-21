import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default JWT_SECRET";
function getUserId(req: Request) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("No token");

  const token = authHeader.split(" ")[1];

  // Lúc này payload sẽ có userId, role
  const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  
  return payload.userId;
}

export default getUserId;
