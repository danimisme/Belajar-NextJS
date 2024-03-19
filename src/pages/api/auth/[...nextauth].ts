import { signIn, signInWithGoogle , } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
     providers : [
        CreadentialsProvider({
        type: "credentials",
        name: "credentials",
        credentials : {
            email: {label: "Email", type: "text" },
            password: { label: "Password",  type: "password" }
        },
        async authorize(credentials) {
            const {email, password} = credentials as {
                email: string, password: string 
            };
        const user:any = await signIn({email})
        if (user) {
            const passwordConfirm = await compare(password, user.password)
            if (passwordConfirm) {
                return user
            } 
            return null
        } else {
            return null
        }
        }
     }),
     GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      })
    ],
     callbacks: {
        async jwt({token,account, profile , user}:any){
            if (account?.provider === "credentials") {
                token.email = user.email
                token.fullName = user.fullName
                token.role = user.role
            }
            if (account?.provider === "google") {
                const data = {
                    fullName : user.name,
                    email : user.email,
                    image : user.image,
                    type: "google",
                };

                await signInWithGoogle(data, (result : {status : boolean, data : any , message : string}) => {
                    if (result.status) {
                        token.email = result.data.email
                        token.fullName = result.data.fullName
                        token.type = result.data.type
                        token.image = result.data.image
                        token.role = result.data.role
                    }
                })

                token.email = data.email
                token.fullName = data.fullName
                token.type = data.type
                token.image = data.image
            }
            return token
        },

        async session({session,token} : any) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("fullName" in token ) {
                session.user.fullName = token.fullName
            }
            if ("image" in token) {
                session.user.image = token.image
            }
            if ("role" in token ) {
                session.user.role = token.role
            }
            return session
        }
     },
     pages: {
        signIn: "/auth/login"
     }


}

export default NextAuth(authOptions)