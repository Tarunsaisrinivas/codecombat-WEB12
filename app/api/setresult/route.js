import CCUser from "@/modals/CCUser";
import connectDB, { disconnectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import {  getSession,  setDeadline } from "../route";


export async function POST(request) {
   try{
    await connectDB();
     const session = await getSession();
     const {
        finalScore
       } = await request.json();
   console.log("Final",finalScore)
     const existingUser = await CCUser.findOne({email:JSON.parse(session)[0]});
     if(!existingUser ){
         return NextResponse.json({message:"User Not Exists please login"},{status:500});
        }
          existingUser.result =finalScore;
          await existingUser.save();

        await disconnectDB();

     return NextResponse.json({message:"Successed"},{status:201});
    } catch (error) {
        console.log("DataBaseE",error)
        return NextResponse.json({message:"Failed"},{status:500});
    }
}