import { h } from 'preact'
import { renderToString } from '../src';

describe('renderToString', () => {
  it('renders empty for empty nodes', () => {
    // @ts-expect-error
    return expect(renderToString(true)).toBe('');
  })
  it('renders simple string', () => {
    const code = <div>Hello</div>
    const rendered = renderToString(code)
    expect(rendered).toBe('<div>Hello</div>')
  });
  it('render simple attributes', () => {
    expect(renderToString(<div data-attr="foo">Hello</div>)).toBe(`<div data-attr="foo">Hello</div>`)
  })
  it('renders nested native elements', () => {
    expect(renderToString(<div><span>Hello</span></div>)).toBe(`<div><span>Hello</span></div>`)
  })
});
