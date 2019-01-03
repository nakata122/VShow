import React from 'react';
import observer from '../../helpers/observer';
import requester from '../../helpers/requester';

export default class Logout extends React.Component {
    logout(event) {
        requester.get('/logout')
            .then(res => res.json())
            .then(res => {
                localStorage.removeItem('username');
                observer.fire('logging', false);
                observer.fire('notifications', {
                    type: res.type,
                    message: res.message
                });
            })
    }
    render(){
        let style={
            float: 'left'
        };

        return (
            <div style={style}>
                <button className='menu-button' onClick={this.logout}>Logout</button>
            </div>
        );
    }
}