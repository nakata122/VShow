import React from 'react'
import ReactDOM from 'react-dom'

import Header from '../Header'
import Gallery from '../Gallery'
import '../../styles/text.css'

export default class Home extends React.Component {
    constructor(params){
        super(params);
    }
    
    render(){

        return (
            <div>
                <Header></Header>
                <Gallery></Gallery>
                <div className='content'>
                    <h1>About</h1>
                    <h4>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut malesuada risus, et venenatis quam. Curabitur neque justo, tincidunt non tempus eget, iaculis lobortis leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi dapibus aliquet suscipit. Nunc maximus faucibus elementum. Curabitur interdum pellentesque quam sed bibendum. Curabitur maximus semper sodales.
                    </h4>
                    <h1>Examples</h1>
                    
                </div>
            </div>
        )
    }
}