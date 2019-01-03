import React from 'react'
import '../styles/header.css';
import logo from '../resources/logo.jpg'
import Menu from './Menu'
import {Link} from 'react-router-dom'

class Header extends React.Component {
    
    constructor(params) {
        super(params);

        this.state = {showHeader: false};
        this.showHeader = this.showHeader.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.showHeader);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.showHeader);
    }
    showHeader() {
        let scroll = window.pageYOffset;
        if(scroll > 10) this.setState({showHeader: true});
        else this.setState({showHeader: false});
    }
    render() {
        let showHeader = this.state.showHeader ? '':'nav-up';


        return (
            <div>
                <header className={showHeader}>
                    <img src={logo}></img>
                    <Menu></Menu>
                <Link to='/login'>Login/Register</Link>
                </header>
            </div>
        );

    }
}
export default Header;