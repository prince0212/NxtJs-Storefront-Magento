import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter Email",
        },
        password: { label: "Password", type: "password" },
        tenantKey: {
          label: "Tenant Key",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials.email,
          password: credentials.password,
        };
        console.log(payload);
        const endpoint =
          "http://b2c-community.local:8800/rest/V1/integration/customer/token";
        //console.log("API this end point ", endpoint);
        const res = await axios.post(endpoint, payload);
        console.log("AAA" + res);
        if (typeof res.status != "undefined") {
          console.log(res.data);
          const user = {
            data: {
              username: credentials.email,
              token: res.data,
            },
          };

          // Create logged in customer cart
          console.log("DDDD" + user);
          return user;
        } else {
          console.log(res);
        }

        const user = await res.json();
        console.log(user);
        if (user.ok == false) {
          console.log("Login fail");
          throw new Error(user.exception);
        }

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  secret: "abc123",
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log("Creating token");
        return {
          ...token,
          accessToken: user.data.token,
          username: user.data.username,
          refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      return session;
    },
    signOut() {},
  },
});
