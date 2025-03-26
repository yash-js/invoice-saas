'use client'
import SubmitButtons from "@/components/SubmitButtons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from '@conform-to/react'
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

function OnboardingPage() {
    const [lastResult, action] = useActionState(onboardUser, undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema
            })
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })


    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl text-primary/70 mx-auto">
                        You are almost done!
                    </CardTitle>
                    <CardDescription>
                        Enter your information to complete the onboarding process
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        className="grid gap-4" noValidate
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>
                                    First Name
                                </Label>
                                <Input
                                    id={fields.firstName.id}
                                    key={fields.firstName.key}
                                    name={fields.firstName.name}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="John"
                                />
                                <p className="text-xs text-red-500">{fields.firstName.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>
                                    Last Name
                                </Label>
                                <Input
                                    id={fields.lastName.id}
                                    key={fields.lastName.key}
                                    name={fields.lastName.name}
                                    defaultValue={fields.lastName.initialValue}
                                    placeholder="Doe"
                                />
                                <p className="text-xs text-red-500">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>
                                Address
                            </Label>
                            <Input
                                id={fields.address.id}
                                key={fields.address.key}
                                name={fields.address.name}
                                defaultValue={fields.address.initialValue}
                                placeholder="123 Main Street"
                            />
                            <p className="text-xs text-red-500">{fields.address.errors}</p>
                        </div>

                        <SubmitButtons text="Finish onboarding" />

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default OnboardingPage;