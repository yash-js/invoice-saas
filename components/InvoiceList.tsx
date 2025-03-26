import InvoiceActions from './InvoiceActions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const InvoiceList = () => {
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
                <TableRow>
                    <TableCell>
                        #1
                    </TableCell>
                    <TableCell>
                        Yash
                    </TableCell>
                    <TableCell>
                        $60.00
                    </TableCell>
                    <TableCell>
                        Paid
                    </TableCell>
                    <TableCell>
                        22/03/2025
                    </TableCell>
                    <TableCell className='text-right'>
                        <InvoiceActions />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default InvoiceList