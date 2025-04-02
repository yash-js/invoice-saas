import { LucideProps } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface DashboardCardProps {
    title: string
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    stat: number | string
    description: string
}


const DashboardCard = ({ Icon, description, stat, title }: DashboardCardProps) => {
    return (
        <Card className="max-h-fit">
            <CardHeader className="flex flow-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <h2 className="text-2xl font-bold">
                    {stat}
                </h2>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export default DashboardCard