export default function StickyFooter() {
    return(
    <div 
        className='relative h-[600px] bg-black'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+600px)] -top-[100vh]'>
            <div className='h-[600px] sticky top-[calc(100vh-600px)] flex justify-center'>
                <div className="container py-10 flex justify-between">
                    <div className="w-1/2">
                    <h2 className="text-white text-[6vw] font-black uppercase">
                        Let's Chat!
                    </h2>
                    <p className="text-white font-normal leading-tight text-5xl">Have an idea you want to bring to life or have a career oppertunity?</p>
                    </div>
                    <div className="w-1/2"></div>
                </div>
            </div>
        </div>
    </div>
    )
}