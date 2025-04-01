'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Props {
    id: string,
    status: string
}


const InvoiceActions = ({ id, status }: Props) => {

    const handleSendReminder = async (id: string) => {
        toast.promise(fetch(`/api/email/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }), {
            loading: "Sending Reminder",
            success: "Reminder Email Sent",
            error: "Failed to send reminder!"
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'secondary'}>
                    <MoreHorizontal className='size-4 ' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild   >
                    <Link href={`/dashboard/invoices/${id}`}>
                        <Pencil className='size-4 mr-2' />
                        Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild   >
                    <Link target='_blank' href={`/api/invoice/${id}`}>
                        <DownloadCloud className='size-4 mr-2' />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSendReminder(id)}>
                    <Mail className='size-4 mr-2' />
                    Reminder Email
                </DropdownMenuItem>
                {status != 'PAID' ? <DropdownMenuItem asChild   >
                    <Link href={`/dashboard/invoices/${id}/paid`}>
                        <CheckCircle className='size-4 mr-2' />
                        Mark as Paid
                    </Link>
                </DropdownMenuItem>
                    : null
                }
                <DropdownMenuItem asChild   >
                    <Link href={`/dashboard/invoices/${id}/delete`}>
                        <Trash className='size-4 mr-2' />
                        Delete Invoice
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions