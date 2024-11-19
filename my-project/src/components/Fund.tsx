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
  const calculatePosition = () => {
    const angle = ((index - active) * 2 * Math.PI) / 6;
    const radius = 450; // 增加旋转半径

    return {
      x: radius * Math.sin(angle) - 50, // 向左偏移50px
      z: radius * Math.cos(angle) - radius,
      rotateY: (angle * 180) / Math.PI,
    };
  };

  const { x, z, rotateY } = calculatePosition();

  return (
    <motion.div
      className="absolute left-[42%] top-1/2"
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
        width: "380px",
        height: "480px",
        transformOrigin: "center",
        // transform: translate(-50%, -50%),
      }}
    >
      <div
        className="w-full h-full rounded-[30px] p-8 relative overflow-hidden"
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
          className="absolute right-0 bottom-0 w-[60%] h-[60%]"
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
          <h3 className="text-4xl font-bold mb-6 text-white">{data.name}</h3>
          <div className="text-6xl font-bold mb-4 text-white">{data.value}</div>
          <div
            className={`text-2xl ${
              data.isPositive ? "text-green-400" : "text-red-400"
            } mb-4`}
          >
            {data.change}
          </div>
          <div className="text-white/70 text-lg mb-12">USD 貨幣</div>

          <button className="flex items-center space-x-2 text-white/80 hover:text-white group">
            <span>Learn more</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fundCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    containerRotation.start({
      transform: [
        // "perspective(2500px) rotateX(-8deg) rotateY(0deg) translateX(-9%)",
        // "perspective(2500px) rotateX(-8deg) rotateY(360deg) translateX(-9%)",
      ],
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
      className="flex flex-col mt-20" // 减少顶部间距
    >
      {/* 标题部分 */}
      <h2
        data-layername="智富匯基金"
        className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-medium text-white pt-16 max-lg:pt-14 max-md:pt-12 max-sm:pt-10 text-center"
      >
        智富匯基金
      </h2>

      <div className="relative mt-8 max-lg:mt-6 max-md:mt-4 max-sm:mt-2 h-[900px] w-screen -mx-[calc((100vw-100%)/2)]">
        {/* 背景图层 */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            loading="lazy"
            src="/Fundgrid.svg"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] object-cover object-[center_80%]"
            alt="background grid"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20" />
        </div>

        {/* 内容容器 */}
        <div className="relative max-w-[1440px] mx-auto px-4 h-full -mt-48">
          <div className="relative w-full h-full">
            {" "}
            {/* 调整这个值来控制整体左右位置 */}
            {/* 3D展示区域 */}
            <motion.div
              animate={containerRotation}
              className="relative w-full h-full flex items-center justify-center -mt-32 "
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(2500px) rotateX(-8deg) ",
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
          <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between top-[60%]  z-20">
            <button
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors group"
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + fundCards.length) % fundCards.length
                )
              }
            >
              <svg
                className="w-8 h-8 text-white transform group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors group"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % fundCards.length)
              }
            >
              <svg
                className="w-8 h-8 text-white transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fund;
