import { useState } from "react";
import { authService } from "../service/auth.service";
import { useAuth } from "../context/AuthContext";
import { setToken } from "../service/token.service";
import { useNavigate } from "react-router";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const { setLoginedUser } = useAuth();
  const  navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [haveAccount, setHaveAccount] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (haveAccount) {
      const { name, ...loginData } = formData;
      const { user } = await authService.login(loginData);

      setToken(user.accessToken);
      setLoginedUser(user)
      navigate('/dashboard')
      ;
    } else {
      authService.signUp(formData);
    }
  };

  function toggleHaveAccount() {
    setHaveAccount((pre) => !pre);
  }

  function toggleShowPassword() {
    setShowPassword((pre) => !pre);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white p-8">
      <div className="flex  flex-col lg:flex-row max-w-285 w-full rounded-2xl overflow-hidden shadow-2xl lg:h-150">
        <div className="flex flex-col lin bg-linear-to-br from-primary to-primary-to  p-8 lg:p-14 lg:flex-1">
          <div className="font-manrope font-bold text-lg mb-10 flex  items-center">
            <img
              src="logo-only.png"
              alt="ApplyMate Logo"
              className="w-15 -ml-3"
            />
            <p className="font-bold text-lg text-on-primary font-manrope -ml-1.5">
              ApplyMate
            </p>
          </div>
          <div>
            <div className="hidden lg:flex flex-col">
              <h1 className="font-manrope font-extrabold text-3xl mb-4 leading-tight max-w-2xs text-on-primary">
                Track your job applications and interviews in one place.
              </h1>
              <p className="font-inter text-sm opacity-60 leading-relaxed max-w-2xs text-on-primary">
                ApplyMate is a web application that helps you keep track of your
                job applications and interviews. You can add new applications,
                update the status of existing applications, and view your
                application history
              </p>
            </div>
            <p className="lg:hidden font-manrope font-extrabold text-xl mt-2 mb-6 text-on-primary">
              Track applications and interviews in one place.
            </p>
          </div>
        </div>
        <div className="bg-white flex-1 text-on-surface p-8 lg:p-14 flex flex-col">
          <div>
            <h2 className="font-manrope font-extrabold text-2xl text-gray-900 mb-1">
              Sign up to your account
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {haveAccount
                ? "Don't have an account?"
                : "Already have an account?"}
              <a
                className="text-on-surface font-semibold hover:underline cursor-pointer"
                onClick={toggleHaveAccount}
              >
                {haveAccount ? " Create account" : " Sign In"}
              </a>
            </p>
          </div>
          <div className="flex gap-3 mb-5">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border-[1.5px] border-gray-200 rounded-xl bg-gray-50 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4"
                alt="Google"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border-[1.5px] border-gray-200 rounded-xl bg-gray-50 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                className="w-4 h-4"
                alt="LinkedIn"
              />
              LinkedIn
            </button>
          </div>
          <div className="relative text-center mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-widest">
              or continue with email
            </span>
          </div>
          <div>
            <form className="flex flex-col gap-3.5 " onSubmit={handleSubmit}>
              {!haveAccount && (
                <label className="flex flex-col  ">
                  <p className="text-xs font-medium text-gray-600 mb-1.5">
                    Full Name
                  </p>
                  <input
                    value={formData.name}
                    onChange={handleChangeInput}
                    type="text"
                    name="name"
                    className="w-full px-3.5 py-2.5 text-sm border-[1.5px] border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="Alex Rivera"
                  />
                </label>
              )}
              <label className="flex flex-col">
                <p className="text-xs font-medium text-gray-600 mb-1.5">
                  Email
                </p>
                <input
                  value={formData.email}
                  type="email"
                  name="email"
                  onChange={handleChangeInput}
                  className="w-full px-3.5 py-2.5 text-sm border-[1.5px] border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder="alex@company.com"
                />
              </label>
              <label className="flex flex-col">
                <p className="text-xs font-medium text-gray-600 mb-1.5">
                  Password
                </p>
                <div className="relative">
                  <input
                    value={formData.password}
                    type={showPassword ? "password" : "text"}
                    name="password"
                    onChange={handleChangeInput}
                    className="w-full px-3.5 py-2.5 text-sm border-[1.5px] border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={toggleShowPassword}
                  >
                    {!showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <p className="text-[11px] text-gray-400 mt-1.5">
                Must be at least 8 characters with letters, numbers & symbols.
              </p>
              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#1e2a78] hover:bg-[#2d3d99] active:scale-[0.99] text-white font-manrope font-bold text-sm rounded-xl transition-all"
              >
                {haveAccount ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
