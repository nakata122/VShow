import React from 'react'
import '../../styles/forms.css'
import observer from '../../helpers/observer'
import requester from '../../helpers/requester';
import withLogging from '../../hocs/withLogging';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            password2: ''
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
        if(this.state.password !== this.state.password2){
            observer.fire('notifications', {
                type: 'error',
                message: 'Passwords do not match'
            })
        } else if(!this.state.password || !this.state.username || !this.state.password2){
            observer.fire('notifications', {
                type: 'error',
                message: 'Please fill all of the fields'
            })
        } else {
            requester.post(this.state, '/register')
                .then(res => res.json())
                .then(res => {
                    if(res.type === 'info'){
                        localStorage.setItem('username', res.username);
                        observer.fire('logging', true);
                    }
                    observer.fire('notifications', {
                        type: res.type,
                        message: res.message
                    })
                })
        }
    }
    render(){
        let formStyle = 'register';

        if(this.props.animation) formStyle += ' hide';
        else if(this.props.logging) formStyle += ' hidden';

        return (
            <form className={'register-container ' + formStyle} onSubmit={this.onSubmit}>
                <label for='username'>Username</label>
                <input type='text' name='username' placeholder='Enter username' onChange={this.onChange} />
                <label for='password'>Password</label>
                <input type='password' name='password' placeholder='Enter password' onChange={this.onChange} />
                <label for='password2'>Repeat password</label>
                <input type='password' name='password2' placeholder='Repeat password' onChange={this.onChange} />
                <button type='submit' className='registerbtn'>Register</button>
            </form>
        );
    }
}
export default withLogging(Register);