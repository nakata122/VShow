import React from 'react';
import '../../styles/forms.css';
import observer from '../../helpers/observer';
import requester from '../../helpers/requester';

export default class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event){
        let name = event.target.name;
        let val = event.target.value;

        this.setState({
            [name]: val
        });
    }
    onSubmit(event){
        event.preventDefault();
        if(!this.state.password || !this.state.username){
            observer.fire('notifications', {
                type: 'error',
                message: 'Please fill all of the fields'
            })
        } else {
            requester.post(this.state, '/login')
                .then(res => res.json())
                .then(res => {
                    if(res.type === 'info') {
                        localStorage.setItem('username', res.username);
                        observer.fire('logging', true);
                    }
                    observer.fire('notifications', {
                        type: res.type,
                        message: res.message
                    });
                });
        }

    }
    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <input type='text' name='username' placeholder='username' onChange={this.onChange} />
                <input type='password' name='password' placeholder='password' onChange={this.onChange} />
                
                <button type='submit'>Login</button>
            </form>
        );
    }
}