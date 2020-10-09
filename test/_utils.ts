import splitLines from 'split-lines'

export function oneline(s: TemplateStringsArray) {
  return s
    .map(i =>
      splitLines(i)
        .map(x => x.trim())
        .join('')
    )
    .join('')
    .trim()
}
