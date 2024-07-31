import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const {text, tags} = body;

        const commentId = nanoid();

        // retreive and store comment details
        const comment = {
            text,
            tags: {
                TypeScript: true,
            },
            upvotes: 0,
            timestamp: new Date(),
            author: req.cookies.get('userId')?.value,
        }

        await Promise.all([
         redis.rpush('comments', commentId), // adding a comment to the list
         redis.json.set(`comment:${commentId}`, '$', comment),
        //  redis.sadd(`tags:${commentId}`, tags), // add tags to comment
        //  redis.hset(`comment_details: ${commentId}`, comment)
        ])
        
        return new Response("OK");
    } catch (error) {
        console.log(error);
    }
}