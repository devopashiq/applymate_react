import { authApi } from "../api/auth.api";
import type { LoginDTo, RegisterDto, User } from "../types/auth";

export const authService = {
  async login(data: LoginDTo) {
    const response = await authApi.login(data);

    return {
      user: this.formatUserResponse(
        response.data.data.user,
        response.data.data.accessToken,
      ),
      message: response.data.message,
    };
  },

  async signUp(data: RegisterDto) {
    //TODO
    //git token from reponse add into authContext save in memmory
    //use that token to send token Authorization Header
    //save user details to user
    const response = await authApi.signUp(data);
    return response.data;
  },

  async me() {
    const response = await authApi.me();
    const user = response.data.data;
    return {
      user: this.formatUserResponse(user),
      message: response.data.message,
    };
  },

  async refreshToken() {
    const response = await authApi.refreshToken();
    return response.data;
  },

  formatUserResponse(user: User, token: string = "") {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token,
    };
  },
};
