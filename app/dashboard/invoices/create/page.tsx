import { requireUser } from "@/app/utils/hooks";
import CreateInvoice from "@/components/CreateInvoice";
import { prisma } from "@/lib/prisma";

async function getUserData(userId: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
            email: true
        }
    })

    return data

}


async function InvoiceCreationPage() {

    const session = await requireUser()

    const data = await getUserData(session.user?.id as string)

    return (
        <CreateInvoice address={data?.address as string} email={data?.email as string} firstName={data?.firstName as string} lastName={data?.lastName as string} />
    );
}

export default InvoiceCreationPage;