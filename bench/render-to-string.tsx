import Benchmark from 'benchmark'
import chalk from 'chalk'
import { h } from 'preact'
import { renderToString } from '../src'

const suite = new Benchmark.Suite

suite.add('renderToString', function () {
  renderToString(<h1>Hello</h1>)
}, {
  minSamples: 20,
  maxTime: 10,
  // onCycle: function() {
  //   console.log('cycling...')
  // },
  onComplete: function() {
    console.log(
      chalk.blue.bold('renderToString')
    )
    console.log(
      chalk.blue('--------------')
    )
    // @ts-ignore
    console.log(chalk.blue(`hz: `) + chalk.whiteBright(this.hz))
    console.log('\n\n')
  }
})
.on('complete', function () {
  // @ts-ignore
  // console.dir(this)
})
.run({
  async: true
})