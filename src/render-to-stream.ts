import { Readable } from 'stream'
import { VNode } from 'preact'

const tag = {
  open(type: string): string {
    return `<${type}`
  },
  close(): string {
    return `>`
  },
  end(type: string): string {
    return `</${type}`
  },
  terminate(type: string): string {
    return `</${type}>`
  },
  attr(name: string, value: string): string {
    return `${name}="${value}"`
  },
}

export function renderToStream(code: VNode): Readable {
  const stream = new Readable({
    encoding: 'utf8',
    read() {},
  })

  const resolved = resolveNode(code)

  stream.push(resolved.toString())
  stream.push(null)

  return stream
}

function resolveNode(node: VNode): Buffer {
  const { type } = node
  const props: any = node.props

  let resolved = ''
  let children: any = null

  if (typeof type === 'string') {
    resolved += tag.open(type)
  }

  if (props) {
    const attributes: string[] = Object.keys(props).sort()

    attributes.forEach(attribute => {
      if (attribute === 'children') {
        children = props[attribute]
        return
      }
      if (
        typeof attribute === 'string' &&
        typeof props[attribute] === 'string' &&
        props[attribute] !== '' &&
        props[attribute] !== false
      ) {
        resolved += ' '
        resolved += tag.attr(attribute, props[attribute])
        return
      }
    })

    resolved += tag.close()
  }

  if (children) {
    if (typeof children === 'string') {
      resolved += children
    } else if (typeof children === 'object') {
      const resolvedChildren = resolveNode(children)
      resolved += resolvedChildren.toString()
    }
  }

  if (typeof type === 'string') {
    resolved += tag.terminate(type)
  }

  return Buffer.from(resolved)
}
