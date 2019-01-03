let c, ctx, time = 0;
let pnoise = [];
let museum, gallery, intervalId = 0;
let slideshow, index=false;

export default class SplashScreen{
    init(canvas){
        c = canvas;
        ctx = c.getContext("2d");

        c.width = window.innerWidth-5;
        c.height = window.innerHeight;

        museum = new Image();
        museum.src = require('../resources/museumBlur.jpg');
        gallery = new Image();
        gallery.src = require('../resources/bust.jpg');
        slideshow = {0:museum, 1:gallery};
        
        museum.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(museum, 0, 0, c.width, c.height);
        }

        for(let i=0;i<1000;i++){
            pnoise[i] = Math.random()*1.5-0.3;
        }

        
    }
    restarting(){
        index = !index;
        time=0;
        this.unmount();
        intervalId = setInterval(this.gameLoop.bind(this), 100/3);
    }
    noise(t) {
        t=t%200;
        return this.lerp(pnoise[Math.floor(t)], pnoise[Math.ceil(t)], t-Math.floor(t));
    }
    lerp(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    }
    gameLoop(){
        let x = Math.floor(Math.random() * c.width);
        let y = Math.floor(Math.random() * c.height);
        let wid = Math.floor(Math.random() * 200)+10;
        let hei = Math.floor(Math.random() * 200)+10;
        //ctx.putImageData(museum, 0, 0, x+wid, y+hei, wid, hei);
        //let imageData = ctx.getImageData(0,0, c.width, c.height);
        //ctx.putImageData(imageData, 0, 0);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation="source-over";
        ctx.fillStyle = "white"; 
        ctx.clearRect(0, 0, c.width, c.height); 

        ctx.beginPath();
        for(let i=0;i<80;i++){
            ctx.lineTo(this.noise(time + i * 2)*c.width, this.noise(time + 500 + i * 2)*c.height);
        }
        ctx.fillStyle = "black"; 
        ctx.globalAlpha = Math.max(0, (time*3));
        ctx.fill();

        ctx.globalCompositeOperation="source-in";
        let num = Math.max(1-time,0)*20;
        if(time*10<1){
            ctx.globalAlpha = Math.max(0,1-time*10);
            ctx.drawImage(slideshow[Number(index)], num, 0, c.width+num, c.height);
        } else {
            ctx.globalAlpha = Math.min(1, (time*5-0.5));
            ctx.drawImage(slideshow[Number(!index)], -num, -num, c.width+num, c.height+num);
        }

        ctx.globalCompositeOperation = "destination-over";

        ctx.globalAlpha = Math.max(0,1-time*10);
        ctx.drawImage(slideshow[Number(index)], 0, 0, c.width, c.height);
            
        ctx.globalAlpha = Math.min(1, time*10);
        ctx.drawImage(slideshow[Number(!index)], 0, 0, c.width, c.height);
        

        ctx.globalCompositeOperation="source-over";
        
        if(time > 1) this.unmount();

        time+=0.01;
    }
    unmount(){
        clearInterval(intervalId);
    }
}