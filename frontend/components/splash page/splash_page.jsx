import React from 'react'

class Splash extends React.Component{
    render(){
        return(
            <div className='splash'>
                <h1>Welcome</h1>
                <img id='splash1' src={window.splash1URL} alt="inspirational running pic"/>

            </div>
        )
    }


}

export default Splash;