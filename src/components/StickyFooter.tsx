export default function StickyFooter() {
    return(
    <div 
        className='relative h-[600px] bg-black'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+600px)] -top-[100vh]'>
            <div className='h-[600px] sticky top-[calc(100vh-600px)] flex justify-center'>
                <div className="container py-10 flex justify-between">
                    <div className="w-8/12">
                    <p className="text-white font-light leading-7xl text-7xl">Have an idea you want to bring to life or have a career oppertunity?</p>
                    </div>
                    <div className="w-3/12"></div>
                </div>
            </div>
        </div>
    </div>
    )
}