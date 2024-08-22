import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { db } from ".";
import { discordUsers } from "./src/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt(params) {
      const { token, user, account, profile, trigger } = params;

      console.log(trigger);

      if (trigger === "signIn" && profile) {
        // Check if user already exists
        const user = await db
          .select()
          .from(discordUsers)
          .where(eq(discordUsers.discordUserId, parseInt(profile.id!)))
          .execute();

        if (user.length === 0) {
          await db.insert(discordUsers).values({
            discordUserId: parseInt(profile.id!),
            discordDisplayName: profile.username! as string,
            profilePictureUrl: profile.image_url! as string,
            discordUserEmail: profile.email! as string,
            userColor: profile.banner_color! as string,
            lastUpdated: new Date(),
          });

          console.log("Inserted user into database");
        }
      }

      return token;
    },
  },
});
