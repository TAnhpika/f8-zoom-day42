import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import clsx from "clsx";

const Modal = forwardRef(
    (
        {
            // đổi tên thành _isOpen trong component nhưng bên ngoài vẫn truyền prop isOpen bth
            isOpen: _isOpen = false,
            shouldCloseOnOverlayClick = true,
            shouldCloseOnEsc = true,
            children,
            // closeTimeoutMS: giúp hỗ trợ modal animation
            closeTimeoutMS = 0,
            className,
            // bodyOpenClassName: ẩn thanh scrollbar khi mở modal
            bodyOpenClassName,
            overlayClassName,
            onRequestClose,
        },
        ref,
    ) => {
        // khi re-render isOpen k dùng lại giá trị khởi tạo là _isOpen nữa
        const [isOpen, setIsOpen] = useState(_isOpen);

        useEffect(() => {
            setIsOpen(_isOpen); 
        }, [_isOpen]);

        useImperativeHandle(
            ref,
            () => ({
                open() {
                    setIsOpen(true);
                },
                close() {
                    setIsOpen(false);
                },
                toggle() {
                    setIsOpen(!isOpen);
                },
            }),
            [isOpen],
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const handleRequestClose = () => {
            setTimeout(onRequestClose, closeTimeoutMS);
        };

        // useEffect cần đứng trc điều kiện return vì
        //  khi components đc sử dụng thì hooks phải lun đc chạy
        useEffect(() => {
            // vđ: khi modal chưa bật vẫn lắng nghe sự kiện
            // vđ: k remove đc
            // lý do: mỗi lần chạy lại sẽ tạo ra 1 context mới -> trong context mới đó tạo lại hàm handle mới
            // muốn remove thì cần truyền cùng 1 tham chiếu
            // load home -> Modal đc mounted -> đã gọi callback -> tạo handle ở #0x001
            // -> isOpen = false -> remove #0x001
            // khi click open modal, components vẫn đang mounted
            // open modal -> render lại home -> render lại Modal
            // -> callback chạy lại vì isOpen đổi -> tạo lại hàm handle #0x002
            // -> addEventListener #0x002
            // khi click đóng modal -> Home re-render -> Modal re-render -> tạo handle #0x003
            // -> remove #0x003 khi #0x002 vẫn đang lắng nghe

            if (!shouldCloseOnEsc) return;

            const handle = (e) => {
                // console.log(e.code);

                if (e.code === "Escape") {
                    handleRequestClose();
                }
            };

            if (isOpen) {
                document.addEventListener("keyup", handle);
            }

            // console.log("Callback");

            // Cleanup function
            return () => {
                // console.log("Cleanup");

                document.removeEventListener("keyup", handle);
            };
        }, [shouldCloseOnEsc, isOpen, onRequestClose, handleRequestClose]);

        useEffect(() => {
            document.body.classList.add(bodyOpenClassName);

            return () => {
                document.body.classList.remove(bodyOpenClassName);
            };
        }, [bodyOpenClassName]);
        // console.log("Render");

        if (!isOpen) return null;

        return (
            <div className={styles.modal}>
                <div className={clsx(styles.content, className)}>
                    {/* Close button */}
                    <button
                        className={styles.closeBtn}
                        onClick={handleRequestClose}
                    >
                        &times;
                    </button>

                    {/* Children */}
                    <div className={styles.body}>{children}</div>
                </div>

                {/* Overlay */}
                <div
                    className={clsx(styles.overlay, overlayClassName)}
                    onClick={() => {
                        if (shouldCloseOnOverlayClick) handleRequestClose();
                    }}
                />
            </div>
        );
    },
);

Modal.displayName = "Modal";

Modal.propTypes = {
    isOpen: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    shouldCloseOnEsc: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    bodyOpenClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    closeTimeoutMS: PropTypes.number,
    onRequestClose: PropTypes.func,
};

export default Modal;
