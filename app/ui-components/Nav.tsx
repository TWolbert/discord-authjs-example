import { Search } from "@/components/dashboard/search";
import { SignIn } from "@/components/dashboard/signIn";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Session } from "next-auth";

export default function Navbar({ session }: Readonly<{ session: Session | null }>) { 
    return (
        <div>
            <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            {session ? (
                <>
                    <Search />
                    <SignIn />
                </>
            ) : (
                <SignIn />
            )}
            </div>
        </div>
    );
}