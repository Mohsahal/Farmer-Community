import React from 'react';
import AuthForm from '@/components/AuthForm';
import FeatureShowcase from '@/components/FeatureShowcase';
import { Leaf } from 'lucide-react';


const handleSignup = (data: any) => {
  // Add your signup logic here
  console.log('Signup data:', data);
};

const Signup = () => (
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

export default Signup;
