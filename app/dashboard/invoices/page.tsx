import InvoiceList from "@/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

function InvoicesPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="">
                        <CardTitle className="text-2xl font-bold">
                            Invoices
                        </CardTitle>
                        <CardDescription>
                            Manage your invoices right here
                        </CardDescription>
                    </div>
                    <Link className={buttonVariants()} href={'/dashboard/invoices/create'}>
                        <Plus /> Create invoice
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <InvoiceList />
            </CardContent>
        </Card>
    );
}

export default InvoicesPage;