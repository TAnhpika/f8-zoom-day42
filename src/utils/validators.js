import { checkExistsEmail } from "@/services/auth";
import { addMethod, object, ref, string } from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

addMethod(string, "email", function (message) {
    return this.matches(EMAIL_REGEX, {
        message,
        name: "email",
        excludeEmptyString: true,
    });
});

let timer;

const debounceCheckExistsEmail = (email) => {
    return new Promise((resolve, reject) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            try {
                const exists = await checkExistsEmail(email);
                resolve(exists);
            } catch (error) {
                    console.log(error);

                reject(error);
            }
        }, 600);
    });
};

export const registerSchema = object({
    firstName: string()
        .required("Tên người dùng là bắt buộc")
        .min(2, "Tối thiểu 2 ký tự"),
    lastName: string()
        .required("Tên người dùng là bắt buộc")
        .min(2, "Tối thiểu 2 ký tự"),
    email: string()
        .email("Sai định dạng email")
        .test(
            "email",
            "Email đã tồn tại, vui lòng chọn email khác",
            async (value, context) => {
                try {
                    await string().email().validate(context.parent.email);
                    const exists = await debounceCheckExistsEmail(value);
                    return !exists;
                } catch (error) {
                    console.log(error);
                    
                    return false;
                }
            },
        ),
    password: string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    password_confirmation: string().oneOf(
        [ref("password")],
        "Nhập lại mật khẩu k khớp",
    ),
});
