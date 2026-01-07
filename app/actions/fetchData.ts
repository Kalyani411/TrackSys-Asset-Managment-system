"use server"

export async function fetchData(url:string) {
    console.log("url>>>", url)
    const res = await fetch(process.env.NEXTAUTH_URL+ url);
    const data = await res.json();
    console.log("server data>>", data)
    return data 
}