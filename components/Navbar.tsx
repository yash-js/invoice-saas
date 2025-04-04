import { ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between py-5">
            <Link href={'/'} className="flex items-center gap-2">
                <ReceiptText className="size-10 bg-primary text-primary-foreground p-1 rounded-lg" />
                <h3 className="text-2xl font-bold">Bill<span className="text-primary/80">Vance</span></h3>
            </Link>
            <Link href={'/login'} className={buttonVariants()}>
                Get Started</Link>
        </div>
    )
}
