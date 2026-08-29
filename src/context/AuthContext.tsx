import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { clearToken, setToken } from "../service/token.service";
import { authService } from "../service/auth.service";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;

}

interface AuthContextType {
  user: User | null;
  setLoginedUser: (user: User) => void;
  logout: () => void;
  loading:boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(()=>{
   async function restoreSession(){
      try{
     const {user}=  await authService.me();
     
       setUser(user)
      }catch(error){
        console.log(error);
       setUser(null)
      }finally{
        setLoading(false)
      }
   }


   restoreSession()
  },[])

  function logout() {
    clearToken();
    setUser(null);
  }

  function setLoginedUser(user:User){
     setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, setLoginedUser,logout,loading}}>
      {loading?<h1>Laoding</h1>:children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
