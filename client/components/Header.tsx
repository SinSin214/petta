'use client';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, ModalBody, ModalContent } from "@heroui/react";
import { AuthPanel } from '@/components/Auth/AuthPanel';
import { AUTH_MODE, type AuthMode } from '@/constants/auth';

// interface HeaderProps {
//     onScrollToAdoption: () => void;
// }

export function Header(
    // { onScrollToAdoption }: HeaderProps
) {
    // const { asPath } = useRouter();
    // const [isOpen, setIsOpen] = useState(false);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openAuthDialog = (mode: AuthMode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    type NavItem = {
        label: string;
        link: string;
        action: () => void;
    };

    const navItems: NavItem[] = [
        { label: "Home", link: '/', action: scrollToTop },
        { label: "Adopt", link: '/adopt', action: () => {} },
        { label: "Stories", link: '/stories', action: () => { } },
        { label: "Volunteer", link: '/volunteer', action: () => { } },
        { label: "About", link: '/about', action: () => { } },
        { label: "Contact", link: '/contact', action: () => { } },
    ];

    const renderNavItem = (item: NavItem) => {
        return (
            <NavbarItem
                key={item.label}
            // isActive={asPath === item.link}
            >
                <Link color="foreground" href={item.link} >
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
                    <Button variant="light" onPress={() => openAuthDialog(AUTH_MODE.LOGIN)}>
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button color="warning" variant="flat" onPress={() => openAuthDialog(AUTH_MODE.SIGNUP)}>
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <Modal
                isOpen={isAuthOpen}
                onOpenChange={setIsAuthOpen}
                placement="center"
                size="2xl"
                backdrop="blur"
                scrollBehavior="inside"
                classNames={{
                    base: 'bg-transparent shadow-none',
                    body: 'p-0',
                }}
            >
                <ModalContent>
                    <ModalBody>
                        <AuthPanel initialMode={authMode} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Navbar>
    );
}