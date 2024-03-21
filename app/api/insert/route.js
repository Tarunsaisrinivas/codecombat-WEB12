import CCUser from "@/modals/CCUser";
import connectDB, { disconnectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        regdNo,
        year,
        branch,
        college
       } = await request.json();

     await connectDB();

     const existingEmail = await CCUser.findOne({email});
     const existingPhone = await CCUser.findOne({phone});
     const existingRegdNo = await CCUser.findOne({regdNo});

     if(existingEmail ){
         return NextResponse.json({message:"Email Already Exists"},{status:500});
        }
        else if(existingPhone){
            return NextResponse.json({message:"Phone Already Exists"},{status:500});
        }else if(existingRegdNo){
            return NextResponse.json({message:"RegdNo Already Exists"},{status:500});
        }

        const newUser = new CCUser({
            firstName,
            lastName,
            email,
            phone,
            regdNo,
            year,
            branch,
            college,
            session: {
                deadline: null,
            },
            result:null,
            rating:0,
            feedback:""
        });
     try {
            await newUser.save();
            await disconnectDB();
    } catch (error) {
        console.log("DBE1",error);
        return NextResponse.json({message:"Creation Failed"},{status:500});
    }
     return NextResponse.json({message:"Success",year:year},{status:201});
    } catch (error) {
        console.log("DBE",error)
        return NextResponse.json({message:"Failed"},{status:500});
    }
}