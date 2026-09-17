// import avatar from '@/assets/images/av.jpg'
import images from "@/assets/images";
import icons from "@/assets/icons";

export default function DemoAssets() {
    return (
        <div>
            {/* <img src="/img/cat.jpg" alt="" /> */}
            <img src={images.avatar} alt="" />
            <img src={icons.iconAngel} alt="" />
        </div>
    );
}
