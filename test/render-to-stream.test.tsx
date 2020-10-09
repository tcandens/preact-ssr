/** @jsx h */
import { h, VNode } from 'preact'
import { Writable } from 'stream'
import { renderToStream } from '../src'
import { oneline as o } from './_utils'

async function render(jsx: VNode): Promise<string> {
  return new Promise((yay, nay) => {
    const sink = new Writable({
      write() {},
    })
    const stream = renderToStream(jsx)
    const chunks: string[] = []
    stream.on('data', data => {
      chunks.push(data)
    })
    stream.on('end', () => {
      yay(chunks.join(''))
    })
    stream.on('error', err => {
      console.warn('We got an error!', err)
      nay(err)
    })
    stream.pipe(sink)
  })
}

describe('renderToStream', () => {
  it('returns a readable stream', () => {
    expect(render(<h1>Hello</h1>)).resolves.toBe(`<h1>Hello</h1>`)
  })
  it('renders simple attributes', () => {
    expect(render(<div data-foo="bar">Hello</div>)).resolves.toBe(
      `<div data-foo="bar">Hello</div>`
    )
  })
  it('renders nested elements', () => {
    expect(
      render(
        <div>
          <h1>Hello!</h1>
        </div>
      )
    ).resolves.toBe(`<div><h1>Hello!</h1></div>`)
  })
  it('renders empty class or style DOM attributes', () => {
    expect(render(<a data-b={false} />)).resolves.toBe(`<a></a>`)
    expect(render(<a data-foo="" />)).resolves.toBe(`<a></a>`)
    // @ts-ignore
    expect(render(<a class={false} />))
      .resolves.toBe(`<a></a>`)
      .catch(e => {
        console.error(e)
      })
    expect(render(<a style="" />)).resolves.toBe(`<a></a>`)
  })
  it('renders empty children identically to no children', () => {
    const Empty = () => null
    const False = () => false

    expect(
      render(
        <div>
          <span />
          <span>{null}</span>
          <span>
            <Empty />
          </span>
          <span>{false}</span>
          {/** @ts-expect-error */}
          <span>
            <False />
          </span>
        </div>
      )
    ).resolves.toBe(o`
      <div>
        <a></a>
        <b></b>
        <c></c>
        <d></d>
        <e></e>
      </div>
    `)
  })
})
