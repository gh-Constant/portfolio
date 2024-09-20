const Hero = () => {
    return (
        <section className="relative flex flex-col w-full min-h-screen"> 
            <div className="flex flex-col w-full gap-3 mx-auto mt-20 sm:mt-36 c-space">
                <p className="text-xl font-medium text-center text-white sm:text-3xl font-generalsans">Hi, I am Constant <span className="waving-hand"> 👋</span></p>

                <p className="hero_tag text-gray_gradient">Creating Games & Websites</p>
            </div>
        </section>
    )
}

export default Hero
