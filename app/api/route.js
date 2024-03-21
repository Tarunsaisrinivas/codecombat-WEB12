"use server"
import { cookies } from "next/headers";
import { encrypt,decrypt } from "@/utils/Cipher";


export async function login(code) {
    const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
   cookies().set('session',encrypt(code),{expires,httpOnly:true})
}

export async function setSubmit(code) {
  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
 cookies().set('submit',encrypt(code),{expires,httpOnly:true})
}

export async function setValue(code) {
  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
 cookies().set('value',encrypt(code),{expires,httpOnly:true})
}

export async function setDeadline(end) {
  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
  cookies().set('deadline',encrypt(end),{expires,httpOnly:true})
}

export async function logout() {
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
    cookies().set('session',encrypt("Logged"),{expires,httpOnly:true})
    cookies().set('deadline',"",{expires:new Date(0)})
    cookies().set('submit',"",{expires:new Date(0)})
    cookies().set('value',"",{expires:new Date(0)})
 }

 export async function getSession() {
  const session =  cookies().get('session')?.value
  if(!session) return null
  return decrypt(session)
}

export async function getSubmit() {
  const session =  cookies().get('submit')?.value
  if(!session) return null
  return decrypt(session)
}
export async function getValue() {
  const session =  cookies().get('value')?.value
  if(!session) return null
  return decrypt(session)
}

export async function getDeadline() {
  const deadline =  cookies().get('deadline')?.value
  if(!deadline) return null
  return decrypt(deadline)
}
export async function getTime() {
  try{
    const response = await fetch('https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
          const { year, month, day, hour, minute, seconds, milliSeconds } = data;
          const date = new Date(year, month - 1, day, hour, minute, seconds, milliSeconds).getTime();
            // console.log("data",data);
            // console.log("Timein ms",date)
          return date
        }
  }
  catch(error){
    console.log(error)
  }
}
