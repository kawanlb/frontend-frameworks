  export default function SideImage() {
    return (
      <section className="relative flex h-full items-end bg-custom-blue lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="/25_low.svg"
          className="absolute left-1/2 top-1/2 h-3/5 w-3/5 object-cover transform -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        />
        {/* Ellipse 54 */}
        <div className="absolute bg-[#545ADE] w-[194px] h-[200px] -left-[94px] top-[663px] rounded-full"></div>
        
        {/* Ellipse 53 */}
        <div className="absolute bg-[#545ADE] w-[84px] h-[86px] left-[247px] top-[801px] rounded-full"></div>
    
        <div className="absolute bg-[#545ADE] w-[270px] h-[276px] left-[655px] top-[220px] rounded-full"></div>
        
        {/* Polygon */}
        <img
          src="/polygon.svg"
          alt="Polygon"
          className="absolute w-[98.63px] h-[69.51px] left-[210px] top-[220px] rotate-[127.11deg]"
        />

      </section>
    );
  }