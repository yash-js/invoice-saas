import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

async function DashboardPage() {
    const session = await requireUser()

    return (
        <div>
            <h1>Dashboard</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}

export default DashboardPage;