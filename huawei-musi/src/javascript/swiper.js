/*
let swiper = (function () {
    let root = document
    let eventHub ={'swipLeft':[],'swipRight':[]}
    function bind(node) {
        root = node
    }
    function on(type, fn) {
        if (eventHub[type]) {
            eventHub[type].push(fn)//函数on接受一个字符串和函数，将函数放进eventHub
        }
    }
    let startX
    let moveEndX
    let clock
    root.ontouchstart = function (e) {
        startX = e.changedTouches[0].pageX
    }
    root.ontouchmove = function (e) {
        if (colck) clearTimeout(clock)
        clock = setTimeout(() => {
            moveEndX = e.changedTouches[0].pageX
            if (moveEndX - startX > 0) {
                eventHub['swipRight'].forEach(fn=>fn())
            } else if (moveEndX - startX < 0) {
                eventHub['swipleft'].forEach(fn=>fn())
            }
        },100)
    }//覆盖节点的ontouchstart和ontouchmove事件
    return {
        bind: bind,
        on: on
    }
})()
Swipter.bind(document.querySelector('#box'))

Swipter.on('swipLeft', function() {
  console.log('swipLeft')
})
Swipter.on('swipLeft', function() {
  console.log('swipLeft 111')
})

Swipter.on('swipRight', function() {
  console.log('swipRight')
})
Swipter.on('swipRight', function() {
  console.log('swipRight 222')
})
*/


class Swiper {
    constructor(node) {
        if (!node) throw new Error('需要传递需要绑定的DOM元素')
        let root = typeof node === 'string' ? document.querySelector(node) : node
        let eventHub = { 'swipLeft': [], 'swipRight': [] ,'swipUp':[],'swipDown':[]}

        let startX
        let startY
        let moveEndX
        let moveEndY
        let clock

        root.ontouchstart = function (e) {
            startX = e.changedTouches[0].pageX
        }

        root.ontouchmove = function (e) {
            if (clock) clearTimeout(clock)
            clock = setTimeout(() => {
                moveEndX = e.changedTouches[0].pageX
                if (moveEndX - startX > 50) {//减少对触碰的灵敏度，判断调用事件对象的那个事件
                    eventHub['swipRight'].forEach(fn => fn.bind(root)())//执行的每个函数绑定root
                } else if (startX - moveEndX > 50) {
                    eventHub['swipLeft'].forEach(fn => fn.bind(root)())
                }else if(moveEndY - startY > 50){
                    eventHub['swipDown'].forEach(fn=>fn.bind(root)())
                }else if(startY - moveEndY > 50){
                    eventHub['swipUp'].forEach(fn=>fn.bind(root)())
                }
            }, 100)
        }//给对应绑定的Dom元素写方法

        this.on = function (type, fn) {
            if (eventHub[type]) {
                eventHub[type].push(fn)
            }
        }

        this.off = function (type, fn) {
            let index = eventHub[type].indexOf(fn)
            if (index !== -1) {
                eventHub[type].splice(index, 1)
            }
        }
    }

}

//
/*
let swiper = new Swiper('#box') 手势绑定对象
swiper.on('swipLeft', ()=>{     swiper on 给不同事件添加函数
  console.log('left')
})
swiper.on('swipRight', ()=>{
  console.log('right')
})

let onLeft = () => console.log('left 2')
swiper.on('swipLeft', onLeft)
swiper.off('swipLeft', onLeft)
*/


export default Swiper


