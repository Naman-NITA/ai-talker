/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://ai-talker_owner:npg_XQi8vldEjJb6@ep-noisy-mountain-a5ekycim-pooler.us-east-2.aws.neon.tech/ai-talker?sslmode=require',
  }
};