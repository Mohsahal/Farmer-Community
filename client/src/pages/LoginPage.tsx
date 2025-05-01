import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import FeatureShowcase from '@/components/FeatureShowcase';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    try {
      console.log('Starting login process...');
      const response = await authService.login({ email: data.email, password: data.password });
      console.log('Login response received:', response);
      
      // Check if we have a valid response
      if (response) {
        console.log('Setting login state...');
        // Store any auth data
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Set login state
        localStorage.setItem('isLoggedIn', 'true');
        console.log('Login state set, current localStorage:', {
          isLoggedIn: localStorage.getItem('isLoggedIn'),
          token: localStorage.getItem('token'),
          user: localStorage.getItem('user')
        });
        
        // Show success message
        toast({
          title: 'Login Successful',
          description: 'Welcome to AgroVerse!',
        });

        // Force navigation
        console.log('Attempting navigation to /community...');
        window.location.href = '/community';
      } else {
        console.error('Invalid login response:', response);
        toast({
          title: 'Login Failed',
          description: 'Invalid response from server',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login Error',
        description: error?.response?.data?.message || 'An error occurred during login.',
        variant: 'destructive',
      });
    }
  };
  

  return (
    <main className="animated-gradient-bg">
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="flex items-center justify-center mb-8">
            <Leaf className="h-8 w-8 text-farm-green-500 mr-2" />
            <h1 className="text-2xl font-bold text-farm-dark-green">AgroVerse</h1>
          </div>
          <AuthForm onSubmit={handleLogin} />
        </div>
        <FeatureShowcase />
      </div>
    </main>
  );
};

export default Login;
