import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

import * as authService from "@/services/auth";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/features/auth";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const [params] = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "anhpika123456@gmail.com",
            password: "123123123",
        },
    });

    useEffect(() => {
        if (currentUser) {
            const continuePath = params.get("continue") || "/";
            navigate(continuePath);
        }
    }, [currentUser, navigate, params]);

    const onSubmit = async (data) => {
        const { access_token } = await authService.login(data);
        if (access_token) {
            localStorage.setItem("token", access_token);
            dispatch(authService.getCurrentUser());
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("email", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter email..."
                />
                {errors.email && <p>{errors.email.message}</p>}
                <br />
                <input
                    type="password"
                    {...register("password", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter password..."
                />
                {errors.password && <p>{errors.password.message}</p>}
                <br />

                <button>Login</button>
            </form>
        </div>
    );
}
