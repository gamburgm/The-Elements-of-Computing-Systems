import { Command, C_OPERATOR } from './types';

const EQUALITY_OPS = ['lt', 'gt', 'eq'];

const NON_EQUALITY_CODES = {
  'and': 'D&M',
  'or': 'D|M',
  'not': '!D',
  'add': 'D+M',
  'sub': 'D-M',
  'neg': '-D',
};

export function vm(cmds: Command[]): string {
  return cmds.map((cmd, idx) => vmCmd(cmd, idx)).join('\n');
}

export function vmCmd(cmd: Command, idx: number): string {
  if (cmd.kind === "PUSH") {
    return `
    @${cmd.value}
    D=A
    @0
    @M
    M=D
    @0
    M=M+1
    `;
  } else {
    return translateOp(cmd, idx);
  }
}

export function translateOp(cmd: C_OPERATOR, idx: number): string {
  if (EQUALITY_OPS.indexOf(cmd.operator) !== -1) {
    return `
    @0
    @M
    D=M
    @0
    M=M-1
    @M
    D=D-M
    @PUSH${idx}
    D;JEQ
    @0
    @M
    M=0
    @CONTINUE${idx}
    0;JMP

    (PUSH${idx})
    @0
    @M
    M=1
    @CONTINUE${idx}
    0;JMP

    (CONTINUE${idx})
    `;
  } else {
    return `
    @0
    @M
    D=M
    M=M-1
    @M
    M=${NON_EQUALITY_CODES[cmd.operator]}
    `;
  }
}
