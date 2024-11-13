// components/auth/Register.tsx
"use client"
import React, { useState } from 'react';

interface RegisterProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('兩次輸入的密碼不一致');
      return;
    }
    // 這裡實際項目中會調用註冊 API
    try {
      // 模擬註冊過程
      onSwitchToLogin();
    } catch  {
      setError('註冊失敗，請稍後重試');
    }
  };

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
          <h2 className="text-2xl font-bold">註冊</h2>
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
            <label htmlFor="register-email" className="block text-gray-700 mb-2">
                電子郵箱
            </label>
            <input
                id="register-email"
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
            <label htmlFor="register-password" className="block text-gray-700 mb-2">
                密碼
            </label>
            <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                bg-white text-gray-900 caret-purple-600" // 添加这些样式
                placeholder="請輸入密碼"
                required
                autoComplete="new-password"
            />
            </div>

            <div>
            <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
                確認密碼
            </label>
            <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                bg-white text-gray-900 caret-purple-600" // 添加这些样式
                placeholder="請再次輸入密碼"
                required
                autoComplete="new-password"
            />
            </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
          >
            註冊
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>
            已有帳號？
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-700 ml-2 font-medium"
            >
              立即登入
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
