'use server'

import { requireUser } from "./utils/hooks"
import { parseWithZod } from '@conform-to/zod'
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { emailClient } from "./utils/mailtrap"
import { formatCurrency } from "./utils/formatCurreny"

export async function onboardUser(prevState: any, formData: FormData) {

    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: onboardingSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    })

    return redirect('/dashboard')

}

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            invoiceName: submission.value.invoiceName,
            total: submission.value.total,
            status: submission.value.status,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromName: submission.value.fromName,
            fromEmail: submission.value.fromEmail,
            fromAddress: submission.value.fromAddress,
            clientName: submission.value.clientName,
            clientEmail: submission.value.clientEmail,
            clientAddress: submission.value.clientAddress,
            currency: submission.value.currency,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            userId: session.user?.id
        }
    })

    const sender = {
        email: "hello@owlcraft.in",
        name: "BillVance",
    };
    emailClient.send({
        from: sender,
        to: [{ email: submission.value.clientEmail }],
        template_uuid: "22e78f8c-dd74-4737-9b2f-c35534cd4053",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long'
            }).format(new Date(submission.value.dueDate)),
            "totalAmount": formatCurrency(submission.value.total, submission.value.currency),
            "invoiceLink": `${process.env.BASE_URL}/api/invoice/${data.id}`,
        },
        headers: {
            "Message-ID": `<${Date.now()}@owlcraft.in>`, // Unique Message-ID
            "References": "", // Ensure it's blank
            "In-Reply-To": "" // Ensure it's blank
        },
    })

    redirect('/dashboard/invoices')
}

export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser()


    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get('id') as string,
            userId: session.user?.id
        },
        data: {
            invoiceName: submission.value.invoiceName,
            total: submission.value.total,
            status: submission.value.status,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromName: submission.value.fromName,
            fromEmail: submission.value.fromEmail,
            fromAddress: submission.value.fromAddress,
            clientName: submission.value.clientName,
            clientEmail: submission.value.clientEmail,
            clientAddress: submission.value.clientAddress,
            currency: submission.value.currency,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
        }
    })
    const sender = {
        email: "hello@owlcraft.in",
        name: "BillVance",
    };
    emailClient.send({
        from: sender,
        to: [{ email: submission.value.clientEmail }],
        template_uuid: "5f4a3c2a-d420-4b13-b371-e18cc5f61046",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long'
            }).format(new Date(submission.value.date)),
            "totalAmount": formatCurrency(submission.value.total, submission.value.currency),
            "invoiceLink": `${process.env.BASE_URL}/api/invoice/${data.id}`,
        },
        headers: {
            "Message-ID": `<${Date.now()}@owlcraft.in>`, // Unique Message-ID
            "References": "", // Ensure it's blank
            "In-Reply-To": "" // Ensure it's blank
        },
    })
    return redirect('/dashboard/invoices')

}

export async function deleteInvoice(formData: FormData) {
    const session = await requireUser()
    const id = formData.get('id') as string
    await prisma.invoice.deleteMany({ where: { id, userId: session.user?.id } })
    return redirect('/dashboard/invoices')
}

export async function markAsPaid(formData: FormData) {
    const session = await requireUser()
    const id = formData.get('id') as string
    await prisma.invoice.updateMany({ where: { id, userId: session.user?.id }, data: { status: 'PAID' } })
    return redirect('/dashboard/invoices')
}