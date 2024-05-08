import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {username,code}=await request.json();
        
        // exptracting from url or frontend
        const decodedUsername=decodeURIComponent(username);
        const user=await UserModel.findOne({username:decodedUsername});
        if(!user){
            return Response.json({
                success:false,
                message:"User Not Found"
            },{
                status:400
            })
        }

        const isCodeValid=user.verifyCode===code
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true,
            await user.save();
            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{
                status:200
            })
        }else{
            if(!isCodeValid){
                return Response.json({
                    success:false,
                    message:"Code is Not Valid"
                },{
                    status:400
                })
            }else{
                return Response.json({
                    success:false,
                    message:"Code is Expired , Again signIn"
                },{
                    status:400
                })
            }
        }
        
    } catch (error) {
        console.log("Error Verify Code",error)
        return Response.json({
            success:false,
            message:"Error while verifying Code"
        },{
            status:500
        })
    }
}