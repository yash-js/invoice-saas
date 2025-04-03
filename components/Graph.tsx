'use client'

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

interface Props {
    data: {
        date: string
        amount: number
    }[]
}


const Graph = ({ data }: Props) => {


    return (
        <ChartContainer
            config={{
                amount: {
                    label: "Amount",
                    color: "var(--primary)",
                }
            }}
            className="min-h-[300px]"
        >
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <LineChart data={data}>
                    <XAxis dataKey={"date"} />
                    <YAxis />
                    <ChartTooltip
                        content={<ChartTooltipContent indicator="line" />}

                    />
                    <Line
                        type={'monotone'}
                        dataKey={'amount'}
                        stroke="var(--color-amount)"
                        strokeWidth={2}

                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

export default Graph