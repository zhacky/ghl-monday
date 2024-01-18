import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Page() {
    // const redirectUrl = "http://localhost:3000/auth-handler";
    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
    const url = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=${redirectUrl}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=conversations/message.readonly conversations/message.write`;
    return (
        <main className="items-center p-24">
            <p>Connect your GHL profile</p>
            <Button asChild>
                <Link href={url}>Connect</Link>
            </Button>

        </main>
    );

}