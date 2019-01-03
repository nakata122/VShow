let c, ctx, time = 0, toggle;
let pnoise = [];
let intervalId = 0;

export default class SplashScreen{
    init(canvas){
        c = canvas;
        ctx = c.getContext("2d");

        c.width = window.innerWidth;
        c.height = window.innerHeight;

        for(let i=0;i<1000;i++){
            pnoise[i] = Math.random();
        }
    }
    restarting(tog){
        toggle = tog;
        if(tog) time=0;
        else time=1;
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
        ctx.fillStyle = "#767d76"; 
        ctx.clearRect(0, 0, c.width, c.height); 
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, c.width, c.height); 
 
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white"; 

        //Easy in easy out 
        let duration = Math.pow(Math.sin(Math.PI*Math.min(time, 1)/2), 6);

        ctx.beginPath();
        ctx.arc(c.width-50, 20, duration*1000, 0, 2 * Math.PI);
        ctx.fill();
   

        if(toggle) time+=0.08;
        else time-=0.08;
    }
    unmount(){
        clearInterval(intervalId);
    }
}