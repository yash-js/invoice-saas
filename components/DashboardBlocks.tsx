import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import DashboardCard from "./DashboardCard"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/app/utils/hooks"
import { formatCurrency } from "@/app/utils/formatCurreny"



async function getData(userId: string) {
    const [data, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId
            },
            select: {
                total: true,
            }
        }),

        prisma.invoice.findMany({
            where: {
                userId,
                status: 'PENDING'
            },
            select: {
                id: true,
            }
        }),

        prisma.invoice.findMany({
            where: {
                userId,
                status: 'PAID'
            },
            select: {
                id: true,
            }
        }),

    ])

    return {
        data,
        openInvoices,
        paidInvoices
    }

}

const DashboardBlocks = async () => {
    const session = await requireUser()
    const { data, openInvoices, paidInvoices } = await getData(session.user?.id as string)


    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <DashboardCard
                Icon={DollarSign}
                title="Total Revenue"
                stat={formatCurrency(data.reduce((a, b) => a + b.total, 0), 'INR')}
                description="Based on total volume"
            />
            <DashboardCard
                Icon={Users}
                title="Total Invoices Issued"
                stat={`+${data.length}`}
                description="Total invoices issued!"
            />
            <DashboardCard
                Icon={CreditCard}
                title="Paid Invoices"
                stat={`+${paidInvoices.length}`}
                description="Total invoices which are paid"
            />
            <DashboardCard
                Icon={Activity}
                title="Pending Invoices"
                stat={`+${openInvoices.length}`}
                description="Total invoices which are pending"
            />


        </div>
    )
}

export default DashboardBlocks