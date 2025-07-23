import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET || "osvsrSecret123";
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "2h" });
  return token;
};

export const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET || "osvsrSecret123";
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
