import ApplicationLogo from "@/Components/ApplicationLogo";
import Navbar from "@/Components/Navbar";
import { Link } from "@inertiajs/react";

export default function HomeLayout({ children, auth }) {
    return (
        <div className="">
            <Navbar auth={auth} />
            <main>{children}</main>
        </div>
    );
}
