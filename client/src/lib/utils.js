import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// This function now calls the logout API endpoint
export async function logout() {
  try {
    console.log("logout: Starting logout process...");
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log("logout: Response status:", response.status);
    
    if (response.ok) {
      console.log("logout: Logout successful");
      // Clear all authentication related data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      // Clear any other auth-related data if needed
      localStorage.clear();
    } else {
      console.error("logout: Logout failed with status:", response.status);
    }
  } catch (error) {
    console.error("logout: Error during logout:", error);
  }
}
