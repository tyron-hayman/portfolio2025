export default function StickyFooter() {
    return(
    <div 
        className='relative h-[600px] bg-black'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+600px)] -top-[100vh]'>
            <div className='h-[600px] sticky top-[calc(100vh-600px)] flex justify-center'>
                <div className="container py-10 flex flex-wrap justify-center items-center">
                    <div className="w-full text-center">
                        <p className="text-white font-light leading-7xl text-7xl mb-16">Have an idea you want to bring to life or have a career oppertunity?</p>
                        <a href="mailto:tyron.hayman@gmail.com" className="rounded-full text-white text-5xl px-10 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}