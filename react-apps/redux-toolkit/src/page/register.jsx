import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addRegisteredUser} from "../store";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");
    const dispatch = useDispatch();


    function onSubmit(data) {
        if(!data) return;
        const {firstName,lastName,email,password} = data;
        if(data.password !== data.confirmPassword) return;
        const res = dispatch(addRegisteredUser({firstName,lastName,email,password}));
        console.log(res);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
                <div className="mb-8">
                    <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
                        A
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-black">
                        Create account
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        Enter your details to get started.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                                First name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                autoComplete="given-name"
                                {...register("firstName", {
                                    required: "First name is required",
                                })}
                                className="w-full rounded-lg border border-neutral-300 px-3 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-neutral-200"
                            />

                            {errors.firstName && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                                Last name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                autoComplete="family-name"
                                {...register("lastName", {
                                    required: "Last name is required",
                                })}
                                className="w-full rounded-lg border border-neutral-300 px-3 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-neutral-200"
                            />

                            {errors.lastName && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

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
                                placeholder="At least 6 characters"
                                autoComplete="new-password"
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

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium"
                        >
                            Confirm password
                        </label>

                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-neutral-200"
                        />

                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-black hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}