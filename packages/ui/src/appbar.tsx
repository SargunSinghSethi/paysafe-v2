import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignIn: any,
    onSignOut: any,
}

export const Appbar = ({
    user,onSignIn,onSignOut
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PaySafe
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignOut : onSignIn}>{user? "Logout" : "LogIn"}</Button>
        </div>
    </div>
}