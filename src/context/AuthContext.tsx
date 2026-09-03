import { useEffect, useState, type ReactNode } from "react";
import { clearToken } from "../service/token.service";
import { authService } from "../service/auth.service";
import { AuthContext, type AuthUser } from "./auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  function setLoginedUser(user: AuthUser) {
     setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, setLoginedUser, logout, loading }}>
      {loading?<h1>Laoding</h1>:children}
    </AuthContext.Provider>
  );
}
