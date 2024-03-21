import CCUser from "@/modals/CCUser";
import connectDB, { disconnectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const {
        email,
        phone,
       } = await request.json();
       await connectDB();
       const existingUser = await CCUser.findOne({email});
     if(!existingUser){
       return NextResponse.json({message:"No Email Found"},{status:500});
      }
      else if(existingUser.phone !== phone){
        return NextResponse.json({message:"Incorect Phone"},{status:500});
      }
      if(existingUser.result !== null){
        return NextResponse.json({message:"Success",result:"Completed"},{status:201});
      }
      else if(existingUser.session.deadline && Date.now() > existingUser.session.deadline){
        return NextResponse.json({message:"Success",result:"Timeup"},{status:201});
      }
      else{
        return NextResponse.json({message:"Success",result:existingUser.result,year:existingUser.year},{status:201});
      }
    } catch (error) {
        console.log("DBE",error)
        return NextResponse.json({message:"Failed"},{status:500});
    }
}