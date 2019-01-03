import React from 'react'
import '../styles/menu.css'
import '../styles/hamburger.css'
import Canvas from '../classes/MenuScreen'
import { Link } from 'react-router-dom'
import Register from './home/Register.js'


export default class Menu extends React.Component {
    constructor(params) {
        super(params);

        this.canvas = new Canvas();
        
        this.state = {menu: false, show: []};
        this.menu = this.menu.bind(this);
    }
    componentDidMount(){
        this.canvas.init(this.refs.menu);
    }
    menu(e){
        if(this.state.menu){
            this.setState({show: []})
            setTimeout(()=>{this.setState({
                menu: false
            });}, 500);
            this.canvas.restarting(false);
        }
        else {
            for(let i=0;i<4;i++){
                setTimeout(()=>{
                    let arr = this.state.show;
                    arr.push(true);
                    this.setState({show: arr});
                }, 150*i);
            }
            this.setState({menu: true});
            this.canvas.restarting(true);
        }
    }
    render(){
        let menu = '', container = 'hidden';
        if(this.state.menu) {
            menu = 'open';
            container = 'menu-container';
        }

        return (
            <div>
                <canvas ref='menu' className={container}/>
                <div id="nav-icon1" className={menu} onClick={this.menu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={'link-container' + (this.state.menu ? '':' hidden')}>
                    <Link to='/' className={this.state.show[0] ? 'show':''}>Home</Link>
                    <Link to='/' className={this.state.show[1] ? 'show':''}>Login/Register</Link>
                    <Link to='/exposition' className={this.state.show[2] ? 'show':''}>Create</Link>
                    <Link to='/contact' className={this.state.show[3] ? 'show':''}>Contact</Link>
                </div>
                <Register></Register>
            </div>
        );
    }
}