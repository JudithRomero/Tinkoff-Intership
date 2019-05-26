function first(callback) {
  setTimeout(callback, 1000)
}

function second(callback) {
  setTimeout(_ => {
    console.log('second f')
    callback()
  })
}

function mainFunction() {}

function parallelComputing(funcs, mainFunction) {
  Promise.all(funcs.map(f => new Promise(f))).then(() => mainFunction())
}

parallelComputing([first, second], () => console.log('after 1s'))
parallelComputing([], () => console.log('fastest'))
