import './icons'
import Swiper from './swiper.js'
/*
class player {
    constructor(node) {
        this.root = typeof node === 'string' ? document.querySelector(node) : node;
        this.$ = selector => this.root.querySelector(selector)
        this.$$ = selector => this.root.querySelectorAll(selector)
        this.songList = [];
        this.currentIndex = 0;
        this.audio = new Audio();
        this.start()
        this.bind()
    }
    start() {
        fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
            .then(res => res.json())
            .then(data => {
                this.songList = data
                this.renderSong()//异步放在回调里面
            })
    }

    bind() {
        let self = this
        this.root.querySelector('.btn-play-pause').onclick = function () {
            if (this.classList.contains('playing')) {
                self.audio.pause()
                this.classList.remove('playing')
                this.classList.add('pause')
                this.querySelector('use').setAttribute('xlink:href', '#icon-play')

            } else if (this.classList.contains('pause')) {
                self.audio.play()
                this.classList.remove('pause')
                this.classList.add('playing')
                this.querySelector('use').setAttribute('xlink:href', '#icon-pause')
            }
        }

        this.root.querySelector('.btn-pre').onclick = function () {
            self.playPreSong()
            self.btnIsplay()//播放上下首的时候要保证播放按钮是播放状态
        }
        this.root.querySelector('.btn-next').onclick = function () {
            self.playNextSong()
            self.btnIsplay()
        }
        
        this.audio.ontimeupdate = function(){
            self.locatelyric()
        }

        let swiper = new Swiper('.area-effect')
        swiper.on('swipLeft', function () {
            this.classList.remove('panelLeft')//swiper库中已经为ontouchmove绑定了this为传进来的DOM节点
            this.classList.add('panelRight')
            self.ballsTransform()
        })
        swiper.on('swipRight', function () {
            this.classList.remove('panelRight')
            this.classList.add('panelLeft')
            self.ballsTransform()
        })
    }

    setlyrics(lyrics) {
        this.lyricIndex = 0
        let fragment = document.createDocumentFragment()
        let lyricsArr = []
        this.lyricsArr = lyricsArr
        lyrics.split(/\n/)//以换行符为分隔符，把歌曲信息字符串分割[[[00:48:12.36][02:48:12.36]明天]，[[00:28:12.36][01:48:12.36]岁月],]
            .filter(str => str.match(/\[.+?\]/))//过滤所有只有时间的数组
            .forEach(line => {//每一行
                let str = line.replace(/\[.+?\]/g, '')//过滤所有时间[00:28:12.36][02:48:12.36]，得到歌词+
                line.match(/\[.+?\]/g).forEach(t => {//[[00:48:12.36][02:48:12.36]明天]获取单一时间[00:48:12.36]
                    t = t.replace(/[\[\]]/g, '')//转换时间格式为00:28:12.36
                    let milliseconds = parseInt(t.slice(0, 2)) * 60 * 1000 + parseInt(t.slice(3, 5) * 1000 + parseInt(t.slice(6)))
                    lyricsArr.push([milliseconds, str])//
                })
            })
        lyricsArr.sort((v1, v2) => {//按时间升序排序
            if (v1[0] > v2[0]) {
                return 1
            } else {
                return -1
            }
        }).forEach(line => {
            let node = document.createElement('p')
            node.setAttribute('data-time', line[0])
            node.innerHTML = line[1]
            fragment.appendChild(node)
        })
        this.$('.lyrics-container').innerHTML = ''
        this.$('.lyrics-container').appendChild(fragment)
    }

    locatelyric() {
        let currentTime = this.audio.currentTime * 1000
        let nextLineTime = this.lyricsArr[this.lyricIndex + 1][0]
        if(currentTime>nextLineTime&&this.lyricIndex<this.lyricsArr.length-1){//this.lyricIndex最大=this.lyricsArr.length-1时为最后一首歌词，有因为进入判断内会自加所以小于
            this.lyricIndex++
            let node =this.$('[data-time="'+this.lyricsArr[this.lyricIndex][0]+'"]')
            this.centerLyricLight(node)
        }
    }

    centerLyricLight(node) {//居中的
        let offset = node.offsetTop - (this.$('.panel-lyricd').offsetHeight / 2)//歌词要居中移动的距离是歌词里父元素顶部的距离-
        offset > 0 ? offset : 0
        this.$('.lyrics-container').style.transform = `translateY(-${offset}px)`
        this.$$('.lyrics-container p').forEach((node) => node.classList.remove('current'))
        node.classList.add('current')
    }
    renderSong() {
        let songObj = this.songList[this.currentIndex]
        this.$('.header h1').innerText = songObj.title
        this.$('.header p').innerText = songObj.author + '-' + songObj.albumn
        this.audio.src = songObj.url
        this.loadlyric()
    }
    loadlyric() {
        fetch(this.songList[this.currentIndex].lyric)
            .then(res => res.json())
            .then(data => this.setlyrics(data.lrc.lyric))
    }
    ballsTransform() {
        let balls = this.root.querySelector('.balls')
        if (this.root.querySelector('.area-effect').classList.contains('panelRight')) {
            balls.querySelector('.current').classList.remove('current')
            balls.querySelectorAll('span')[1].classList.add('current')
        } else {
            balls.querySelectorAll('span')[0].classList.add('current')
            balls.querySelectorAll('span')[1].classList.remove('current')
        }
    }
    btnIsplay() {
        let btnIsplay = this.root.querySelector('.btn-play-pause')
        btnIsplay.classList.remove('pause')
        btnIsplay.classList.add('playing')
        btnIsplay.querySelector('use').setAttribute('xlink:href', '#icon-pause')//播放下一首歌时，播放键是播放状态
    }
    playPreSong() {
        this.currentIndex = (this.songList.length + this.currentIndex - 1) % this.songList.length//4-1%4 = 3
        this.audio.src = this.songList[this.currentIndex].url
        this.renderSong()
        this.audio.play()
    }
    playNextSong() {
        this.currentIndex = (this.currentIndex + 1) % this.songList.length//4+3+1%4 = 0
        this.audio.src = this.songList[this.currentIndex].url
        this.audio.play()
    }
}

new player('#player')
*/
class Player{
    constructor(node){
        this.root = typeof node === 'string'?document.querySelector(node):node
        this.$ = selector=>this.root.querySelector(selector)
        this.$$ =selector=>this.root.querySelectorAll(selector)
        this.songList = []
        this.currentIndex =0
        this.audio = new Audio()
        this.lyricsArr = []
        this.lyricIndex = -1 //

        this.start()
        this.bind()
    }
    start(){
        fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
            .then(res => res.json())
            .then(data => {
                this.songList = data
                this.renderSong()
                
            })
    }

    bind(){
        let self =this
        this.root.querySelector('.btn-play-pause').onclick = function(){
            if(this.classList.contains('pause')){
                self.audio.play()
                this.classList.remove('pause')
                this.classList.add('playing')
                this.querySelector('use').setAttribute('xlink:href','#icon-pause')
            }else if(this.classList.contains('playing')){
                self.audio.pause()
                this.classList.remove('playing')
                this.classList.add('pause')
                this.querySelector('use').setAttribute('xlink:href','#icon-play')
            }
        }
        this.root.querySelector('.btn-pre').onclick = function(){
            self.playPreSong()
            self.btnToPlay()
        }
        this.root.querySelector('.btn-next').onclick = function(){
            self.playNextSong()
            self.btnToPlay()
        }
        this.root.querySelector('.btn-order').onclick = function(){
            self.audio.currentTime = 0
        }
        
        this.root.querySelector('.timebar').onclick = function(e){
            let precent = e.offsetX/this.clientWidth//点击位置在进度条的百分比
            self.audio.currentTime = precent*self.audio.duration//歌曲进度等于百分比乘歌曲时常
            self.setProgress()//通过currentTime的改变影响进度条位置
            self.lyricTO()
        }

        this.audio.ontimeupdate= ()=>{
            self.locatelyric()
            self.setProgress()
        }

        let swiper = new Swiper('.area-effect')
        swiper.on('swipLeft',function(){
            this.classList.add('panelRight')
            this.classList.remove('panelLeft')
            
        })
        swiper.on('swipRight',function(){
            this.classList.add('panelLeft')
            this.classList.remove('panelRight')
        })
    }

    renderSong(){
        let songObj = this.songList[this.currentIndex]
        this.$('.header h1').innerText = songObj.title
        this.$('.header p').innerText =songObj.author + '-' + songObj.albumn
        this.audio.src = songObj.url //初始化音乐播放器
        this.audio.onloadedmetadata = () => this.$('.time-end').innerText = this.formateTime(this.audio.duration)//当audio的src加载完，可以直接读取audio的duration
        this.loadlyric()
        
    }
    loadlyric(){
        fetch(this.songList[this.currentIndex].lyric)
        .then(res=>res.json())
        .then(data=>this.setlyrics(data.lrc.lyric))
    }
    setlyrics(lyrics){
        this.lyricIndex = 0
        let fragment = document.createDocumentFragment('')
        let lyricsArr  = []
        this.lyricsArr = lyricsArr
        lyrics.split(/\n/)
        .filter(str=>str.match(/\[.+?\]/))
        .forEach(line=>{
            let str = line.replace(/\[.+?\]/g,'')
            line.match(/\[.+?\]/g).forEach(t=>{
                t = t.replace(/[\[\]]/g,'')
                let milliseconds = t.slice(0,2)*1000*60 + t.slice(3,5)*1000 + parseInt(t.slice(6))
                this.lyricsArr.push([milliseconds,str]) 
            })
        })
        this.lyricsArr.sort((v1,v2)=>{//根据时间将数组排序
            if(v1[0]>v2[0]){
                return 1
            }else{
                return -1
            }
        }).forEach((line)=>{
            let node = document.createElement('p')
            node.setAttribute('data-time',line[0])
            node.innerHTML = line[1]
            fragment.appendChild(node)
        })
        this.root.querySelector('.lyrics-container').innerHTML = ''
        this.root.querySelector('.lyrics-container').appendChild(fragment)
    }
    
    lyricTO(){
        let currentTime = this.audio.currentTime*1000 
        let n=this.lyricsArr.length;
        for(let i =0;i<n;i++){
            if(currentTime>this.lyricsArr[i][0]&& this.lyricIndex<this.lyricsArr.length-1){
                this.lyricIndex++;
            }else if(currentTime<this.lyricsArr[this.lyricIndex][0]&& this.lyricIndex>0){
                this.lyricIndex--;
            }
        }
        let node = this.$('[data-time="'+ this.lyricsArr[this.lyricIndex][0]+'"]')
        this.centerLyricLight(node)
        this.$$('.lyric p')[0].innerText = this.lyricsArr[this.lyricIndex][1]
        this.$$('.lyric p')[1].innerText = this.lyricsArr[this.lyricIndex + 1]?this.lyricsArr[this.lyricIndex + 1][1]:''
    }//只能正向

    locatelyric(){
        let currentTime = this.audio.currentTime*1000 
        let nextLineTime =  this.lyricsArr[this.lyricIndex + 1][0]
        if(currentTime>nextLineTime&& this.lyricIndex<this.lyricsArr.length-1){
            this.lyricIndex++;
            let node = this.$('[data-time="'+ this.lyricsArr[this.lyricIndex][0]+'"]')
            this.centerLyricLight(node)
            this.$$('.lyric p')[0].innerText = this.lyricsArr[this.lyricIndex][1]
            this.$$('.lyric p')[1].innerText = this.lyricsArr[this.lyricIndex + 1]?this.lyricsArr[this.lyricIndex + 1][1]:''
        }
    }
    centerLyricLight(node){
        let offset = node.offsetTop - (this.$('.panel-lyricd').offsetHeight/2)//歌词居中时歌词容器的偏移距离为歌词距容器顶部的距离减去窗口的一半高度
        offset>0?offset:0
        this.$('.lyrics-container').style.transform = `translateY(-${offset}px)`
        this.$$('.lyrics-container p').forEach((node) => node.classList.remove('current'))
        node.classList.add('current')

    }

    setProgress(){
        let precent = (this.audio.currentTime*100/this.audio.duration) + '%'//都是以秒计算*100是应为百分比
        this.$('.progress').style.width= precent
        this.$('.time-start').innerText = this.formateTime(this.audio.currentTime)
        
    }

    formateTime(secondsTotal){
        let minute = parseInt(secondsTotal/60)
        minute = minute>=10?''+minute: '0' + minute
        let seconds = parseInt(secondsTotal%60)
        seconds = seconds>=10?''+seconds:'0'+seconds
        return minute + ':' + seconds
    }

    playPreSong(){
        this.currentIndex = (this.songList.length+this.currentIndex-1)%this.songList.length
        this.audio.src = this.songList[this.currentIndex]
        this.renderSong()
        this.audio.play()
    }
    
    playNextSong(){
        this.currentIndex = (this.currentIndex+1)%this.songList.length
        this.audio.src = this.songList[this.currentIndex]
        this.renderSong()
        this.audio.play()
    }

    btnToPlay(){
        let btnToPlay = this.root.querySelector('.btn-play-pause')
        btnToPlay.classList.remove('pause')
        btnToPlay.classList.add('playing')
        btnToPlay.querySelector('use').setAttribute('xlink:href','#icon-pause')
    }

    setballs(){
        let balls = this.root.querySelectorAll('.balls span')
        if(this.root.querySelector('.area-effect').classList.contains('panelRight')){
            balls[0].classList.remove('current')
            balls[1].classList.add('current')
        }else{
            balls[0].classList.add('current')
            balls[1].classList.remove('current')
        }
    }
}
new Player('#player')