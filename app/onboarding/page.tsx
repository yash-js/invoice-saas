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
import ErrorMessage from "@/components/ErrorMessage";

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
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#baffd9,transparent)]"></div></div>
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
                                <ErrorMessage error={fields.firstName.errors} />
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

                                <ErrorMessage error={fields.lastName.errors} />
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
                            <ErrorMessage error={fields.address.errors} />
                        </div>

                        <SubmitButtons text="Finish onboarding" />

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default OnboardingPage;