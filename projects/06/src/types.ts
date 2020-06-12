/*
 * First character possibilities:
 * 0. Nothing: nothing
 * 1. forward slash: comment
 * 2. @: A-Command
 * 3. (: Symbol definition
 * 4. Anything else: C-command
 */

export type MemLoc = 'SP'
                   | 'LCL'
                   | 'ARG'
                   | 'THIS'
                   | 'THAT'
                   | 'R0'
                   | 'R1'
                   | 'R2'
                   | 'R3'
                   | 'R4'
                   | 'R5'
                   | 'R6'
                   | 'R7'
                   | 'R8'
                   | 'R9'
                   | 'R1'
                   | 'R11'
                   | 'R12'
                   | 'R13'
                   | 'R14'
                   | 'R15'
                   | 'SCREEN'
                   | 'KBD';

export type Register = 'A' | 'M' | 'D';

export type Command = ACommand | CCommand | LCommand;

export interface ACommand {
  kind: 'A',
  addr: string | number,
}

export interface CCommand {
  kind: 'C',
  dest?: Register,
  comp: Comp,
  jump?: Jump,
}

export interface LCommand {
  kind: 'L',
  symbol: string,
}

export type Comp = string;

export type Jump = 'JMP'
                 | 'JGT'
                 | 'JEQ'
                 | 'JGE'
                 | 'JLT'
                 | 'JNE'
                 | 'JLE'
                 | 'JMP';
