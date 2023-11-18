import { Link, useNavigate } from "react-router-dom";
import { TextField } from "components/Fields";
import Button from "components/Button";
import { triggerToast } from "components/Notification";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "utils/firebase";
import { useContext, useEffect, useMemo, useState } from "react";
import { includes, trim } from "lodash";
import AuthContext from "contexts/AuthContext";
import roles from "utils/roles";

export const metadata = {
  title: "Sign In",
};

export default function Login() {
  const { isAuthenticated, currentUserRoles, isAuthenticating } =
    useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    if (
      !isAuthenticating &&
      isAuthenticated &&
      Array.isArray(currentUserRoles)
    ) {
      if (includes(currentUserRoles, roles.admin)) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, currentUserRoles, isAuthenticating]);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: trim(e.target.value || ""),
    }));
  };

  const handleSignIn = async (credentials) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      triggerToast({
        variant: "danger",
        message: {
          title: "Oh! Something went wrong",
          summary: error.message + ". Error Code: " + error.code,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const disabledSubmit = useMemo(() => {
    if (!trim(credentials?.email || "")) {
      return true;
    }
    if (!trim(credentials?.password || "")) {
      return true;
    }
    return isLoading;
  }, [credentials, isLoading]);

  return (
    <div className="flex flex-1 justify-center items-center h-screen w-screen">
      <img
        className="absolute inset-0 h-full w-full object-cover z-0"
        src={"/assets/images/background-auth.jpg"}
        alt=""
      />
      <div className="flex flex-col justify-center items-center space-y-8 bg-green-50 py-24 px-8 relative z-[1]">
        <h2 className="text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <form
          className="mt-10 grid grid-cols-1 gap-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-[300px]">
            <TextField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="your@mail.com"
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              required
              value={credentials.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <Button
            buttonType="submit"
            disabled={disabledSubmit}
            loading={isLoading}
            onClick={() => handleSignIn(credentials)}
          >
            <div className="w-full">
              Sign in <span aria-hidden="true">&rarr;</span>
            </div>
          </Button>
        </form>
        <p className="mt-2 text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>{" "}
          Contact us for a free trial.
        </p>
      </div>
    </div>
  );
}
