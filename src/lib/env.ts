import { z } from "zod";

const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url("Invalid API base URL"),
  NEXT_PUBLIC_API_GATEWAY_URL: z.string().url("Invalid API gateway URL"),
  NEXT_PUBLIC_API_TOKEN: z.string().min(1, "API token is required"),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z
    .string()
    .min(1, "Google Maps API key is required"),

  // Auth
  AUTH_SECRET: z
    .string()
    .min(32, "NextAuth secret must be at least 32 characters"),
  AUTH_GOOGLE_ID: z.string().min(1, "Google ID is required"),
  AUTH_GOOGLE_SECRET: z.string().min(1, "Google secret is required"),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env files.`
      );
    }
    throw error;
  }
}

export const env = validateEnv();
