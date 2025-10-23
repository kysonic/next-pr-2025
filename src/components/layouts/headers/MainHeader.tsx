import ProfileMini from '@/components/features/ProfileMini/ProfileMini';
import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MainHeader() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand as={Link} href="/">
                <Image
                    src="/img/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite React Logo"
                    width={24}
                    height={24}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Next Book Shop
                </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink as={Link} href="/">
                    Home
                </NavbarLink>
                <NavbarLink as={Link} href="/cart">
                    Cart
                </NavbarLink>
                <ProfileMini />
            </NavbarCollapse>
        </Navbar>
    );
}
