import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import FeatureShowcase from '@/components/FeatureShowcase';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    console.log('Login data:', data);
    toast({
      title: "Login Attempt",
      description: "This is a demo. Authentication would happen here.",
    });
    // In a real app, this would authenticate the user
    // navigate('/dashboard');
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
