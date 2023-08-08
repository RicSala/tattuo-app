import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/lib/prismadb';
import { getSavedTattoosByUserId } from '@/actions/getSavedTattoosByUserId';
import { getSavedArtistsByUserId } from '@/actions/getSavedArtistByUserId';
import { getFavoriteTattooIdsOfUser } from '@/actions/getFavoriteTattooIdsOfUser';
import { getFavoriteArtistIdsOfUser } from '@/actions/getFavoriteArtistIdsOfUser';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: ' ' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });


                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                //REVIEW: does this mean we are gonna have the whole user object in the session
                return user;
            },
        }),
    ],

    // custom pages
    pages: {
        signIn: '/',
        newUser: '/', // New users will be directed here on first sign in
    },

    debug: process.env.NODE_ENV === 'development',
    jwt: {
        // secret: process.env.JWT_SECRET, // deprecated
    },

    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    session: {

        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: "jwt",
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens (as is the case)
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    //REVIEW: When we use the Prisma adapter, who decides which fields are gonna be saved in the session?
    // how do I add more fields to the session?
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {

        // to control if a user is allowed to sign in.
        async signIn(user, account, profile) {


            return true
        },
        // called anytime the user is redirected to a callback URL (e.g. on signin or signout).
        // async redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        //   }

        // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or
        // updated (i.e whenever a session is accessed in the client). The returned value will be encrypted, 
        // and it is stored in a cookie.
        // The arguments user, account, profile and isNewUser are only passed the first time this callback 
        // is called on a new session, after the user signs in. In subsequent calls, only token will be available.
        // whatever this callback returns will be the token that is stored in the cookie.
        async jwt({ token }) {

            const dbUser = await prisma.user.findUnique({ where: { id: token.sub } })

            // Do we have to do this?
            if (!dbUser) { return token }

            if (dbUser.role === 'ARTIST') {
                const artistProfile = await prisma.artistProfile.findUnique({
                    where: {
                        userId: dbUser.id
                    }
                })

                token.artistProfileId = artistProfile.id
            }


            const favoriteTattooIds = await getFavoriteTattooIdsOfUser(dbUser)
            const favoriteArtistIds = await getFavoriteArtistIdsOfUser(dbUser)
            const savedArtists = await getSavedArtistsByUserId(dbUser.id)
            const savedTattoos = await getSavedTattoosByUserId(dbUser.id)


            const arraySavedArtistsId = savedArtists.map(savedListing => savedListing.id)
            const arraySavedTattoosId = savedTattoos.map(savedListing => savedListing.id)


            // concat the favorite tattoo ids and the favorite artist ids
            token.favoriteIds = favoriteTattooIds.concat(favoriteArtistIds)
            token.role = dbUser.role
            token.savedIds = arraySavedArtistsId.concat(arraySavedTattoosId)


            return token
        },

        // The session callback is called whenever a session is checked.
        // By default, only a subset of the token is returned for increased security. 
        // If you want to make something available you added to the token (like access_token and user.id from above) 
        // via the jwt() callback, you have to explicitly forward it here to make it available to the client.
        // When using database sessions, the User (user) object is passed as an argument.
        // When using JSON Web Tokens for sessions, the JWT payload (token) is provided instead.
        async session({ session, token, user }) {

            if (session && session.user) {
                session.user.role = token.role
                session.user.favoriteIds = token.favoriteIds
                session.user.id = token.sub
                session.user.savedIds = token.savedIds
                if (token.artistProfileId) {
                    session.user.artistProfileId = token.artistProfileId
                }

            }
            return session
        }
    },

    // We also have "events"
    // what's the difference between callbacks and events?
    // callbacks modify the default behavior, events can be used to add on top of the default behavior
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },

    // https://dev.to/mfts/how-to-send-a-warm-welcome-email-with-resend-next-auth-and-react-email-576f
    // events: {
    //     async createUser(message) {
    //       const params = {
    //         user: {
    //           name: message.user.name,
    //           email: message.user.email,
    //         },
    //       };
    //       await sendWelcomeEmail(params); // <-- send welcome email
    //     }
    //   },

    //REVIEW: When you supply a session prop in _app.js, useSession won't show a loading state,
    // as it'll already have the session available. In this way, you can provide a more seamless user experience.
    // https://next-auth.js.org/tutorials/securing-pages-and-api-routes


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
