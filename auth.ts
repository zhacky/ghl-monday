import NextAuth, {Profile} from 'next-auth';
import { authConfig } from './auth.config';
import type {OAuth2Config, OAuthConfig, OAuthUserConfig} from "@auth/core/providers";

export interface GoHighLevelProfile {

}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        // {
        //     id: "gohighlevel",
        //     name: "Go High Level",
        //     issuer: "https://services.leadconnectorhq.com",
        //     clientId: process.env.GHL_APP_CLIENT_ID,
        //     clientSecret: process.env.GHL_APP_CLIENT_SECRET
        // } satisfies OAuth2Config<Profile>,
    ],
});