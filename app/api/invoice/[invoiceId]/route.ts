import { getCurrencySymbol } from "@/app/utils/formatCurreny"
import { prisma } from "@/lib/prisma"
import jsPDF from 'jspdf'
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
    const { invoiceId } = await params

    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        },
        select: {
            id: true,
            total: true,
            status: true,
            createdAt: true,
            invoiceNumber: true,
            currency: true,
            invoiceName: true,
            invoiceItemDescription: true,
            invoiceItemQuantity: true,
            invoiceItemRate: true,
            fromAddress: true,
            fromName: true,
            fromEmail: true,
            clientAddress: true,
            clientEmail: true,
            clientName: true,
            date: true,
            dueDate: true,
            note: true,
        }
    })

    if (!data) {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })

    // Set font
    pdf.setFont('helvetica')

    // Set Header
    pdf.setFontSize(24)
    pdf.text(data.invoiceName, 20, 20)

    //From
    pdf.setFontSize(12)
    pdf.text("From", 20, 40)
    pdf.setFontSize(10)
    pdf.text([data.fromName, data.fromAddress, data.fromEmail], 20, 45)

    // Client
    pdf.setFontSize(12)
    pdf.text("Bill to", 20, 70)
    pdf.setFontSize(10)
    pdf.text([data.clientName, data.clientAddress, data.clientEmail], 20, 75)

    // Invoice Details
    pdf.setFontSize(10)
    pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40)
    pdf.text(`Date: ${new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long'
    }).format(data.createdAt)}`, 120, 45)
    pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50)

    //Item Table header
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text("Description", 20, 100)
    pdf.text("Quantity", 100, 100)
    pdf.text("Rate", 130, 100)
    pdf.text("Total", 160, 100)

    // Draw Header Line
    pdf.line(20, 102, 190, 102)

    //Item Table Body
    pdf.setFont('helvetica', 'normal')
    pdf.text(data.invoiceItemDescription, 20, 110)
    pdf.text(data.invoiceItemQuantity.toString(), 100, 110)
    pdf.text(`${getCurrencySymbol(data.currency || 'INR')} ${data.invoiceItemRate}`, 130, 110)
    pdf.text(`${getCurrencySymbol(data.currency || 'INR')} ${data.total}`, 160, 110)


    // Total Section

    pdf.line(20, 115, 190, 115)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Total (${getCurrencySymbol(data.currency || 'INR')})`, 130, 130)
    pdf.text(`${getCurrencySymbol(data.currency || 'INR')} ${data.total}`, 160, 130)

data.note = 'This is a test'    
    // Additional Notes
    if(data.note) {
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        pdf.text("Note:", 20, 150)
        pdf.text(data.note, 20, 155)
    }

    // Generate PDF as Buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Return PDF as Response
    return new NextResponse(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${data.invoiceName}.pdf"`, //Inline shows the file in the browser
        },
    })

}