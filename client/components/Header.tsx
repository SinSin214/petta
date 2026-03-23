'use client';
import { useState } from "react";
// import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";

// interface HeaderProps {
//     onScrollToAdoption: () => void;
// }

export function Header(
    // { onScrollToAdoption }: HeaderProps
) {
    // const { asPath } = useRouter();
    // const [isOpen, setIsOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navItems = [
        { label: "Home", link: '/', action: scrollToTop },
        { label: "Adopt", link: '/adopt', action: () => {} },
        { label: "Stories", link: '/stories', action: () => { } },
        { label: "Volunteer", link: '/volunteer', action: () => { } },
        { label: "About", link: '/about', action: () => { } },
        { label: "Contact", link: '/contact', action: () => { } },
    ];

    const renderNavItem = (item: any, isMobile = false) => {
        return (
            <NavbarItem
                key={item.label}
            // isActive={asPath === item.link}
            >
                <Link color="foreground" href={item.link}>
                    {item.label}
                </Link>
            </NavbarItem>
        );
    };

    return (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b shadow-sm">
            <NavbarBrand>
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => renderNavItem(item))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}