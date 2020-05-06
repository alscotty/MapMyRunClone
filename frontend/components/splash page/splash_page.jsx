import React from 'react'

export default function Splash(){
    // let rotateText=[
    //     'great job',
    //     'too fast',
    //     'slow down'
    // ]

                

    // <div id='rotator'>
    {/* </div> */}

    // let images = [
    //     window.losgatosURL,
    //     window.boulderURL,
    //     window.verdugosURL,
    // ]

    // const [imgIdx, rotateImageIdx] = useState(0);

    //  useEffect(()=>{
    //     let int = setInterval(()=>{
    //         let currIdx = (imgIdx + 1) % 3
    //         rotateImageIdx(currIdx);
    //         let item = document.getElementById('rotator');
    //         item.innerText = rotateText[currIdx];
    //     }, 6000);
    //     return(
    //         ()=> {clearInterval(int)}
    //     );
    //     })

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

                {/* <div id='rotated'>
                    <img src={window.losgatosURL} alt='scenic picture'/>
                    <img src={window.boulderURL} alt='scenic picture'/>
                    <img src={window.verdugosURL} alt='scenic picture'/>
                </div> */}
             
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

                <div id='sfview'>
                    <summary >
                        <p id='space-me'>
                            Get social
                            </p>
                    </summary>
                    <section>
                        Follow other runners and share favorite routes
                    </section>
                </div>

            </div>
        )
}
