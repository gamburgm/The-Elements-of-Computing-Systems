import parse from './parser';

console.log(parse(`
@1
M=1
@2
A=0
A=A+D;JGT
//bananaphone

@6
0;JMP
`));
