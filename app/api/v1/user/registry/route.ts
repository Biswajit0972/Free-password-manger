import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { arrayBufferToBase64 } from "@/app/_utils/functions/keyHelper";
import { databaseConnection } from "@/app/_lib/db/database";
import { UserModel } from "@/app/_lib/models/user/user.model";


export async function POST(request: Request) {
    await databaseConnection();
    const weebhookSecret = process.env.CLERK_WEB_HOOK_SECRET_KEY_USER;
    if (!weebhookSecret) {
        throw new Error("Webhook secret is not defined");
    }

    const headerPlayLoad = await headers();
    const svix_id = headerPlayLoad.get("svix-id");
    const svix_timestamp = headerPlayLoad.get("svix-timestamp");
    const svix_signature = headerPlayLoad.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error("Missing svix headers");
    }

    const wh = new Webhook(weebhookSecret);
    const payload = await request.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;

        if (evt.type === "user.created") {
            // ! lets fix it 
            console.log(evt.data);

            const updatedId = evt.data.id.split("_")[1];

            const exisitingUser = await UserModel.findOne({ clerkId: updatedId });

            if (exisitingUser) {
                throw new Error("User already exists");
            }
            // ! encyption part started here
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const saltEn = crypto.getRandomValues(new Uint8Array(16));
            const keyIv = crypto.getRandomValues(new Uint8Array(12));
            const dataIv = crypto.getRandomValues(new Uint8Array(12));

            const saltDataKey = arrayBufferToBase64(salt.buffer);
            const saltEnKey = arrayBufferToBase64(saltEn.buffer);
            const EnIvKey = arrayBufferToBase64(keyIv.buffer);
            const EnIvData = arrayBufferToBase64(dataIv.buffer);

            const user = new UserModel({
                clerkId: updatedId,
                email: evt.data.email_addresses[0].email_address,
                firstName: evt.data.first_name,
                lastName: evt.data.last_name,
                imageUrl: evt.data.image_url,
                lastSignInAt: evt.data.last_sign_in_at,
                createdAt: evt.data.created_at,
                saltDataKey,
                saltEnKey,
                EnIvKey,
                EnIvData
            });

            await user.save();
            console.log("user created in database");
            return new Response(JSON.stringify(user), { status: 200 });

        } else if (evt.type === "user.updated") {

            const updatedId = evt.data.id.split("_")[1];

            const user = await UserModel.findOne({ clerkId: updatedId });

            if (!user) {
                throw new Error("User not found");
            }

            const updatedUser = await UserModel.updateOne({ clerkId: updatedId }, {
                email: evt.data.email_addresses[0].email_address,
                firstName: evt.data.first_name,
                lastName: evt.data.last_name,
                imageUrl: evt.data.image_url,
                lastSignInAt: evt.data.last_sign_in_at,
                createdAt: evt.data.created_at,
            });

            if (!updatedUser) throw new Error("User not updated");

            console.log("user updated in database");
            return new Response(JSON.stringify(updatedUser), { status: 200 });

        } else if (evt.type === "user.deleted") {

            const deletdId = evt.data.id?.split("_")[1];

            const user = await UserModel.findOne({ clerkId: deletdId });

            if (!user) {
                throw new Error("User not found");
            }

            await UserModel.deleteOne({ clerkId: user.clerkId });
            console.log("user deleted from database");
            return new Response("user deleted from database", { status: 200 });
        }

    } catch (err) {
        console.log(err);
        return new Response("error", { status: 500 });
    }
}