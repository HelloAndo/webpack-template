
import demo, { a } from './a.js'

console.log(demo.a)
console.log('main.js : ' + a)

$('#naruto').attr('src', $('#chutian').attr('src'))

let person = {
  name: 'susan',
  sex: 'lady'
}
Object.assign(person, {
  age: 18
})
console.log(person)


var promise = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(33)
  }, 500);
})
promise.then(res => {
  console.log(res)
})
