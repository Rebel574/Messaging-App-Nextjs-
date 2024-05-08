import {z} from 'zod';
import dbConnect  from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { usernameValidation } from '@/schemas/signUpSchema';

const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect();

    try {
        // query cheching how to extract query 
        const {searchParams}=new URL(request.url);
        const queryParam={
            username:searchParams.get('username')
        }
        // const username=queryParam.username;
        // zod validation
        const validUsername=UsernameQuerySchema.safeParse(queryParam);
        if(validUsername.success){
            const {username}=validUsername.data;
            const existingVerifiedUser= await UserModel.findOne({username,isVerified:true});
            if(existingVerifiedUser){
                return Response.json({
                    success:false,
                    message:"Username is already taken"
                },{
                    status:400
                })
            }
            return Response.json({
                success:true,
                message:"Username is Unique"
            },{
                status:200
            })


        }else{
            return Response.json({
                success:false,
                message:validUsername.error.message
            },{
                status:404
            })
        }
        
    } catch (error) {
        console.error("Error Checking Username Validation SignIN",error)
        return Response.json({
            success:false,
            message:"Error checking username"
        },{
            status:500
        })
    }
}