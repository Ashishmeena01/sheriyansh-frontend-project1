
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { logIn, loggedInUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      await logIn(data);
      navigate("/");
    } catch (error) {
      setLoginError(error.message || "Unable to log in. Please try again.");
    }
  };

  if (isAuthLoading) {
    return <main className="bg-background text-muted-foreground flex min-h-screen items-center justify-center">Checking your session...</main>;
  }

  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border-border w-full max-w-md space-y-5 rounded-2xl border p-6 shadow-xl sm:p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in with a DummyJSON user account.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="emilys"
            {...register("username", {
              required: "Username is required",
            })}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.username && (
            <p className="text-muted-foreground mt-1 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-muted-foreground mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginError && <p className="border-border bg-muted text-foreground rounded-lg border p-3 text-sm" role="alert">{loginError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground w-full rounded-lg p-3 font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-semibold">Try the demo account</p>
          <p className="text-muted-foreground mt-1">Username: emilys | Password: emilyspass</p>
          <p className="text-muted-foreground mt-2 text-xs">New registrations are simulated by DummyJSON and cannot be used to log in.</p>
        </div>

        <p className="text-muted-foreground text-center text-sm">
          Need to try registration? <Link to="/register" className="text-primary font-semibold underline">Create a demo user</Link>
        </p>
      </form>
    </main>
  );
}
