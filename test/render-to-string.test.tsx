/** @jsx h */
import { h } from 'preact'
import { renderToString } from '../src'
import { oneline as d } from './_utils'

describe('renderToString', () => {
  it('renders empty for empty nodes', () => {
    // @ts-expect-error
    return expect(renderToString(true)).toBe('')
  })
  it('renders simple element', () => {
    expect(renderToString(<div>Hello</div>)).toEqual(d`
      <div>
        Hello
      </div>
    `)
  })
  it('renders an attribute', () => {
    expect(renderToString(<div data-attr="foo">Hello</div>)).toBe(
      `<div data-attr="foo">Hello</div>`
    )
  })
  it('renders nested native elements', () => {
    expect(
      renderToString(
        <div>
          <span>Hello</span>
        </div>
      )
    ).toBe(`<div><span>Hello</span></div>`)
  })
})
