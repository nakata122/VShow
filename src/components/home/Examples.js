import React from 'react'

import LeaderboardItem from './LeaderboardItem';
import requester from '../../helpers/requester'
import withLogging from '../../hocs/withLogging';
import observer from '../../helpers/observer';

class Leaderboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            usernames: []
        };

    }
    componentDidMount(){
        requester.get('/topTen')
            .then(res => res.json())
            .then(res => {
                if(res.type !== 'error')
                    this.setState({
                        usernames: res
                    });
                else
                    observer.fire('notifications', res);
            })
    }
    render(){
        let items = [];
        items = this.state.usernames.map((name, index) => {
            return <LeaderboardItem key={index} name={name} index={index} />;
        });

        let leadStyle = 'leaderboard';
        if(this.props.animation) leadStyle += ' hide';
        else if(this.props.logging) leadStyle += ' hidden';

        return (
            <div className={leadStyle}>
                <h2>Leaderboard</h2>
                {items}
            </div>
        );
    }
}

export default withLogging(Leaderboard);