import {resend} from "@/lib/Resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";

export async function sendVerificationEmail(eamil:string,username:string,verifyCode:string):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from:'onboarding@resend.dev',
            to:eamil,
            subject:'Verification Code',
            react:VerificationEmail({username,otp:verifyCode})
        });
        return {
            success:true,
            message:'Verification Email send successfully'
        }
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {
            success:false,
            message:'Failed to send verification email'
        }
        
    }
}