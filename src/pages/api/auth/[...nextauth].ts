import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider from "next-auth/providers/credentials";

const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
     providers : [CreadentialsProvider({
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
     })],
     callbacks: {
        jwt({token,account, profile , user}:any){
            if (account?.provider === "credentials") {
                token.email = user.email
                token.fullName = user.fullName
                token.role = user.role
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