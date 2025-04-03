import InvoiceList from "@/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
                <Suspense fallback={
                    <Skeleton
                    className="h-[500px] w-full"
                    />
                }>
                    <InvoiceList />
                </Suspense>
            </CardContent>
        </Card>
    );
}

export default InvoicesPage;