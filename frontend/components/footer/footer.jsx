import React from 'react'

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <a id="git" target='_blank' href="https://github.com/alscotty">
                    <img src={window.githubURL} alt="githublink"/>
                </a>
                <a id="linked" target='_blank' href="https://www.linkedin.com/in/adam-scott-4b0808108/">
                    <img src={window.linkedInURL} alt="linkedInlink"/>
                </a>
                <a id="angel" target='_blank' href="https://angel.co/adam-scott-18">
                    <img src={window.angelURL} alt="angellistlink"/>
                </a>
            </div>
        )
    }
};

export default Footer;