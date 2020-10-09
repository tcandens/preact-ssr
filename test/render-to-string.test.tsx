import { h } from 'preact'
import { renderToString } from '../src';

describe('renderToString', () => {
  it('renders simple string', () => {
    const code = <div>Hello</div>
    const rendered = renderToString(code)
    expect(rendered).toBe('<div>Hello<div>')
  });
});
