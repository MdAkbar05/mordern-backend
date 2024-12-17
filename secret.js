// Load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

// Export environment variables
export const serverPort = process.env.PORT || 5001; // Default to 5001 if PORT is not set
export const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/defaultDB"; // Add a fallback URL
export const jwtAccessKey = process.env.JWT_ACCESS_KEY || "default_access_key";
export const jwtRefreshKey =
  process.env.JWT_REFRESH_KEY || "default_refresh_key";
export const jwtOtpKey = process.env.JWT_OTP_KEY || "default_otp_key";
