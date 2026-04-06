'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Tabs } from '@heroui/react';
import { AuthPanel } from '@/components/Auth/AuthPanel';
import { AUTH_MODE, type AuthMode } from '@/constants/auth';

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
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

    const selectedTab = navItems.find((item) => item.link === pathname)?.link ?? '/';

    const handleTabChange = (key: React.Key) => {
        const selectedItem = navItems.find((item) => item.link === key);

        if (!selectedItem) {
            return;
        }

        selectedItem.action();

        if (pathname !== selectedItem.link) {
            router.push(selectedItem.link);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
                <button
                    type="button"
                    onClick={() => {
                        scrollToTop();
                        if (pathname !== '/') {
                            router.push('/');
                        }
                    }}
                    className="text-left"
                >
                    <p className="text-lg font-semibold tracking-[0.25em] text-slate-900 uppercase">Petta</p>
                    <p className="text-xs text-slate-500">Find a home for every rescued friend</p>
                </button>

                <Tabs
                    aria-label="Primary navigation"
                    selectedKey={selectedTab}
                    onSelectionChange={handleTabChange}
                    className="w-full lg:max-w-3xl"
                >
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Primary navigation" className="w-full rounded-full p-1">
                            {navItems.map((item) => (
                                <Tabs.Tab
                                    key={item.link}
                                    id={item.link}
                                    className="flex-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition"
                                >
                                    {item.label}
                                    <Tabs.Indicator className="rounded-full bg-white shadow-sm" />
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>
                </Tabs>

                <div className="flex items-center justify-end gap-2">
                    <Button variant="primary" onPress={() => openAuthDialog(AUTH_MODE.LOGIN)}>
                        Login
                    </Button>
                </div>
            </div>
            <AuthPanel initialMode={authMode} isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
        </header>
    );
}