import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "otp", type: "otp" },
      },
      async authorize(credentials) {
        // Replace this with your backend API call


         // Call the external API to verify the user
         const res = await fetch(
          `https://wotrades.com/API/items/allusers/read?phone=${credentials.phone}`
        );

        if (!res.ok) {
          throw new Error("Unable to fetch user details");
        }

        const user = await res.json();
        console.log(user);

        // Validate the API response (modify as per your API structure)
      
        if(user[0].phone == credentials.phone) {

          const userinfo = {
            id: "12234",
            email: user[0].email,
            name: "nameplease"
          };

          return {
            id: user[0].cid,
            email: user[0].email,
            name: user[0].name,
            phone: user[0].phone
          };
        }

        /*
        if (user && user.success && user.data) {
          return {
            id: user.data.id, // Extract and assign user ID
            name: user.data.name, // Extract and assign user name
            phone: user.data.phone, // Add phone number to the user object
          };
        }
          */

        /*
        const res = await fetch(`https://wotrades.com/API/items/allusers/read?phone=8686140441`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }); 

        const user = {
          id: "12234",
          email: credentials.email,
          name: "nameplease"
        };

      //  if (res.ok && user) {
          // Ensure the user object contains a userId
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
      //  }
      //  return null;
      */
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add userId to the token if user is available
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add userId to the session
      if (token) {
        session.user.userId = token.userId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
