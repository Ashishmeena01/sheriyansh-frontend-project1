import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/myStore";
import { useAuth } from "../context/auth";

export default function Login() {

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { registeredUser, LogedInUser, setIsLogedInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    
    function onSubmit(data) {
        const user = registeredUser.find((val)=>data.email === val.email);
        if(!user){
            //todo user is not there need to login
            return;
        }
        if(user.email !== data.email){
            //todo user password doesnot match
            
            return;
        }
        setIsLogedInUser(data);
        localStorage.setItem("LogedInUser",JSON.stringify(data));
    }
    
    if(LogedInUser ) return <Navigate to={'/'}/>
    return (
        <main className="grid min-h-screen bg-[#f4f4f2] lg:grid-cols-2 lg:p-6">
            <section className="mx-auto my-10 flex w-full max-w-md flex-col justify-center px-10">
                <Link to="/login" className="mb-14 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-neutral-950 font-heading text-xl font-bold text-white">
                        A
                    </span>

                    <span className="text-xs font-bold tracking-[0.2em]">
                        AUTHENTIC
                    </span>
                </Link>

                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-500">
                    WELCOME BACK
                </p>

                <h1 className="font-heading text-4xl font-bold tracking-tight">
                    Sign in
                </h1>

                <p className="mb-8 mt-3 text-sm leading-6 text-neutral-500">
                    Enter your details to access your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            {...register("email", { required: true })}
                            required
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-100"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold"
                            >
                                Password
                            </label>

                            <button
                                type="button"
                                onClick={() =>
                                    alert("Implement password reset here.")
                                }
                                className="text-xs text-neutral-600 hover:text-black"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                                required
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 pr-16 text-sm outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-between rounded-xl bg-neutral-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        Sign in
                        <span className="text-lg">→</span>
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-neutral-200" />

                    <span className="text-[10px] tracking-widest text-neutral-400">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-neutral-200" />
                </div>

                <button
                    type="button"
                    onClick={() =>
                        alert("Implement Google authentication here.")
                    }
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm font-semibold hover:bg-neutral-50"
                >
                    <span className="mr-2 font-bold text-blue-600">G</span>
                    Continue with Google
                </button>

                <p className="mt-7 text-center text-sm text-neutral-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-bold text-neutral-950 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </section>

            <AuthPanel />
        </main>
    );
}

function AuthPanel() {
    return (
        <aside className="relative hidden overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_75%_25%,#515151_0%,transparent_32%),linear-gradient(145deg,#252525,#080808_75%)] text-white lg:flex lg:min-h-[calc(100vh-48px)] lg:flex-col lg:justify-between lg:p-12">
            <div className="text-[10px] tracking-[0.2em] text-neutral-400">
                ● &nbsp; YOUR NEXT CHAPTER STARTS HERE
            </div>

            <div className="relative z-10 py-16">
                <div className="mb-7 h-0.5 w-9 bg-white" />

                <h2 className="font-heading text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
                    Build something
                    <br />
                    <span className="text-neutral-500">
                        extraordinary.
                    </span>
                </h2>

                <p className="mt-6 text-sm leading-7 text-neutral-400">
                    One account. Endless possibilities.
                    <br />
                    Sign in and pick up where you left off.
                </p>
            </div>

            <p className="text-[10px] tracking-widest text-neutral-500">
                DESIGNED FOR WHAT'S NEXT
            </p>
        </aside>
    );
}