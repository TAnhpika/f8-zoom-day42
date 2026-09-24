import Modal from "@/components/Modal";

export default function PortalDemo() {
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
                    // onClick={() => {
                    //     alert("Clicker");
                    // }}
                >
                    <div>
                        <Modal isOpen>Modal Content</Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
