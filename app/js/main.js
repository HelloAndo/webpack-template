// import $ from 'jquery'
import moment from 'moment'
console.log($)
import demo, { a } from './a.js'
import 'babel-polyfill'

console.log('---------------')
// console.log('main.js : ' + a)

// $('#naruto').attr('src', $('#chutian').attr('src'))

// let person = {
//   name: 'susan',
//   sex: 'lady'
// }
// Object.assign(person, {
//   age: 18
// })
// console.log(person)


// var promise = new Promise((resolve, reject) => {
//   setTimeout(function() {
//     resolve(33)
//   }, 500);
// })
// promise.then(res => {
//   console.log(res)
// })

// es7_test
// function sleep (time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(time)
//       resolve(time)
//     }, time)
//   })
// }

// (async () => {
//   await sleep(1000)
//   await sleep(2000)
//   console.log('经过3秒了')
// })()

function xhr (url, opt) {
  var dtd = $.Deferred()
  $.ajax({
    url: url,
    method: 'POST',
    data: opt,
    timeout: 500,
    success: (res, textStatus) => {
      console.log(res, textStatus)
      dtd.resolve(res, textStatus)
    },
    error: (xhr, textStatus, err) => {
      console.log(xhr, textStatus, err)
      dtd.reject(xhr, textStatus)
    }
  })
  return dtd.promise()
}

function tryRegister (url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      data: data
    })
      .done(res => {
        resolve(res)
      })
      .fail(res => {
        reject(res)
      })

    // setTimeout(() => {
    //   reject(url)
    //   // resolve(url)
    // }, 200)
  })
}

function timeTryRegister (times) {
  let count = 1
  return async function register (aUrls) {
    count++
    for (var i = 0; i < aUrls.length; i++) {
      try {
        let res = await tryRegister(aUrls[i], {q: '我爱'})
        // if (!res.code) {
        if (res) {
          (() => {
            // 注册服务器正常返回了！
            console.log('try', res)
          })()
        }
        break     // 跳出循环
      } catch (e) {
        // 注册服务器返回错误（超时/链路错误?）
        console.log('catch', e)
      }
    }
    // 一次循环注册失败，且不超过预设的循环次数，则继续循环
    i >= aUrls.length 
      && count <= times
      && register(aUrls)
  }
}

var reg = timeTryRegister(3)
reg(['https://api.douban.com/v2/music/search', 
     'https://api.douban.com/v2/book/search'])