import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import FeatureShowcase from '@/components/FeatureShowcase';
import { Leaf } from 'lucide-react';
import { authService } from '@/services/api';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (data: any) => {
    try {
      console.log('Starting signup process...');
      const response = await authService.signup({
        name: data.name,
        email: data.email,
        password: data.password
      });

      console.log('Signup response:', response);

      if (response && response.message === "User registered successfully") {
        toast({
          variant: "success",
          title: "Success!",
          description: "Your account has been created."
        });

        // Navigate to login page
        navigate('/login', { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || 'Failed to create account. Please try again.'
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || 'An error occurred during signup.'
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
          <AuthForm isSignUp onSubmit={handleSignup} />
        </div>
        <FeatureShowcase />
      </div>
    </main>
  );
};

export default Signup;
