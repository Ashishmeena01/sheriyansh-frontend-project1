import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { ToastContainer,toast } from "react-toastify";
export default function Register() {
    const notify = () => toast("User already exits you need to login!");
    const { register, formState: {
        error
    }, handleSubmit,setError } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const [showPassword, setShowPassword] = useState(false);

    const { registeredUser, setRegisteredUser } = useAuth();

    function handleRegisterationSubmit(val) {

        if (val.password.length < 8) {

            console.log("pasword less tha n8")
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (val.password !== val.confirmPassword) {
            console.log("pasword don no match")
            setError("Passwords do not match.");
            return;
        }

        if(registeredUser.find((ele)=>val.email === ele.email)){
            //todo user already there;
            console.log("user already exits")
            return;
        }
        notify();

        //user-successfully registered-todo-toaster
        setRegisteredUser((users)=>{
           const userss =  [...users,{name:val.name,email:val.email,password:val.password}]
           console.log(userss);
            const user = localStorage.setItem("registeredUser",JSON.stringify(userss));
           return userss;   
        })


        console.log("Registered successfully:",registeredUser);
    }

    const inputClass =
        "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-100";

    return (
        <main className="grid min-h-screen box-border bg-[#f4f4f2] lg:grid-cols-2 lg:p-6">
            <section className="mx-auto flex w-full max-w-md flex-col box-border px-10 py-10  justify-center">
                <ToastContainer />
                <Link to="/login" className="mb-10 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-neutral-950 font-heading text-xl font-bold text-white">
                        A
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em]">
                        AUTHENTIC
                    </span>
                </Link>

                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-500">
                    GET STARTED
                </p>

                <h1 className="font-heading text-4xl font-bold tracking-tight">
                    Create account
                </h1>

                <p className="mb-7 mt-3 text-sm leading-6 text-neutral-500">
                    Join us today. It only takes a minute.
                </p>

                <form onSubmit={handleSubmit(handleRegisterationSubmit)} className="space-x-1">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                            Full name
                        </label>
                        <input
                            {...register("name")}
                            placeholder="John Doe"
                            className={`${inputClass} pr-16`}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                            Email address
                        </label>
                        <input
                            {...register("email")}
                            placeholder="you@example.com"
                            className={`${inputClass} pr-16`}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                               {...register("password")}
                                className={`${inputClass} pr-16`}
                                placeholder="enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Confirm password
                        </label>
                        <input
                            {...register("confirmPassword")} 
                            placeholder="Re-enter your password"
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <label className="flex items-start py-2  gap-3 text-xs leading-6 text-neutral-600">
                        <input
                            type="checkbox"
                            required
                            className="mt-1 size-4 shrink-0 accent-neutral-900"
                        />
                        <span>
                            I agree to the{" "}
                            <a href="#terms" className="font-semibold text-neutral-900 underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#privacy" className="font-semibold text-neutral-900 underline">
                                Privacy Policy
                            </a>
                            .
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-between rounded-xl bg-neutral-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        Create account <span className="text-lg">→</span>
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-neutral-950 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </section>

            {/* Reuse the same visual style on the registration page */}
            <aside className="relative hidden overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_75%_25%,#515151_0%,transparent_32%),linear-gradient(145deg,#252525,#080808_75%)] text-white lg:flex lg:min-h-[calc(100vh-48px)] lg:flex-col lg:justify-between lg:p-12">
                <p className="text-[10px] tracking-[0.2em] text-neutral-400">
                    ● &nbsp; START SOMETHING NEW
                </p>

                <div className="py-16">
                    <div className="mb-7 h-0.5 w-9 bg-white" />
                    <h2 className="font-heading text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
                        Your journey
                        <br />
                        <span className="text-neutral-500">starts here.</span>
                    </h2>
                    <p className="mt-6 text-sm leading-7 text-neutral-400">
                        Create your account and open the door
                        <br />
                        to new possibilities.
                    </p>
                </div>

                <p className="text-[10px] tracking-widest text-neutral-500">
                    DESIGNED FOR WHAT'S NEXT
                </p>
            </aside>
        </main>
    );
}
