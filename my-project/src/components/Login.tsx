// components/auth/Login.tsx
"use client"
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch  {
      setError('登入失敗，請檢查您的郵箱和密碼');
    }
  };

  // 點擊背景關閉模態框
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">登入</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
            aria-label="關閉"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-center rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
                電子郵箱
            </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                bg-white text-gray-900 caret-purple-600" // 添加这些样式
                placeholder="請輸入電子郵箱"
                required
                autoComplete="email"
            />
            </div>

            <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
                密碼
            </label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                bg-white text-gray-900 caret-purple-600" // 添加这些样式
                placeholder="請輸入密碼"
                required
                autoComplete="current-password"
            />
            </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
          >
            登入
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>
            還沒有帳號？
            <button
              onClick={onSwitchToRegister}
              className="text-purple-600 hover:text-purple-700 ml-2 font-medium"
            >
              立即註冊
            </button>
          </p>
        </div>

        {/* 測試帳號提示 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-600 text-sm">
            測試帳號：<br />
            電子郵箱：test@example.com<br />
            密碼：123456
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
