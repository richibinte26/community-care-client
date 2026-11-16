
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse MongoDB client in both development and production
const globalForMongo = globalThis;

const client =
  globalForMongo._mongoClient ??
  new MongoClient(process.env.MONGODB_URI);

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = client;
}

const db = client.db("community-care");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    jwt({
      jwt: {
        // The Express server reads email and name from the token
        definePayload: ({ user }) => ({
          email: user.email,
          name: user.name,
        }),
      },
    }),
    nextCookies(),
  ],
});
