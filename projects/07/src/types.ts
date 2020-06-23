export interface C_OPERATOR {
    kind: "OPERATOR",
    operator: string
}

export interface C_PUSH {
    kind: "PUSH",
    segment: string,
    value: number
}

export type Command = C_OPERATOR | C_PUSH;
