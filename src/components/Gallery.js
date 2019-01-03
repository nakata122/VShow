import React from 'react'
import ReactDOM from 'react-dom';
import withLogging from '../hocs/withLogging';
import Canvas from '../classes/SplashScreen';
import '../styles/text.css';
import observer from '../helpers/observer';

class Gallery extends React.Component {
    
    constructor(params) {
        super(params);
        this.canvas = new Canvas();
        this.state = {hidden: true, display: false, interval: ''};
        this.toggle = this.toggle.bind(this);
        this.darken = this.darken.bind(this);
    }

    componentDidMount() {
        this.refs.title2.style='display:none;';
        this.canvas.init(this.refs.game);
        this.toggle();
        let autoShow = setInterval(()=>{
            this.toggle();
        },8000);
        setTimeout(()=>{
            this.setState({hidden:true, interval: autoShow});
        },1000);
        window.addEventListener('scroll', this.darken);
    }

    componentWillUnmount() {
        this.canvas.unmount();
        clearTimeout(this.state.interval);
        window.removeEventListener('scroll', this.darken);
    }

    toggle() {
        if(this.state.display){
            this.refs.title1.style='display:none;';
            this.refs.title2.style='display:block;';
        }
        else {
            this.refs.title1.style='display:block;';
            this.refs.title2.style='display:none;';
        }

        this.canvas.restarting();

        
        this.setState({hidden:false, display: !this.state.display});
        setTimeout(()=>{this.setState({hidden:true});},200);
        console.log('Left');
    }

    darken() {
        let scroll = window.pageYOffset;
        ReactDOM.findDOMNode(this.refs.gallery).style.filter = 'brightness(' + (100-scroll/6) + '%)';
        ReactDOM.findDOMNode(this.refs.gallery).style.top = (-scroll/4) + 'px';
    }

    render() {
        let title = 'text hidden';

        if(this.state.hidden) {
            title = 'text';
        }

        return (
            <div className='gallery-container' ref='gallery'>
                <canvas ref='game' className='game-container'/>
                <ul className={title} ref='title1'>
                    <li>V</li>
                    <li className="ghost">I</li>
                    <li className="ghost">R</li>
                    <li className="ghost">T</li>
                    <li className="ghost">U</li>
                    <li className="ghost">A</li>
                    <li className="ghost">L</li>
                    <li className="spaced">S</li>
                    <li className="ghost">H</li>
                    <li className="ghost">O</li>
                    <li className="ghost">W</li>
                </ul>

                <ul className={title} ref='title2'>
                    <li>G</li>
                    <li className="ghost">A</li>
                    <li className="ghost">L</li>
                    <li className="ghost">L</li>
                    <li className="ghost">E</li>
                    <li className="ghost">R</li>
                    <li className="ghost">Y</li>
                </ul>
                <button className="round left" onClick={this.toggle}>&#8249;</button>
                <button className="round right" onClick={this.toggle}>&#8250;</button>
            </div>
        );

    }
}
export default Gallery;