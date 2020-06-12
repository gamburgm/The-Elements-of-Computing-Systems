import { readFileSync } from 'fs';
import assemble from './assembler';

console.log(assemble(readFileSync('/dev/stdin').toString()));
