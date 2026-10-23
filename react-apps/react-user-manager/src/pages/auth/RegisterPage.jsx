import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { createUser } from "../../api/usersApi";

export default function RegisterPage() {
  const [result, setResult] = useState(null);
  const [registrationError, setRegistrationError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(formData) {
    setResult(null);
    setRegistrationError("");

    try {
      const { firstName, lastName, username, email, password } = formData;
      const createdUser = await createUser({ firstName, lastName, username, email, password });
      setResult(createdUser);
    } catch (error) {
      setRegistrationError(error.message || "Could not submit registration.");
    }
  }

  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border-border w-full max-w-lg space-y-5 rounded-2xl border p-6 shadow-xl sm:p-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Submit a new user to the DummyJSON demo API.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="First name" error={errors.firstName?.message}>
            <input
              autoComplete="given-name"
              {...register("firstName", { required: "First name is required" })}
              className={inputClass}
            />
          </FormField>
          <FormField label="Last name" error={errors.lastName?.message}>
            <input
              autoComplete="family-name"
              {...register("lastName", { required: "Last name is required" })}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Username" error={errors.username?.message}>
          <input
            autoComplete="username"
            {...register("username", { required: "Username is required" })}
            className={inputClass}
          />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
            className={inputClass}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <input
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Use at least 6 characters" },
            })}
            className={inputClass}
          />
        </FormField>

        <FormField label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            className={inputClass}
          />
        </FormField>

        {registrationError && (
          <p className="border-border bg-muted text-foreground rounded-lg border p-3 text-sm" role="alert">
            {registrationError}
          </p>
        )}

        {result && (
          <div className="rounded-xl border border-border bg-muted p-4 text-sm" role="status">
            <p className="font-semibold">Registration request completed for {result.firstName} {result.lastName} (ID {result.id}).</p>
            <p className="text-muted-foreground mt-2">
              DummyJSON simulates new users but does not save them, so this account cannot be used to sign in. Use the sample credentials on the login page.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground w-full rounded-lg p-3 font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-muted-foreground text-center text-sm">
          Already have an account? <Link to="/login" className="text-primary font-semibold underline">Log in</Link>
        </p>
      </form>
    </main>
  );
}

const inputClass = "border-border bg-background text-foreground placeholder:text-muted-foreground mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary";

function FormField({ label, error, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
      {error && <span className="text-muted-foreground mt-1 block text-sm">{error}</span>}
    </label>
  );
}
