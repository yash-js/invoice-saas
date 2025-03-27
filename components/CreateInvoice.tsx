'use client'

import React, { useActionState, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { Textarea } from './ui/textarea'
import SubmitButtons from './SubmitButtons'
import { createInvoice } from '@/app/actions'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invoiceSchema } from '@/app/utils/zodSchemas'
import ErrorMessage from './ErrorMessage'
import { formatCurrency } from '@/app/utils/formatCurreny'

const CreateInvoice = () => {
  const [lastResult, action] = useActionState(createInvoice, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      const formDataEntries = Object.fromEntries(formData.entries());

      // Manually add the selected date if missing
      if (!formDataEntries[fields.date.name]) {
        formDataEntries[fields.date.name] = selectedDate.toISOString();
      }

      console.log('formData', formDataEntries);
      return parseWithZod(formData, {
        schema: invoiceSchema
      })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })


  const [selectedDate, setSelectedDate] = useState(new Date())

  const [rate, setRate] = useState('')
  const [quantity, setQuantity] = useState('')
  const [currency, setCurrency] = useState(fields.currency.initialValue || 'INR')

  const calculateTotal = () => {
    const total = (Number(rate) || 0) * (Number(quantity) || 0)
    return total
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardContent className='p-6'>
        <form className='p-6' id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <div className="flex flex-col gap-2 w-fit mb-6">
            <div className="flex items-center gap-2">
              <Badge variant={'secondary'}>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder='Invoice Name'
              />
              <ErrorMessage error={fields.invoiceName.errors} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="">
              <Label>
                Invoice No.
              </Label>
              <div className="flex my-2">
                <span className='px-3 border border-r-0 rounded-l-md bg-muted flex items-center'>#</span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className='rounded-l-none'
                  placeholder='1' />
              </div>
              <ErrorMessage error={fields.invoiceNumber.errors} />
            </div>

            <div className="">
              <Label >
                Currency
              </Label>
              <Select
                name={fields.currency.name}
                key={fields.currency.key}
                value={currency}
                onValueChange={setCurrency}
              >
                <SelectTrigger className='my-2'>
                  <SelectValue placeholder='Select Currency' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='INR'>Indian Rupee - ₹</SelectItem>
                  <SelectItem value='USD'>US Dollar - $</SelectItem>
                  <SelectItem value='EUR'>Euro - €</SelectItem>
                </SelectContent>

              </Select>
              <ErrorMessage error={fields.invoiceNumber.errors} />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>
                From
              </Label>
              <div className="space-y-2">
                <Input name={fields.fromName.name} key={fields.fromName.key} placeholder='Your name' />
                <ErrorMessage error={fields.fromName.errors} />

                <Input name={fields.fromEmail.name} key={fields.fromEmail.key} placeholder='Your Email' />
                <ErrorMessage error={fields.fromEmail.errors} />

                <Input name={fields.fromAddress.name} key={fields.fromAddress.key} placeholder='Your Address' />
                <ErrorMessage error={fields.fromAddress.errors} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <div className="space-y-2">
                <Input name={fields.clientName.name} key={fields.clientName.key} defaultValue={fields.clientName.initialValue} placeholder='Client Name' />
                <ErrorMessage error={fields.clientName.errors} />

                <Input defaultValue={fields.clientEmail.initialValue} name={fields.clientEmail.name} key={fields.clientEmail.key} placeholder='Client Email' />
                <ErrorMessage error={fields.clientEmail.errors} />

                <Input name={fields.clientAddress.name} key={fields.clientAddress.key} defaultValue={fields.clientAddress.initialValue} placeholder='Client Address' />
                <ErrorMessage error={fields.clientAddress.errors} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover >
                <PopoverTrigger className='w-[280px]' asChild>
                  <Button className='text-left justify-start' variant={'outline'}>
                    <CalendarIcon className='' />
                    {selectedDate ? (
                      new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'long',

                      }).format(selectedDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent >
                  <Calendar selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />

                </PopoverContent>
              </Popover>
              <ErrorMessage error={fields.date.errors} />
              <input
                type="hidden"
                name={fields.date.name}
                value={selectedDate.toISOString()}
              /> </div>

            <div className="space-y-2">
              <Label>Invoice Due</Label>
              <Select name={fields.dueDate.name} key={fields.dueDate.key} defaultValue={fields.dueDate.initialValue} >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select Due (in days)' />
                </SelectTrigger>
                <SelectContent className='w-full'>
                  <SelectItem value='0'>
                    Due on Receipt
                  </SelectItem>
                  <SelectItem value='15'>
                    Net 15
                  </SelectItem>
                  <SelectItem value='30'>
                    Net 30
                  </SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage error={fields.dueDate.errors} />
            </div>

          </div>

          <div className="">
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className='col-span-6'>Description</p>
              <p className='col-span-2'>Quantity</p>
              <p className='col-span-2'>Rate</p>
              <p className='col-span-2'>Amount</p>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className='col-span-6'>
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                  placeholder='Item name & Description'
                  className='resize-none'

                />
                <ErrorMessage error={fields.invoiceItemDescription.errors} />
              </div>

              <div className="col-span-2">
                <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} name={fields.invoiceItemQuantity.name} key={fields.invoiceItemQuantity.key} type='number' placeholder='0' />
                <ErrorMessage error={fields.invoiceItemQuantity.errors} />
              </div>

              <div className="col-span-2">
                <Input value={rate} onChange={(e) => setRate(e.target.value)} name={fields.invoiceItemRate.name} key={fields.invoiceItemRate.key} type='number' placeholder='1' />
                <ErrorMessage error={fields.invoiceItemRate.errors} />
              </div>

              <div className="col-span-2">
                <Input value={formatCurrency(calculateTotal(), currency)} disabled />
              </div>

            </div>

          </div>

          <div className="flex justify-end">
            <div className="w-1/3 ">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{formatCurrency(calculateTotal(), currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t  ">
                <input type='hidden' key={fields.total.key} name={fields.total.name} value={calculateTotal()} />
                <span>Total ({currency})</span>
                <span className='font-medium underline underline-offset-2'>{formatCurrency(calculateTotal(), currency)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Note
            </Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder='Add your note here'
              className='resize-none'
            />
          </div>

          <div className="flex items-center justify-end mt-6">
            <div >
              <SubmitButtons text='Send Invoice to client' />
            </div>
          </div>

        </form>
      </CardContent>
    </Card>
  )
}

export default CreateInvoice