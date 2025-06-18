import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../utils/firebase/auth/authApi";
import fireStoreApi from "../../utils/firebase/firestore/db";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";

function Authentication({ isSignUp = false }) {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [resetEmail, setResetEmail] = useState("");

  function onChangeInput(e) {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }

  function validateInputs() {
    if (isSignUp && authData.name.length < 3) {
      toast.error("Name should be at least 3 characters long");
      return false;
    }
    if (!authData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (authData.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    }
    return true;
  }

  async function onClickSignUp() {
    if (!validateInputs()) return;
    const data = await authApi.signUpWithEmailPassword(authData);
    await fireStoreApi.saveDoc(data?.user?.uid, {
      name: authData?.name,
      email: authData?.email,
      createdAt: fireStoreApi.getTimeStamp(),
    });
    navigate("/home");
  }

  async function onClickLogin() {
    if (!validateInputs()) return;
    const data = await authApi.signInWithEmailPassword(authData);
    if (data?.user) {
      navigate("/profile");
    }
  }

  async function onResetPassword() {
    if (!resetEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      await authApi.resetPassword(resetEmail);
      toast.success("Password reset link sent to your email");
      setIsForgotPasswordModalOpen(false);
      setResetEmail("");
    } catch (error) {
      toast.error("Failed to send password reset link. Please try again.");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#1c1c3b,_#0f1021,_#351a4f)] px-4">
        <div className="max-w-md w-full bg-background-card/70 backdrop-blur-md p-8 rounded-2xl shadow-glass border border-card">
          <div className="text-center mb-6">
            <h1 className="text-text-default text-3xl font-bold">
              {isSignUp ? "Join Linkit" : "Welcome Back"}
            </h1>
            <p className="text-text-secondary mt-1">
              {isSignUp ? "Sign up for free!" : "Log in to your Linkit"}
            </p>
          </div>
          <form className="space-y-5">
            {isSignUp && (
              <div>
                <label className="text-text-muted block mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-input-background text-text-default placeholder-text-secondary border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus"
                  type={"text"}
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={authData.name}
                  onChange={onChangeInput}
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="text-text-muted block mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-input-background text-text-default placeholder-text-secondary border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={authData.email}
                onChange={onChangeInput}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-text-muted block mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 rounded-lg bg-input-background text-text-default placeholder-text-secondary border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••"
                  value={authData.password}
                  onChange={onChangeInput}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 active:text-gray-600 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isSignUp && (
                <div className="text-right mt-1">
                  <button
                    className="text-sm text-text-secondary hover:text-primary-default"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
            <button
              className="w-full bg-[#454591] hover:bg-[#5a5ab0] transition-colors text-white py-2 rounded-lg font-semibold shadow-glass"
              onClick={isSignUp ? onClickSignUp : onClickLogin}
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
          <p className="text-center text-sm text-text-secondary mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Link
              className="text-primary-default hover:underline"
              to={isSignUp ? "/login" : "/signup"}
            >
              {isSignUp ? " Log in" : " Sign up"}
            </Link>
          </p>
        </div>
      </div>
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-background-card border border-card shadow-glass p-6 rounded-2xl w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-text-muted hover:text-text-default"
              onClick={() => setIsForgotPasswordModalOpen(false)}
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold text-center text-text-default mb-4">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-input-background text-text-default placeholder-text-muted border border-input-border focus:outline-none focus:ring-2 focus:ring-input-focus"
            />
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-accent-default hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
                onClick={onResetPassword}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Authentication;
