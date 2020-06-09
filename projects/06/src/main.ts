import assemble from './assembler';

console.log(assemble(`
@2
D=A
@3
D=D+A
@0
M=D
`));
