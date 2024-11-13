"use client"
import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Register from './Register';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "股票指数", href: "#stock" , isExternal: false},
    { label: "智富匯基金", href: "#fund" , isExternal: false },
    { label: "關於我們", href: "#about" , isExternal: false},
    { label: "新聞", href: "#news" , isExternal: false},
    { label: "訂閱計畫", href: "#subscription" , isExternal: false},
    { label: "聊天机器人", href: "https://tradingwithai.org/zh" , isExternal: true},
  ];

    // 处理导航点击
    const handleNavClick = (item: typeof navItems[0]) => {
      if (item.isExternal) {
        if (!isAuthenticated && item.href === "https://tradingwithai.org/zh") {
          setShowLogin(true);
          return;
        }
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        scrollToSection(item.href.replace('#', ''));
      }
      setIsMenuOpen(false);
    };

    const handleAuthButtonClick = () => {
      if (isAuthenticated) {
        logout();
      } else {
        setShowLogin(true);
      }
    };

  // 添加滚动功能
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
    <header className="relative w-full h-[200px] max-lg:h-[180px] max-md:h-[160px] max-sm:h-[140px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4D3589]/80 to-[#2D1857]/80 backdrop-blur-sm" />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a21a34f0174c482f4f7f92ef9ef16893b567781091ccd100e595bffa6457c4c3?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a"
        className="object-cover absolute inset-0 size-full"
        alt=""
      />
      
      <nav className="relative z-20 flex items-center justify-between px-24 max-lg:px-16 max-md:px-8 max-sm:px-4 max-w-[1920px] mx-auto w-full">
        {/* Logo部分 - 减小间距 */}
        <div className="flex items-center space-x-6 max-lg:space-x-4 max-md:space-x-3 max-sm:space-x-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b38e3ceb27690f322aa27ad97df099921b87d6c866018ab7ad75ae78e81e3613?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a"
            alt="智富匯"
            className="h-20 max-lg:h-16 max-md:h-14 max-sm:h-12 w-auto"
          />
          <span className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-bold text-white">
            智富匯
          </span>
        </div>

{/* 桌面端导航链接 - 添加 2xl 断点并优化间距 */}
<div className="hidden xl:flex items-center space-x-24 2xl:space-x-24 xl:space-x-16 max-xl:space-x-12">
  {navItems.map((item, index) => (
    <a
      key={index}
      onClick={() => handleNavClick(item)}
      className="text-white/90 hover:text-white transition-colors duration-200 
        text-2xl 2xl:text-2xl xl:text-xl max-xl:text-lg 
        font-medium cursor-pointer whitespace-nowrap"
    >
      {item.label}
    </a>
  ))}
</div>

{/* 汉堡菜单按钮 - 修改显示断点 */}
<button 
  onClick={toggleMenu}
  className="xl:hidden flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors duration-200"
  aria-label="Toggle menu"
>
      <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
      <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
      <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
</button>

{/* 登录/注册按钮 - 优化间距 */}
<button 
  onClick={handleAuthButtonClick}
  className="px-12 2xl:px-12 xl:px-10 max-xl:px-8 max-lg:px-6 max-md:px-4
    py-4 2xl:py-4 xl:py-3.5 max-xl:py-3 max-lg:py-2.5
    text-2xl 2xl:text-2xl xl:text-xl max-xl:text-lg max-lg:text-base
    text-white/90 hover:text-white transition-colors duration-200 font-medium 
    bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 whitespace-nowrap"
>
  {isAuthenticated ? '退出登錄' : '登錄/註冊'}
</button>
      </nav>
      {/* 底部渐变分隔线 */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* 移动端导航菜单 - 修改显示断点 */}
        {isMenuOpen && (
  <div className="xl:hidden fixed top-[160px] max-sm:top-[140px] left-0 w-full bg-gradient-to-r from-[#4D3589]/95 to-[#2D1857]/95 backdrop-blur-md z-10">
          <div className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                onClick={() => handleNavClick(item)}
                className="px-8 py-4 text-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/10 last:border-b-0 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 遮罩层 - 修改显示断点 */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-0"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
    
    {showLogin && (
      <Login
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    )}
    {showRegister && (
      <Register
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    )}
    </>
  );
};

export default Header;
