const convert = (date: Date) => {
    return new Date(date).toISOString().slice(0,10).replace(/-/g,".")
}

export const DateUtil = {
    convert
}