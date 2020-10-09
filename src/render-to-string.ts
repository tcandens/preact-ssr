import { VNode } from 'preact'
export function renderToString(code: VNode, context: string[] = []) {
  if (code === null || typeof code === 'boolean') {
    return ''
  }
  const { type } = code
  const props: any = code.props

  const chunks: string[] = []
  let children: any = null

  chunks.push(`<${type}`)

  if (props) {
    const attributes: string[] = Object.keys(props).sort()
    
    attributes.forEach((attribute) => {
      if (attribute === 'children') {
        children = props[attribute]
        return
      }
      if (typeof attribute !== 'string') {
        return
      }
      chunks.push(' ', attribute, '=', '"', (props[attribute] as string), '"')
    })
  }

  chunks.push(`>`)

  if (children) {
    if (typeof children === 'string') {
      chunks.push(children)
    } else if (typeof children === 'object') {
      chunks.push(renderToString(children))
    }
  }

  chunks.push(`</${type}>`)

  return context.concat(chunks).join('')
}