import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Paid from '@/public/paid.png'
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import SubmitButtons from "@/components/SubmitButtons"
import { markAsPaid } from "@/app/actions"
import { requireUser } from "@/app/utils/hooks"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


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


const MarkAsPaidPage = async ({ params }: { params: Params }) => {
    const session = await requireUser()
    const { invoiceId } = await params
    await authorize(invoiceId as string, session.user?.id as string)

    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>
                        Mark as Paid?
                    </CardTitle>
                    <CardDescription>
                        Are you sure you want to mark this invoice as paid?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={Paid}
                        alt="paid"
                        className="rounded-lg"
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link href={`/dashboard/invoices`} className={buttonVariants({
                        variant: "outline",
                    })}>
                        Cancel
                    </Link>
                    <form action={markAsPaid}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <SubmitButtons text="Mark as Paid" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MarkAsPaidPage