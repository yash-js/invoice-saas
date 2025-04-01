import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
    try {
        const session = await requireUser()

        const { invoiceId } = await params
        console.log(' invoiceId   ', invoiceId);
        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id
            }
        })
        if (!invoiceData) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
        }


        const sender = {
            email: "hello@owlcraft.in",
            name: "BillVance",
        };
        emailClient.send({
            from: sender,
            to: [{ email: invoiceData.clientEmail }],
            template_uuid: "768b7cf0-5645-4e8f-8521-215c41652fa3",
            template_variables: {
                "company_info_name": invoiceData.clientName,
                "first_name": invoiceData.clientName,
            },
            headers: {
                "Message-ID": `<${Date.now()}@owlcraft.in>`, // Unique Message-ID
                "References": "", // Ensure it's blank
                "In-Reply-To": "" // Ensure it's blank
            },
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to send reminder!" }, { status: 500 })
    }
}