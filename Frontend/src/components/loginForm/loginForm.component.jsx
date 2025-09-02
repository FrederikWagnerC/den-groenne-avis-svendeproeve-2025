import { useForm } from "react-hook-form";
import { useAuth } from '../../components/providers/auth.provider.jsx';

export default function FormComponent({ isSignUp = true, onLoginSuccess }) {
    const { register, handleSubmit, watch, formState: { errors }, reset, trigger, setError, clearErrors } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });
    const { loginData, setLoginData } = useAuth();

    const onSubmit = async (data) => {
        // Clear any previous confirmPassword errors
        clearErrors("confirmPassword");

        if(!isSignUp) {
            const url = "http://localhost:3000/api/auth/login"
        try {
            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: data.email,
                    password: data.password
                })
            })

            if (result.ok) {
                const token = await result.json()
                sessionStorage.setItem('access_token', JSON.stringify(token))
                setLoginData(token)
                console.log("Login successful");
            } else {
                throw new Error('Login fejlede')
            }
            //console.log(result)
        } catch (error) {
            console.error(error);
        }
        }
        
        // Manual validation for confirmPassword only on submit
        if (isSignUp && data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match"
            });
            return;
        }
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            {errors.email && <p>{errors.email.message}</p>}
            <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
                })}
                placeholder="Email"
            />

            {isSignUp && (
                <>
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    <input
                        {...register("firstName", { required: "First Name is required", maxLength: 20 })}
                        placeholder="First Name"
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                    <input
                        {...register("lastName", { required: "Last Name is required", maxLength: 40 })}
                        placeholder="Last Name"
                    />
                </>
            )}

            {errors.password && <p>{errors.password.message}</p>}
            <input
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                placeholder="Password"
            />

            {isSignUp && (
                <>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            // Remove validate to prevent onBlur validation
                        })}
                        placeholder="Confirm Password"
                    />
                </>
            )}

            <input type="submit" value={isSignUp ? "Sign up" : "Log in"} />
        </form>
    );
}
 