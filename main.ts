import { Token } from "../transpiller-scripting/frontend/lexer.ts"

const token = `
test test
second line
`

function tokenizer(srcCode: string) {
  console.log("source:", srcCode)
  const Tokens = new Array<Token>();
  const src = srcCode.split(" ")
  return srcCode
}

const TestInput = tokenizer(token);