import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section 
      id="about"
      data-layername="關於我們" 
      className="flex flex-col mt-60 max-lg:mt-28 max-md:mt-24 max-sm:mt-20 w-full text-white max-w-[1140px] max-lg:max-w-[900px] max-md:max-w-[700px] max-sm:max-w-[95%] mx-auto relative"
    >
      <h2 
        data-layername="關於我們" 
        className="self-center max-w-full text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-medium text-center whitespace-nowrap w-[693px] max-lg:w-[600px] max-md:w-[500px] max-sm:w-[95%]"
      >
        關於我們
      </h2>
      
      <div 
        className="flex flex-col mt-24 max-lg:mt-20 max-md:mt-16 max-sm:mt-12 w-full min-h-[400px] max-lg:min-h-[350px] max-md:min-h-[300px] max-sm:min-h-[250px]"
      >
        <div 
          className="flex flex-col w-full rounded-3xl relative"
        >
          {/* 外层大光晕背景 */}
          <div className="absolute -top-56 -bottom-64 -inset-32 -z-20">
            <img
              src="/Rectangle 93.svg"
              className="w-full h-full object-cover"
              alt=""
              loading="lazy"
              style={{
                filter: 'blur(30px)',
                opacity: 0.8
              }}
            />
          </div>

              {/* 额外的底部阴影加深层 */}
              <div className="absolute -bottom-40 -left-32 -right-32 h-64 -z-20">
            <img
              src="/Rectangle 93.svg"
              className="w-full h-full object-cover"
              alt=""
              loading="lazy"
              style={{
                filter: 'blur(40px)',
                opacity: 0.8
              }}
            />
          </div>

          {/* 内层聚焦光晕背景 */}
          <div className="absolute -inset-4 -z-10">
            <img
              src="/Rectangle 93.svg"
              className="w-full h-full object-cover"
              alt=""
              loading="lazy"
              style={{
                filter: 'blur(15px)',
                opacity: 0.8
              }}
            />
          </div>

          <div 
            className="flex flex-wrap gap-5 items-start p-10 max-lg:p-8 max-md:p-6 max-sm:p-4 w-full rounded-3xl bg-[#0A051F]/95 relative z-10"
          >
            <div 
              className="flex flex-col flex-1 shrink basis-0 min-w-[240px]"
            >
              <h3 
                data-layername="關於智富匯" 
                className="flex-1 shrink gap-10 w-full text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-medium tracking-tighter leading-none whitespace-nowrap"
              >
                關於智富匯
              </h3>
              
              <p 
                data-layername="我们是一支充满热情的团队..." 
                className="mt-10 max-lg:mt-8 max-md:mt-6 max-sm:mt-4 text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg leading-10 max-lg:leading-9 max-md:leading-8 max-sm:leading-7"
              >
                我們是一支充滿熱情的團隊，致力於通過尖端的人工智能技術提供最佳的股票交易體驗。
                <br />
                <br />
                <strong className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-medium text-white">
                  我們的使命
                </strong>
                <br />
                我們的使命是通過智能工具和洞察力為交易者提供支持，以便他們在股票市場做出明智的決策。我們努力簡化複雜的金融數據，并爲各個層次的交易者提供易於使用的界面。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
