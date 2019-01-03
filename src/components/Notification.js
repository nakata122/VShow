import React from 'react'
import observer from '../helpers/observer';
import '../styles/notifications.css'

export default class Notification extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            type: '',
            message: '',
            timeout: 0
        };

        observer.subscribe('notifications', (notif) => {
            clearTimeout(this.state.timeout);
            let id = setTimeout(() => {
                this.setState({
                    type: '',
                    message: '',
                    timeout: 0
                });
            }, 2000);

            this.setState({
                type: notif.type,
                message: notif.message,
                timeout: id
            });

        });
    }

    render(){
        return (
            <div id='notifications'>
                <div id={this.state.type + "Box"} className="notification">
                    <span>{this.state.message}</span>
                </div>
            </div>
        );
    }
}