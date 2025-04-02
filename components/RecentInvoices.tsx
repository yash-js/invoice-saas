import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/app/utils/hooks'
import { formatCurrency } from '@/app/utils/formatCurreny'

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            clientName: true,
            clientEmail: true,
            total: true,
            currency: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 7
    })

    return data
}

const RecentInvoices = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Invoices
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
                {data.map((invoice) => (
                    <div key={invoice.id} className="flex items-center gap-4">
                        <Avatar className='hidden sm:flex size-9'>
                            <AvatarFallback>
                                {invoice.clientName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                            <p className='text-sm font-medium leading-none'>{invoice.clientName}</p>
                            <p className='text-sm text-muted-foreground'>{invoice.clientEmail}</p>
                        </div>
                        <div className="ml-auto font-medium">
                            +{formatCurrency(invoice.total, invoice.currency)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentInvoices