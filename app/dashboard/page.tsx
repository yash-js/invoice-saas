import DashboardBlocks from "@/components/DashboardBlocks";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";
import InvoiceGraph from "@/components/InvoiceGraph";
import RecentInvoices from "@/components/RecentInvoices";
import { prisma } from "@/lib/prisma";
import EmptyState from "@/components/EmptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId
        },
        select: {
            id: true,
        }
    })

    return data
}

async function DashboardPage() {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)
    return (
        <>
            {data?.length < 1 ?

                <EmptyState
                    title="No Invoices Found"
                    description="Create a new invoice to get started"
                    buttonText="Create Invoice"
                    href="/dashboard/invoices/create"
                />

                : <Suspense fallback={<Skeleton className="h-full flex-1 w-full" />}>
                    <DashboardBlocks />
                    <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                        <InvoiceGraph />
                        <RecentInvoices />
                    </div>
                </Suspense>}


        </>
    );
}

export default DashboardPage;