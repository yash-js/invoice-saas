import { Ban, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

interface EmptyStateProps {

    title: string
    description: string
    buttonText?: string
    href?: string
}


const EmptyState = ({ buttonText, description, href = '', title = '' }: EmptyStateProps) => {
    return (
        <div className="flex flex-1 h-full items-center justify-center flex-col rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
                <Ban className='size-10 text-primary' />
            </div>
            <h2 className='mt-6 text-xl font-semibold '>
                {title}
            </h2>
            <p className='mb-8 mt-2 text-muted-foreground max-w-sm mx-auto text-center text-sm'>
                {description}
            </p>
            {(buttonText && href) && <Link href={href} className={buttonVariants()}>
                <PlusCircle className='size-4 mr-1' /> {buttonText}
            </Link>}
        </div>
    )
}

export default EmptyState