export interface C_ARITHMETIC {
    kind: "Arithmetic",
    operator: string
}

export interface C_PUSH {
    kind: "Push",
    segment: string,
    value: number
}

export type Command = C_ARITHMETIC | C_PUSH;