import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

class AuthController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await this.UserModel.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "User already exists with this username or email",
        });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await this.UserModel.create({
        username,
        email,
        password: hashedPassword,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Remove password from response
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Find user by username or email
      const user = await this.UserModel.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
          isDeleted: false,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = this.generateToken(user.id);

      // Remove password from response
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse,
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }

  async verify(req, res) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const secret = process.env.JWT_SECRET || "osvsrSecret123";
      const decoded = jwt.verify(token, secret);

      // Find user to make sure they still exist and aren't deleted
      const user = await this.UserModel.findOne({
        where: {
          id: decoded.id,
          isDeleted: false,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid token - user not found" });
      }

      // Remove password from response
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      res.status(200).json({
        message: "Token is valid",
        user: userResponse,
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      console.error("Token verification error:", error);
      res
        .status(500)
        .json({ message: "Error verifying token", error: error.message });
    }
  }

  generateToken(userId) {
    const secret = process.env.JWT_SECRET || "osvsrSecret123";
    return jwt.sign({ id: userId }, secret, { expiresIn: "2h" });
  }
}

export default AuthController;
