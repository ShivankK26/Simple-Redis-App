import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const {text, tags} = body;

        const commentId = nanoid();

        // adding a comment to the list
        await redis.rpush('comments', commentId);

        // add tags to comment
        await redis.sadd(`tags:${commentId}`, tags);

        // retreive and store comment details
        const comment = {
            text,
            timestamp: new Date(),
            author: req.cookies.get('userId')?.value,
        }

        // 
        await redis.hset(`comment_details: ${commentId}`, comment);
        
        return new Response("OK");
    } catch (error) {
        console.log(error);
    }
}