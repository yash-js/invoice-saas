'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface Props {
    text: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}


const SubmitButtons = ({ text = "Submit", variant = "default" }: Props) => {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button variant={variant} disabled className='w-full'>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Please wait
                </Button>
            ) :
                <Button variant={variant} type="submit" className='w-full cursor-pointer'>
                    {text}
                </Button>
            }
        </>
    )
}

export default SubmitButtons