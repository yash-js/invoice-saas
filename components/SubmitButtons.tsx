'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const SubmitButtons = () => {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled className='w-full'>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Please wait
                </Button>
            ) :
                <Button type="submit" className='w-full'>
                    Submit
                </Button>
            }
        </>
    )
}

export default SubmitButtons