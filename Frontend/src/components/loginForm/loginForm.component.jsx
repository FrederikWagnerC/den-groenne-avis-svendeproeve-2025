import { useForm } from "react-hook-form";
import { useAuth } from '../../components/providers/auth.provider.jsx';
import { NavLink, Navigate } from "react-router";

export default function FormComponent({ isSignUp = true, onLoginSuccess }) {
    const { register, handleSubmit, watch, formState: { errors }, reset, trigger, setError, clearErrors } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });
    const { loginData, setLoginData } = useAuth();

    const onSubmit = async (data) => {
        // Clear any previous confirmPassword errors
        clearErrors("confirmPassword");

        if (!isSignUp) {
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
                    console.log(token)
                    setLoginData(token)
                    Navigate('/')
                    console.log("Login successful");
                } else {
                    throw new Error('Login fejlede')
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Sign up logic
            // Manual validation for confirmPassword only on submit
            if (data.password !== data.confirmPassword) {
                setError("confirmPassword", {
                    type: "manual",
                    message: "Adgangskoder matcher ikke"
                });
                return;
            }

            // Check if terms are accepted
            if (!data.terms) {
                setError("terms", {
                    type: "manual",
                    message: "Du skal acceptere betingelserne for at oprette en konto"
                });
                return;
            }

            const url = "http://localhost:3000/api/users"
            try {
                const requestData = {
                    email: data.email,
                    password: data.password,
                    firstname: data.firstName,
                    lastname: data.lastName,
                    address: data.address,
                    zipcode: data.zipCode,
                    city: data.city,
                    hasNewsletter: data.newsletter || false,
                    hasNotification: false,
                    refreshToken: "",
                    isActive: true
                };

                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                })

                if (result.ok) {
                    const response = await result.json()
                    console.log("Signup successful:", response);
                    reset();

                    // Auto-login after successful signup
                    try {
                        const loginResult = await fetch("http://localhost:3000/api/auth/login", {
                            method: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                username: data.email,
                                password: data.password
                            })
                        });

                        if (loginResult.ok) {
                            const token = await loginResult.json();
                            sessionStorage.setItem('access_token', JSON.stringify(token));
                            setLoginData(token);
                            console.log("Auto-login successful");

                            Navigate('/profil');
                            alert("Konto oprettet og du er nu logget ind!");
                        } else {
                            alert("Konto oprettet! Log venligst ind med dine nye legitimationsoplysninger.");
                            Navigate('/login')
                        }
                    } catch (loginError) {
                        console.error("Auto-login failed:", loginError);
                        alert("Konto oprettet! Log venligst ind med dine nye legitimationsoplysninger.");
                        window.location.href = '/login';
                    }
                } else {
                    // Handle server errors
                    const errorText = await result.text();
                    let errorData;
                    try {
                        errorData = JSON.parse(errorText);
                    } catch {
                        errorData = { message: errorText };
                    }
                    
                    // Check if the error is about duplicate email
                    if (errorData.message && (
                        errorData.message.toLowerCase().includes('email') || 
                        errorData.message.toLowerCase().includes('duplicate') ||
                        errorData.message.toLowerCase().includes('already exists') ||
                        errorData.error && errorData.error.toLowerCase().includes('email')
                    )) {
                        setError("email", {
                            type: "manual",
                            message: "Denne e-mail er allerede i brug"
                        });
                        return;
                    }
                    
                    throw new Error(errorData.message || errorData.error || 'Tilmelding fejlede');
                }
            } catch (error) {
                console.error("Signup error:", error);
                
                // Check if error message indicates duplicate email
                if (error.message && (
                    error.message.toLowerCase().includes('email') || 
                    error.message.toLowerCase().includes('duplicate') ||
                    error.message.toLowerCase().includes('already exists')
                )) {
                    setError("email", {
                        type: "manual",
                        message: "Denne e-mail er allerede i brug"
                    });
                } else {
                    alert("Der opstod en fejl under oprettelse af konto: " + error.message);
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-6 max-w-1/2 mx-auto">
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="flex flex-col gap-1">
                <label htmlFor="email">E-mail</label>
                <input className="border-lightgreen p-2 bg-input-bg border-2"
                    {...register("email", {
                        required: "E-mail er påkrævet",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ugyldig e-mail adresse",
                        }
                        // Removed the validate function since we don't have the API endpoint
                    })}
                    placeholder="E-mail"
                />
            </div>

            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Adgangskode</label>
                <input className="border-lightgreen p-2 bg-input-bg border-2"
                    type="password"
                    {...register("password", {
                        required: "Adgangskode er påkrævet",
                        minLength: { value: 8, message: "Adgangskode skal være mindst 8 tegn" },
                    })}
                    placeholder="Adgangskode"
                />
            </div>

            {isSignUp && (
                <>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword">Bekræft adgangskode</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Bekræft venligst din adgangskode",
                                // Remove validate to prevent onBlur validation
                            })}
                            placeholder="Bekræft adgangskode"
                        />
                    </div>
                </>
            )}

            {isSignUp && (
                <>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstName">Fornavn</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            {...register("firstName", { required: "Fornavn er påkrævet", maxLength: { value: 20, message: "Fornavn må højst være 20 tegn" } })}
                            placeholder="Fornavn"
                            type="text"
                        />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lastName">Efternavn</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            {...register("lastName", { required: "Efternavn er påkrævet", maxLength: { value: 40, message: "Efternavn må højst være 40 tegn" } })}
                            placeholder="Efternavn"
                            type="text"
                        />
                    </div>
                </>
            )}

            {isSignUp && (
                <>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="address">Adresse</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            {...register("address", { required: "Adresse er påkrævet", maxLength: { value: 100, message: "Adresse må højst være 100 tegn" } })}
                            placeholder="Adresse"
                            type="text"
                        />
                    </div>
                </>
            )}

            {isSignUp && (
                <>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="city">By</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            {...register("city", { required: "By er påkrævet", maxLength: { value: 50, message: "Bynavn må højst være 50 tegn" } })}
                            placeholder="By"
                            type="text"
                        />
                    </div>
                </>
            )}

            {isSignUp && (
                <>
                    {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="zipCode">Postnummer</label>
                        <input className="border-lightgreen p-2 bg-input-bg border-2"
                            {...register("zipCode", { required: "Postnummer er påkrævet", maxLength: { value: 20, message: "Postnummer må højst være 20 tegn" } })}
                            placeholder="Postnummer"
                            type="text"
                        />
                    </div>
                </>
            )}

            {!isSignUp ? (
                <p className="text-xs">Har du ikke allerede en konto? Klik <NavLink to="/signup" className="text-lightgreen underline">her</NavLink> for at gå til tilmelding</p>
            ) : (
                <p className="text-xs">Har du allerede en konto? Klik <NavLink to="/login" className="text-lightgreen underline">her</NavLink> for at gå til login</p>
            )}


            {isSignUp && (
                <div className="flex flex-col gap-4">
                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
                    <div className="flex items-start gap-2">
                        <div className="flex items-center cursor-pointer relative">
                            <input
                                type="checkbox"
                                id="terms check-custom-style"
                                className="peer appearance-none cursor-pointer transition-all bg-white h-4 w-4 mt-1 accent-darkgreen hover:accent-lightgreen outline-darkgreen rounded-none border-darkgreen border-2 checked:bg-lightgreen checked:border-lightgreen"
                                {...register("terms", {
                                    required: "Du skal acceptere betingelserne for at oprette en konto"
                                })}
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <label htmlFor="terms" className="text-xs text-gray-700 leading-relaxed">
                            Jeg har læst og forstået de gældende betingelser for oprettelse af kundekonto og brug af denne side
                        </label>
                    </div>


                    <div className="flex items-start gap-2">
                        <div className="flex items-center cursor-pointer relative">
                            <input
                                type="checkbox"
                                id="newsletter"
                                className="peer appearance-none cursor-pointer transition-all bg-white h-4 w-4 mt-1 accent-darkgreen hover:accent-lightgreen outline-darkgreen rounded-none border-darkgreen border-2 checked:bg-lightgreen checked:border-lightgreen"
                                {...register("newsletter")}
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <label htmlFor="newsletter" className="text-xs text-gray-700 leading-relaxed">
                            Jeg ønsker at modtage nyhedsbrev og information om nye produkter og tilbud
                        </label>
                    </div>
                </div>
            )}


            <input className="bg-darkgreen p-2 text-white w-1/4 ml-auto" type="submit" value={isSignUp ? "Tilmeld" : "Log ind"} />
        </form>
    );
}