"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface FundCard {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const fundCards: FundCard[] = [
  {
    id: "1",
    name: "VSMPX",
    value: "260.5",
    change: "+1.29%",
    isPositive: true,
  },
  {
    id: "2",
    name: "PRHYX",
    value: "178.90",
    change: "+1.75%",
    isPositive: true,
  },
  {
    id: "3",
    name: "BSIIX",
    value: "9.47",
    change: "-0.11%",
    isPositive: false,
  },
  {
    id: "4",
    name: "VWNAX",
    value: "86.98",
    change: "+0.95%",
    isPositive: true,
  },
  {
    id: "5",
    name: "KSDIX",
    value: "73.21",
    change: "-0.45%",
    isPositive: false,
  },
  {
    id: "6",
    name: "PRDGX",
    value: "123.45",
    change: "+2.15%",
    isPositive: true,
  },
];

const FundCardComponent: React.FC<{
  data: FundCard;
  index: number;
  active: number;
}> = ({ data, index, active }) => {
  const [radius, setRadius] = useState(450);
  const [offsetX, setOffsetX] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setRadius(450);
        setOffsetX(50);
      } else if (window.innerWidth > 768) {
        setRadius(350);
        setOffsetX(50);
      } else if (window.innerWidth > 640) {
        setRadius(250);
        setOffsetX(25);
      } else {
        setRadius(200);
        setOffsetX(25);
      }
    };

    // 初始化
    handleResize();

    // 添加监听器
    window.addEventListener('resize', handleResize);

    // 清除监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePosition = () => {
    const angle = ((index - active) * 2 * Math.PI) / 6;
    return {
      x: radius * Math.sin(angle) - offsetX,
      z: radius * Math.cos(angle) - radius,
      rotateY: (angle * 180) / Math.PI,
    };
  };

  const { x, z, rotateY } = calculatePosition();

  return (
    <motion.div
  className="absolute left-[40%] top-1/2 max-lg:left-[35%] max-md:top-[30%] md:left-[39%] max-sm:left-[28%] max-xs:left-[20%] max-xxs:left-[18%]  max-tiny:left-[16%]" // 添加 max-md:top-[X%] 让移动端卡片位置上移
  animate={{
    x,
    z,
    rotateY,
    scale: index === active ? 1 : 0.8,
    opacity: index === active ? 1 : 0.6,
  }}
  transition={{
    duration: 0.8,
    ease: "easeInOut",
  }}
  style={{
    width: "clamp(280px, 30vw, 380px)",
    height: "clamp(360px, 40vw, 480px)",
    transformOrigin: "center",
  }}
>
      <div
        className="w-full h-full rounded-[30px] p-8 max-lg:p-6 max-md:p-5 max-sm:p-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(45, 24, 87, 0.85) 0%, rgba(45, 24, 87, 0.75) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          WebkitBoxReflect:
            "below 20px -webkit-linear-gradient(transparent 40%, rgba(255, 255, 255, 0.2))",
        }}
      >
        {/* 装饰性背景 */}
        <div
          className="absolute right-0 bottom-0 w-[60%] h-[60%] max-md:w-[50%] max-md:h-[50%]"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "120px 0 30px 0",
            maskImage:
              "radial-gradient(circle at bottom right, white, transparent)",
            WebkitMaskImage:
              "radial-gradient(circle at bottom right, white, transparent)",
          }}
        />

        {/* 内容区域 */}
        <div className="relative z-10">
          <h3 className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-bold mb-6 max-sm:mb-4 text-white">
            {data.name}
          </h3>
          <div className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-bold mb-4 max-sm:mb-2 text-white">
            {data.value}
          </div>
          <div
            className={`text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base ${
              data.isPositive ? "text-green-400" : "text-red-400"
            } mb-4 max-sm:mb-2`}
          >
            {data.change}
          </div>
          <div className="text-white/70 text-lg max-md:text-base max-sm:text-sm mb-12 max-lg:mb-8 max-md:mb-6 max-sm:mb-4">
            USD 貨幣
          </div>

          <button className="flex items-center space-x-2 text-white/80 hover:text-white group">
            <span className="text-base max-sm:text-sm">Learn more</span>
            <svg
              className="w-5 h-5 max-sm:w-4 max-sm:h-4 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Fund: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRotation = useAnimationControls();
  const [buttonStyles, setButtonStyles] = useState({
    top: "60%",
    transform: "translate(-50%, -50%)"
  });

  // 处理按钮位置的响应式
  useEffect(() => {
    const handleResize = () => {
      setButtonStyles({
        top: window.innerWidth > 768 ? "65%" : "60%",
        transform: "translate(-50%, -50%)"
      });
    };

    // 初始化时检查是否在客户端
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fundCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 容器旋转动画
  useEffect(() => {
    containerRotation.start({
      transition: {
        duration: 18,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [containerRotation]);

  return (
    <section
      id="fund"
      className="flex flex-col mt-20 max-lg:mt-16 max-md:mt-12 max-sm:mt-8"
    >
      {/* 标题部分 */}
      <h2
        data-layername="智富匯基金"
        className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-medium text-white pt-16 max-lg:pt-14 max-md:pt-12 max-sm:pt-10 text-center"
      >
        智富匯基金
      </h2>

      <div className="relative mt-8 max-lg:mt-6 max-md:mt-4 max-sm:mt-2 h-[900px] max-lg:h-[700px] max-md:h-[600px] max-sm:h-[500px] w-screen -mx-[calc((100vw-100%)/2)]">
        {/* 背景图层 */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            loading="lazy"
            src="/Fundgrid.svg"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] object-cover object-center"
            alt="background grid"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20" />
        </div>

        {/* 内容容器 */}
        <div className="relative max-w-[1440px] mx-auto px-4 h-full -mt-48 max-lg:-mt-36 max-md:-mt-24 max-sm:-mt-16">
          <div className="relative w-full h-full">
            {/* 3D展示区域 */}
            <motion.div
              animate={containerRotation}
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(2500px) rotateX(-8deg)",
                transformOrigin: "center center",
              }}
            >
              {fundCards.map((card, index) => (
                <FundCardComponent
                  key={card.id}
                  data={card}
                  index={index}
                  active={activeIndex}
                />
              ))}
            </motion.div>
          </div>

          {/* 控制按钮容器 */}
          <div
            className="absolute w-full flex justify-between px-8 max-sm:px-2 z-20"
            style={{
              ...buttonStyles,
              maxWidth: "2000px",
              left: "50%",
              "--translate-2xl": "100px",
              "--translate-xl": "30px",
              "--translate-lg": "20px",
            } as React.CSSProperties}
          >
            {/* 左箭头按钮 */}
            <button
              className="p-3 max-sm:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors group 
                2xl:-translate-x-[var(--translate-2xl)]
                xl:-translate-x-[var(--translate-xl)]
                lg:-translate-x-[var(--translate-lg)]"
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + fundCards.length) % fundCards.length
                )
              }
            >
              <svg
                className="w-8 h-8 max-lg:w-6 max-lg:h-6 text-white transform group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 右箭头按钮 */}
            <button
              className="p-3 max-sm:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors group 
                2xl:translate-x-[var(--translate-2xl)]
                xl:translate-x-[var(--translate-xl)]
                lg:translate-x-[var(--translate-lg)]"
              onClick={() => setActiveIndex((prev) => (prev + 1) % fundCards.length)}
            >
              <svg
                className="w-8 h-8 max-lg:w-6 max-lg:h-6 text-white transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fund;
