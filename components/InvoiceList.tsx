import { prisma } from '@/lib/prisma'
import InvoiceActions from './InvoiceActions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { requireUser } from '@/app/utils/hooks'
import { formatCurrency } from '@/app/utils/formatCurreny'
import { Badge } from './ui/badge'
import EmptyState from './EmptyState'

async function getData(userId: string) {
    
    const data = await prisma.invoice.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            status: true,
            createdAt: true,
            invoiceNumber: true,
            currency: true
        }
    })

    return data
}

const InvoiceList = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)

    if (data.length < 1) return (
        <EmptyState
            title="No Invoices Found"
            description="Create a new invoice to get started"
          
        />
    )

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Invoice ID
                    </TableHead>
                    <TableHead>
                        Customer
                    </TableHead>
                    <TableHead>
                        Amount
                    </TableHead>
                    <TableHead>
                        Status
                    </TableHead>
                    <TableHead>
                        Date
                    </TableHead>
                    <TableHead className='text-right'>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>
                            {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>
                            {invoice.clientName}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(invoice.total, invoice.currency)}
                        </TableCell>
                        <TableCell>
                            <Badge variant={invoice.status === 'PAID' ? 'default' : 'outline'}>
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {new Intl.DateTimeFormat('en-US', {
                                dateStyle: 'medium',

                            }).format(invoice.createdAt)}
                        </TableCell>
                        <TableCell className='text-right'>
                            <InvoiceActions id={invoice.id} status={invoice.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default InvoiceList