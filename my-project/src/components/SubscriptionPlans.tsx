import React from "react";

interface PlanProps {
  price: string;
  duration: string;
  icon: string;
  position?: 'left' | 'right' | 'bottom';
}

const PlanCard: React.FC<PlanProps> = ({ price, duration, icon, position }) => (
  <div className={`relative flex flex-col items-center justify-center px-10 py-8 w-[280px] h-[180px] 
    max-lg:w-[240px] max-lg:h-[160px] max-md:w-[200px] max-md:h-[140px] max-sm:w-[180px] max-sm:h-[120px]
    text-center text-white rounded-[20px] ${position === 'bottom' ? 'mt-32 max-lg:mt-24 max-md:mt-20 max-sm:mt-16' : ''}`}>
    {/* 玻璃拟态效果 */}
    <div className="absolute inset-0 rounded-[20px] bg-white/10 backdrop-blur-md" />
    
    {/* 发光效果 */}
    <div className="absolute inset-0 rounded-[20px] shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
    
    {/* 光晕点缀 */}
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/30 rounded-full" />
    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full" />
    
    {/* 图标 - 增大尺寸 */}
    <div className="absolute -top-12">
      <img 
        src={icon} 
        className="w-16 h-16 max-lg:w-14 max-lg:h-14 max-md:w-12 max-md:h-12 max-sm:w-10 max-sm:h-10" 
        alt="" 
      />
    </div>

    {/* 内容 */}
    <div className="relative mt-4 z-10">
      <div className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-medium mb-4">{price}</div>
      <div className="text-xl max-lg:text-lg max-md:text-base max-sm:text-sm text-white/80">{duration}</div>
    </div>
  </div>
);

const SubscriptionPlans: React.FC = () => {
  const plans: PlanProps[] = [
    { 
      price: "1700HK$/年", 
      duration: "365日",
      icon: "/bulb.svg",
      position: 'left'
    },
    { 
      price: "155HK$/月", 
      duration: "30日",
      icon: "/rocket.svg",
      position: 'bottom'
    },
    { 
      price: "400HK$/季度", 
      duration: "90日",
      icon: "/helix.svg",
      position: 'right'
    }
  ];

  return (
    <section id="subscription">
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto mt-32 px-4">
      <h2 className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-medium text-white mb-32">
        訂閱計畫
      </h2>

      {/* 整体连接线布局容器 */}
      <div className="relative w-full">
        {/* 中心图标 - 移除圆环，增大图标 */}
        <div className="relative flex justify-center mb-24">
          <div className="relative">
            <img 
              src="/layer.svg"
              className="w-20 h-20 max-lg:w-16 max-lg:h-16 max-md:w-14 max-md:h-14 max-sm:w-12 max-sm:h-12"
              alt=""
            />
          </div>
        </div>

        {/* 连接线 - 调整连接点位置 */}
        <div className="absolute top-16 left-0 w-full h-full">
          {/* 左侧弧形连接线 */}
          <div className="absolute left-[14%] top-4 w-[36%] h-[100px]
            border-t-2 border-l-2 rounded-tl-[50px] border-white/30" />

          {/* 右侧弧形连接线 */}
          <div className="absolute right-[14%] top-4 w-[36%] h-[100px]
            border-t-2 border-r-2 rounded-tr-[50px] border-white/30" />

          {/* 中间垂直连接线 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[2px] h-[500px]
            bg-gradient-to-b from-white via-white/50 to-white/30
            shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

          {/* 装饰性光点 */}
          <div className="absolute left-[20%] top-[102px] w-2 h-2 bg-white rounded-full 
            shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          <div className="absolute right-[20%] top-[102px] w-2 h-2 bg-white rounded-full 
            shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 bg-white rounded-full 
            shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>

        {/* 卡片布局保持不变 */}
          <div className="grid grid-cols-3 gap-20 max-lg:gap-10 max-md:gap-5 max-sm:gap-2">
            <div className="flex justify-end max-md:justify-center">
              <PlanCard {...plans[0]} />
            </div>
            <div className="col-span-1"></div>
            <div className="flex justify-start max-md:justify-center">
              <PlanCard {...plans[2]} />
            </div>
          </div>
        
 <div className="flex justify-center mt-32 max-lg:mt-24 max-md:mt-20 max-sm:mt-16">
          <PlanCard {...plans[1]} />
        </div>
      </div>
    </div>
    </section>
  );
};

export default SubscriptionPlans;
