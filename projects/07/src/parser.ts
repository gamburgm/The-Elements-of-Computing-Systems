import {
    Command
} from "./types";

const ArithmeticCommands: string[] 
    = ["add" , "sub", "neg", "eq", "gt", "lt", "and", "or", "not"];

function parseLine(code: string): Command {
    let parts = code.trim().split(" ");
    if (parts.length === 0 || parts.length === 1 && parts[0] == "") return null;
    else if (parts[0] === "//") return null;
    else if (parts.length === 1) {
        return {
            kind: "OPERATOR",
            operator: parts[0]
        }
    } else {
        return {
            kind: "PUSH",
            segment: parts[1],
            value: parseInt(parts[2])
        }
    }
}


export function parse(code: string): Command[] {
    let lines = code.split("\n");
    return lines.map(parseLine).filter(line => line !== null);
}
