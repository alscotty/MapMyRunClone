import React from 'react'

class Splash extends React.Component{
    render(){
        return(
            <div className='splash'>
                <div id='mtBaldy'>
                    <summary >
                            <p id='space-me'>
                        Go the extra mile
                            </p>
                    </summary>
                    <section>
                        The 20th best web run tracking experience, backed by the world's smallest digital health and fitness community. 
                    </section>
                </div>

                <div id='pRidge'>
                    <summary>
                        <p id='space-me'>
                        Find your own path
                        </p>
                    </summary>
                    <section>
                        Create routes and save them for the next time you're ready to run
                    </section>
                </div>
            </div>
        )
    }


}

export default Splash;