import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data) {
            
        console.log("Login data:", data);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
                <div className="mb-8">
                    <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
                        A
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-black">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        Enter your details to sign in.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-neutral-200"
                        />

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 pr-16 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-neutral-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 hover:text-black"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-black hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </main>
    );
}