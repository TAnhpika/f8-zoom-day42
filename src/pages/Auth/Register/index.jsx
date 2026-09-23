import { useForm } from "react-hook-form";
import * as authService from "@/services/auth";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validators";
import { useEffect } from "react";

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        trigger,
        watch,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await authService.register(data);
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    // Synchro checking email
    const email = watch("email");
    useEffect(() => {
        if (email) trigger("email");
    }, [email, trigger]);

    // Synchro checking password
    const password = watch("password");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/incompatible-library
        const confirmation = watch("password_confirmation");
        if (confirmation && password !== confirmation) {
            trigger("password_confirmation");
        } else {
            setError("password_confirmation", null);
        }
    }, [password, setError, trigger, watch]);

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("firstName")}
                    placeholder="Enter first name..."
                    autoFocus
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Enter last name..."
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <br />
                <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter email..."
                />
                {errors.email && <p>{errors.email.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter password..."
                />
                {errors.password && <p>{errors.password.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password_confirmation")}
                    placeholder="Confirm password..."
                />
                {errors.password_confirmation && (
                    <p>{errors.password_confirmation.message}</p>
                )}
                <br />
                <button>Register</button>
            </form>
        </div>
    );
}
