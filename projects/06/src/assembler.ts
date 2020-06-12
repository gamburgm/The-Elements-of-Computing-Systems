import parse from "./parser"
import { Command } from "./types";

const MEM_LOC = 16;

const BASE_TABLE: Record<string, number> = {
  'SP': 0,
  'LCL': 1,
  'ARG': 2,
  'THIS': 3,
  'THAT': 4,
  'R0': 0,
  'R1': 1,
  'R2': 2,
  'R3': 3,
  'R4': 4,
  'R5': 5,
  'R6': 6,
  'R7': 7,
  'R8': 8,
  'R9': 9,
  'R10': 10,
  'R11': 11,
  'R12': 12,
  'R13': 13,
  'R14': 14,
  'R15': 15,
  'SCREEN': 16384,
  'KBD': 24576,
};

const compMap: Record<string, string> = {
    "0": "0101010",
    "1": "0111111",
    "-1": "0111010",
    "D": "0001100",
    "A": "0110000",
    "!D": "0001101",
    "!A": "0110001",
    "-D": "0001111",
    "-A": "0110011",
    "D+1": "0011111",
    "A+1": "0110111",
    "D-1": "0001110",
    "A-1": "0110010",
    "D+A": "0000010",
    "D-A": "0010011",
    "A-D": "0000111",
    "D&A": "0000000",
    "D|A": "0010101",
    "M": "1110000",
    "!M": "1110001",
    "-M": "1110011",
    "M+1": "1110111",
    "M-1": "1110010",
    "D+M": "1000010",
    "D-M": "1010011",
    "M-D": "1000111",
    "D&M": "1000000",
    "D|M": "1010101",
}

const jumpMap: Record<string, string> = { 
    "null": "000",
    "JGT": "001",
    "JEQ": "010",
    "JGE": "011",
    "JLT": "100",
    "JNE": "101",
    "JLE": "110",
    "JMP": "111"
}

const destMap: Record<string, string> = {
    "M": "001",
    "D": "010",
    "MD": "011",
    "A": "100",
    "AM": "101",
    "AD": "110",
    "AMD": "111",
};

function dec2bin(dec: number): string{
    let converted = dec.toString(2);
    for (let i = converted.length; i < 15; i++) {
        converted = "0" + converted;
    }
    return converted;
}

function buildTable(ast: Command[], table: Record<string, number>): void {
  let idx = 0;
  ast.forEach((cmd: Command) => {
    if (cmd.kind === 'L') {
      table[cmd.symbol] = idx;
    } else {
      idx += 1;
    }
  });
}

function interpret(command: Command, table: Record<string, number>, memLoc: number): [string, number] {
  if (command.kind === "A") {
    if (typeof(command.addr) === 'string') {
      if (command.addr in table) {
        return [`0${dec2bin(table[command.addr])}`, memLoc];
      } else {
        table[command.addr] = memLoc;
        return [`0${dec2bin(table[command.addr])}`, memLoc + 1];
      }
    } else {
      return [`0${dec2bin(command.addr)}`, memLoc];
    }
  } else if (command.kind === "C") {
    let dest = command.dest ? destMap[command.dest] : "000";
    let jump = command.jump ? jumpMap[command.jump] : "000";
    return [`111${compMap[command.comp]}${dest}${jump}`, memLoc];
  }
}

export default function assemble(code: string): string {
  let ast: Command[] = parse(code);
  buildTable(ast, BASE_TABLE);

  let memLoc = MEM_LOC;
  let binary: string;

  return ast.filter((c: Command) => c.kind !== 'L').map((c: Command) => {
    [binary, memLoc] = interpret(c, BASE_TABLE, memLoc);
    return binary;
  }).join('\n');
}
