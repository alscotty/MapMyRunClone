import React from 'react'

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <a id="git" href="https://github.com/alscotty">
                    <img src={window.githubURL} alt="githublink"/>
                </a>
                <a id="linked" href="https://www.linkedin.com/in/adam-scott-4b0808108/">
                    <img src={window.linkedInURL} alt="linkedInlink"/>
                </a>
            </div>
        )
    }
};

export default Footer;