import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, {params}) => {
    const {id} = params;
    try{
        await connect();
        const post = await Post.findById(id);

        return new NextResponse(JSON.stringify(post), {status: 200});
    }catch(err){
        return new NextResponse("Database Error", {status: 500});
    }
}

export const DELETE = async (request, {params}) => {
    
    try{
        await connect();
        const {id} = params;


        await Post.findByIdAndDelete(id);
        return new NextResponse("post has been deleted")
    }catch(err){
        return new NextResponse({err: "something went wrong"}, {status: 500});
    }
}