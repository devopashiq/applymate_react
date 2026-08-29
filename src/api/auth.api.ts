
import type { LoginDTo, RegisterDto } from "../types/auth";
import { api,refreshApi} from "./axios";

export const authApi = {
  login(data: LoginDTo) {
    return api.post("/api/auth/login", data, {
      
    });
  },

  signUp(data: RegisterDto) {
    return api.post("/api/auth/sign-up", data, {
      
    });
  },

  logout(){
    return api.post('/api/auth/logout',{},{
       
    })


  },


  refreshToken(){
    return refreshApi.post('/api/auth/refresh')

    
  },

  me(){
     return api.get('/api/auth/me')
  }
};
