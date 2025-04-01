import { requireUser } from "@/app/utils/hooks";
import EditInvoice from "@/components/EditInvoice";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


async function getData(id: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!data) return notFound()

    return data
}

type Params = Promise<{ invoiceId: string }>

async function EditInvoicePage({ params }: { params: Params }) {
    const { invoiceId } = await params

    const session = await requireUser()
    const data = await getData(invoiceId as string, session.user?.id as string)

    return (
        <EditInvoice data={data} />
    );
}

export default EditInvoicePage;