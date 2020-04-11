import React, {useState, useEffect} from 'react'

export default function Splash(){
    let rotateText=[
        'great job',
        'too fast',
        'slow down'
    ]

    let images = [
        window.losgatosURL,
        window.boulderURL,
        window.verdugoURL,
    ]

    const [imgIdx, rotateImageIdx] = useState(0);

     useEffect(()=>{
        let int = setInterval(()=>{
            let currIdx = (imgIdx + 1) % 3
            rotateImageIdx(currIdx);
            let item = document.getElementById('rotator');
            item.innerText = rotateText[currIdx];
        }, 3000);
        return(
            ()=> {clearInterval(int)}
        );
        })

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
                <div id='rotator'>
                </div>
                {imgIdx}
                <img src={images[imgIdx]} alt="scenic pictures"/>

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
