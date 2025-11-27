import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

export function Hero(){
    useGSAP(() => {
        const heroSplit = new SplitText('.title', {
            type: 'chars, words'
        });

        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines'
        });

        // apply classname of text-gradient
        heroSplit.chars.forEach((char) => {
            char.classList.add('text-gradient')
        });
        // apply animation to title (start)
        gsap.from(heroSplit.chars, {
            yPercent: 100, //where it coming from; start at y-axis
            duration: 1.8,
            ease: 'expo.out', //smooth springy feel
            stagger: 0.06 // each character comes in after another
        });

        // apply animation to text line (start)
        gsap.from(paragraphSplit.lines, {
            opacity: 0, //animate from opacity 0
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1 //start 1 second after the headline finishes. if remove, it will show at the same time which is so much to see
        });

        // add animation for the leaves; based on scrolltrigger
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero', // watch the trigger on hero section; once we reach #hero
                start: 'top top', //top of the homepage hit the top of the screen
                end: 'bottom top', //when the bottom of the homepage hits the top of the screen
                scrub: true, //animation progress will be directly to the scroll so it will feel natural
            }
        })
        .to('.right-leaf', { y: 200 }, 0) //right leaf move down
        .to('.left-leaf', {y: -200}, 0)   //top leaf move up
    }, []);

    return(
        <>
            <section id="hero" className="noisy">
                <h1 className="title">
                    MOHITO
                </h1>

                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />

                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>
                                Cool, Crisp, Classic
                            </p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
 