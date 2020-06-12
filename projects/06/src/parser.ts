import { Command, Register, Jump, CCommand } from './types';

export default function parse(commands: string): Command[] {
  return commands.split('\n').map((str: string) => parseCmd(str.trim())).filter((v: Command) => v !== null);
}

function parseCmd(cmd: string): Command {
  if (cmd.length === 0) return null;
  else if (cmd[0] === '/') return null;
  else if (cmd[0] === '@') {
    let variable = cmd.slice(1);
    let parsedVar = parseInt(variable);
    let addr: string | number;

    if (isNaN(parsedVar)) {
      addr = variable;
    } else {
      addr = parsedVar;
    }

    return {
      kind: 'A',
      addr,
    };
  } else if (cmd[0] === '(') {
    let closeIdx = cmd.indexOf(')');
    return {
      kind: 'L',
      symbol: cmd.slice(1, closeIdx),
    };
  } else {
    return parseCCommand(cmd);
  }
}

function parseCCommand(cmd: string): CCommand {
  let equalsIdx = cmd.indexOf('=');
  let semiIdx = cmd.indexOf(';');

  if (equalsIdx >= 0 && semiIdx >= 0) {
    return {
      kind: 'C',
      dest: cmd.slice(0, equalsIdx) as Register,
      comp: cmd.slice(equalsIdx + 1, semiIdx),
      jump: cmd.slice(semiIdx + 1, cmd.length) as Jump,
    };
  } else if (equalsIdx >= 0) {
    return {
      kind: 'C',
      dest: cmd.slice(0, equalsIdx) as Register,
      comp: cmd.slice(equalsIdx + 1, cmd.length),
    };
  } else {
    return {
      kind: 'C',
      comp: cmd.slice(0, semiIdx),
      jump: cmd.slice(semiIdx + 1, cmd.length) as Jump,
    };
  }
}
