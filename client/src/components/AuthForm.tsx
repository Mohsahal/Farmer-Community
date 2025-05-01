import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Facebook, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  isSignUp?: boolean;
  onSubmit: (data: any) => void;
}

const AuthForm = ({ isSignUp = false, onSubmit }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (isSignUp) {
      setPasswordMatch(
        !formData.confirmPassword || 
        formData.password === formData.confirmPassword
      );
    }
  }, [formData.password, formData.confirmPassword, isSignUp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="auth-card animate-grow">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-farm-dark-green">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isSignUp 
            ? 'Join the AgroVerse farming revolution' 
            : 'Login to access your farming assistant'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-farm-green-500 focus:border-farm-green-500 hover:border-farm-green-500 transition-all duration-200 placeholder-gray-400 shadow-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-farm-green-500 focus:border-farm-green-500 hover:border-farm-green-500 transition-all duration-200 placeholder-gray-400 shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-farm-green-500 focus:border-farm-green-500 hover:border-farm-green-500 transition-all duration-200 placeholder-gray-400 shadow-sm"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <Label 
              htmlFor="confirmPassword" 
              className="text-sm font-medium"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                required
                className={`w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-farm-green-500 focus:border-farm-green-500 hover:border-farm-green-500 transition-all duration-200 placeholder-gray-400 shadow-sm ${!passwordMatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {!passwordMatch && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-farm-green-500 hover:bg-farm-green-600 text-white font-semibold py-2.5 rounded-lg shadow transition"
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            className="social-login-button flex items-center justify-center bg-white border border-gray-300 shadow hover:bg-gray-100 transition"
          >
           <img src="/google.png" alt="Google" className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="social-login-button bg-blue-600 text-white shadow hover:bg-blue-700"
          >
            <Facebook className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="social-login-button bg-white hover:bg-gray-50 border-gray-300"
          >
            <User className="h-5 w-5 text-farm-green-500" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link
          to={isSignUp ? '/login' : '/'}
          className="font-medium text-farm-green hover:text-farm-dark-green"
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;


