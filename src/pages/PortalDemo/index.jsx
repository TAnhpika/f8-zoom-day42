import Modal from "@/components/Modal";
import { useState } from "react";

export default function PortalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h1>Portal demo</h1>
            <div>
                <div
                    style={{
                        width: 100,
                        height: 100,
                        transform: "scale(1.1)",
                    }}
                >
                    <div>
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={() => {
                                setIsOpen(false);
                            }}
                        >
                            Modal Content
                        </Modal>
                        <button
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Open
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
