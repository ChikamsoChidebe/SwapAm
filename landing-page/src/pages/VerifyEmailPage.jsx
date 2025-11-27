import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (location.state?.email && location.state?.userId) {
      setEmail(location.state.email);
      setUserId(location.state.userId);
    } else {
      navigate('/signup');
    }
  }, [location, navigate]);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    
    if (code.length !== 5) {
      setError('Please enter all 5 digits');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await verifyEmail(userId, code);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    setTimeLeft(60);
    console.log('Resending verification code...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Green Section with Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="mb-8">
            <button onClick={() => navigate('/')} className="hover:scale-105 transition-transform">
              <img 
                src="/SWAPAM LOGO.jpg" 
                alt="SwapAm Logo" 
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Email Verification</h1>
            <p className="text-xl opacity-90 mb-6">Secure your account</p>
            <p className="text-lg opacity-75 max-w-md">We've sent a verification code to your email to ensure account security.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <svg width="48" height="48" className="mx-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-2">We sent a reset link to {email}</p>
            <p className="text-sm text-gray-500">Enter 5 digit code from the email</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all"
                  required
                />
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#fdd835] hover:bg-[#f9c74f] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendCode}
                  className="text-sm text-[#2E7D32] hover:underline font-medium"
                >
                  Resend verification code
                </button>
              )}
            </div>

            <div className="text-center">
              <a href="/login" className="text-sm text-[#2E7D32] hover:underline font-medium flex items-center justify-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;