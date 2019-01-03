import React from 'react'
import ReactDOM from 'react-dom'

import ThreeContainer from '../ThreeJS/ThreeContainer.js'
import Header from '../Header'

export default class Exposition extends React.Component {
    constructor(params){
        super(params);
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }
    
    render(){

        return (
            <div>
                <Header></Header>
                <ThreeContainer></ThreeContainer>
            </div>
        )
    }
}