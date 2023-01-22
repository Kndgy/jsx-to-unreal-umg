export interface Token {
  value: string, // raw value
  type: any, // temporary
}

const token = `
test test
second line
`

function tokenizer(srcCode: string) {
  console.log("source:", srcCode)
  const Tokens = new Array<Token>();
  const src = srcCode.split(" ")
  return Tokens;
}

const TestInput = tokenizer(token);