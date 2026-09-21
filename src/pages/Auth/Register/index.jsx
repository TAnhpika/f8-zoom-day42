import { useForm } from "react-hook-form";
import * as authService from "@/services/auth";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "Tuan",
            lastName: "Anh",
            email: "anhpika123456@gmail.com",
            password: "123123123",
            password_confirmation: "123123123",
        },
    });

    const onSubmit = async (data) => {
        try {
            await authService.register(data);
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("firstName", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter first name..."
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <br />
                <input
                    type="text"
                    {...register("lastName", {
                        required: "Vui lòng nhập trường này",
                    })}
                    placeholder="Enter last name..."
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <br />
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
                <input
                    type="password"
                    {...register("password_confirmation", {
                        required: "Vui lòng nhập trường này",
                    })}
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
