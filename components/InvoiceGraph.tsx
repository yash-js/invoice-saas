import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Graph from './Graph'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/app/utils/hooks'

async function getInvoices(userId: string) {

    const rawData = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            }
        },

        select: {
            createdAt: true,
            total: true,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const aggregatedData = rawData.reduce((acc: { [key: string]: number }, curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
        acc[date] = (acc[date] || 0) + curr.total

        return acc
    }, {})

    const transformedData = Object.entries(aggregatedData).map(([date, amount]) => ({
        date,
        amount,
        originalDate: new Date(date + "," + new Date().getFullYear()),
    })).sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime()).map(({ date, amount }) => ({ date, amount }))

    return transformedData

}

const InvoiceGraph = async () => {
    const session = await requireUser()
    const data = await getInvoices(session.user?.id as string)
    return (
        <Card className='lg:col-span-2'>
            <CardHeader>
                <CardTitle>Paid invoices</CardTitle>
                <CardDescription>
                    Invoices which are paid in last 30 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Graph data={data} />
            </CardContent>
        </Card>
    )
}

export default InvoiceGraph