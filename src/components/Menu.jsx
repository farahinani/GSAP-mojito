import { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Menu(){
    const contentRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);

    // provide something inside dependency array : currentIndex
    // it will rerun all the animation within it whenever the variable changes
    useGSAP(() => {
        gsap.fromTo('#title', {
            opacity: 0
        },{
            opacity: 1,
            duration: 1
        });

        // animate the cocktail images
        gsap.fromTo('.cocktail img', {
            opacity: 0,
            xPercent: -100
        },{
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
        });

        gsap.fromTo('.details h2', {
            yPercent: 100,
            opacity: 0
        },{
            yPercent: 0,
            opacity: 100,
            ease: 'power1.inOut'
        });

        gsap.fromTo('.details p', {
            yPercent: 100,
            opacity: 0
        },{
            yPercent: 0,
            opacity: 100,
            ease: 'power1.inOut'
        });

        // for the leaf
        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '#menu',
        //         start: 'top top',
        //         end: 'bottom top',
        //         scrub: true
        //     },
        // })
        // .to('.right-leaf', { y: 200 }, 0)
        // .to('.left-leaf', {y: -200}, 0)

    },[currentIndex]);

    const totalCocktails = sliderLists.length;

    //-this function accept index
    const goToSlide = (index) => {
        /*  -figure out which index we're trying to go to
            -use modular operator
            -we can check if index we're currently on + totalnumberofcocktails is equally divisible by totalnumberofcocktails and it'll return a number that is not zero; then we'll set to the index. Else, we'll return it to zero. so it'll restart once again once we reach the number is greater than four (we have 4 list of cocktails)
            - slider will move infinitely to the right and then restart once reach 4
        */
        const newIndex = (index + totalCocktails) % totalCocktails;

        // change the state so that it points to the new index
        setCurrentIndex(newIndex);
    }

    /* problem: how do we know which cocktail is the current one and which ones are previous next ones?
        solution (the function below): 
        get index offset (which going to be the first second and so on )
    */
   const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
   }

   const currentCocktail = getCocktailAt(0);
   const prevCocktail = getCocktailAt(-1);
   const nextCocktail = getCocktailAt(+1);

    return(
        // aria-labelledby="menu-heading" : can swap dofferent menu
        <section id="menu" aria-labelledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {sliderLists.map((cocktail, index) => {
                    // figure out which one is active
                    // if the index is correspond to the current Index. to get the currentIndex, save it to state
                    const isActive = index === currentIndex;

                    // always return a button
                    // also check if the button isActive is true apply text white
                    return(
                        <button 
                            key={cocktail.id} 
                            className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content">
                <div className="arrows">

                    <button 
                        className="text-left"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >   
                        {/* previouscocktail name */}
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>

                    <button 
                        className="text-left"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        {/* nextcocktail name */}
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>

                {/* render the cocktail images that we're trying to show
                
                problem: how do we know which cocktail is the current one and which ones are previous next ones? */}
                <div className="cocktail">
                    <img src={currentCocktail.image} className="object-contain" />
                </div>

                <div className="recipe">
                    {/* going to animate this so we'll use ref*/}
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

