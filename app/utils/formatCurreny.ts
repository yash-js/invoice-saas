export function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

const currencies: Record<string, string> = {
    INR: 'Rs.',
    USD: '$',
    EUR: '€'
}

export function getCurrencySymbol(currency: string) {
    return currencies[currency]
}