import CCUser from "@/modals/CCUser";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import {  getSession } from "../route";


export async function GET() {
   try{
    await connectDB();
     const session = await getSession();
    const existingUser = await CCUser.findOne({email:JSON.parse(session)[0]});

     if(!existingUser ){
         return NextResponse.json({message:"User Not Exists please login"},{status:500});
        }
        const response = await fetch('https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            // console.log("data",data);
            let deadline = existingUser.session.deadline;
            const { year, month, day, hour, minute, seconds, milliSeconds } = data;
            if (!deadline) {
                const date = new Date(year, month - 1, day, hour, minute, seconds, milliSeconds);
                deadline = Date.now() + 1000 * 60 * 60 + 5 ;
                existingUser.session.deadline =deadline;
                existingUser.save();
            }
            return NextResponse.json({message:"Successed",deadline},{status:201});
        } else {
            console.error(data.message);
            console.log('Enter Failed');
            return NextResponse.json({message:"Failed"},{status:500});
        }
    } catch (error) {
        console.log("DataBaseE",error)
        return NextResponse.json({message:"Failed"},{status:500});
    }
}