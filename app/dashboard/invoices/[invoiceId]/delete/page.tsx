import { requireUser } from "@/app/utils/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"
import Warning from '@/public/warning.svg'
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import SubmitButtons from "@/components/SubmitButtons"
import { deleteInvoice } from "@/app/actions"

async function authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    });

    if (!data) {
        return redirect("/dashboard/invoices");
    }
}

type Params = Promise<{ invoiceId: string }>

export default async function DeleteInvoice({ params }: { params: Params }) {
    const session = await requireUser()
    const { invoiceId } = await params

    await authorize(invoiceId as string, session.user?.id as string)

    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Delete Invoice</CardTitle>
                    <CardDescription>Are you sure you want to delete this invoice?</CardDescription>
                </CardHeader>

                <CardContent>
                    <Image
                        src={Warning}
                        alt="warning"
                        className="rounded-lg"
                    />
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                    <Link className={buttonVariants({
                        variant: "outline",
                    })} href={`/dashboard/invoices`}>
                        Cancel
                    </Link>
                    <form action={deleteInvoice}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <SubmitButtons variant={'destructive'} text="Delete Invoice"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}