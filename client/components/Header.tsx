'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Tabs, toast } from '@heroui/react';
import { AuthPanel } from '@/components/Auth/AuthPanel';
import { AUTH_MODE, AUTH_STORAGE_KEYS, OPEN_AUTH_MODAL_EVENT, type AuthMode } from '@/constants/auth';
import { useI18n } from '@/i18n/I18nProvider';

type AuthUser = {
    id: string;
    email: string;
    name: string;
    role: string;
};

export function Header() {
    const { locale, setLocale, t } = useI18n();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [resetToken, setResetToken] = useState<string | undefined>(undefined);

    const clearResetQuery = () => {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete('reset_token');
        const nextQuery = nextParams.toString();
        router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    };

    const loadAuthUser = () => {
        const rawUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

        if (!rawUser) {
            setAuthUser(null);
            return;
        }

        try {
            setAuthUser(JSON.parse(rawUser) as AuthUser);
        } catch {
            localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
            setAuthUser(null);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openAuthDialog = () => {
        setAuthMode(AUTH_MODE.LOGIN);
        setIsAuthOpen(true);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
        setAuthUser(null);
        toast.success(t('messages.codes.LoggedOutSuccess'));
        router.refresh();
    };

    const onLoginSuccess = () => {
        loadAuthUser();
        router.refresh();
    };

    const onResetPasswordSuccess = () => {
        setResetToken(undefined);
        clearResetQuery();
    };

    const onAuthOpenChange = (open: boolean) => {
        setIsAuthOpen(open);

        if (!open && resetToken) {
            setResetToken(undefined);
            setAuthMode(AUTH_MODE.LOGIN);
            clearResetQuery();
        }
    };

    type NavItem = {
        label: string;
        link: string;
        action: () => void;
    };

    const navItems: NavItem[] = [
        { label: t('common.nav.home'), link: '/', action: scrollToTop },
        { label: t('common.nav.adopt'), link: '/adopt', action: () => {} },
        { label: t('common.nav.stories'), link: '/stories', action: () => { } },
        { label: t('common.nav.volunteer'), link: '/volunteer', action: () => { } },
        { label: t('common.nav.about'), link: '/about', action: () => { } },
        { label: t('common.nav.contact'), link: '/contact', action: () => { } },
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

    useEffect(() => {
        loadAuthUser();

        const onOpenAuthModal = (event: Event) => {
            const customEvent = event as CustomEvent<{ mode?: AuthMode }>;
            setAuthMode(customEvent.detail?.mode ?? AUTH_MODE.LOGIN);
            setIsAuthOpen(true);
        };

        // Listen if user verifies email, redirect to page and open modal for login
        window.addEventListener(OPEN_AUTH_MODAL_EVENT, onOpenAuthModal);

        return () => {
            window.removeEventListener(OPEN_AUTH_MODAL_EVENT, onOpenAuthModal);
        };
    }, []);

    useEffect(() => {
        const token = searchParams.get('reset_token');

        if (!token) {
            return;
        }

        setResetToken(token);
        setAuthMode(AUTH_MODE.NEW_PASSWORD);
        setIsAuthOpen(true);
    }, [searchParams]);

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
                    <p className="text-xs text-slate-500">{t('header.tagline')}</p>
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
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1">
                        <Button
                            size="sm"
                            variant={locale === 'en' ? 'primary' : 'tertiary'}
                            onPress={() => setLocale('en')}
                            aria-label={t('common.language.en')}
                        >
                            {t('common.language.en')}
                        </Button>
                        <Button
                            size="sm"
                            variant={locale === 'vn' ? 'primary' : 'tertiary'}
                            onPress={() => setLocale('vn')}
                            aria-label={t('common.language.vn')}
                        >
                            {t('common.language.vn')}
                        </Button>
                    </div>
                    {authUser ? (
                        <>
                            <span className="text-sm font-medium text-slate-700">{t('common.auth.hiName', { name: authUser.name })}</span>
                            <Button variant="secondary" onPress={logout}>
                                {t('auth.labels.logoutButton')}
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" onPress={() => openAuthDialog()}>
                            {t('common.auth.login')}
                        </Button>
                    )}
                </div>
            </div>
            <AuthPanel
                initialMode={authMode}
                isOpen={isAuthOpen}
                onOpenChange={onAuthOpenChange}
                onLoginSuccess={onLoginSuccess}
                resetToken={resetToken}
                onResetPasswordSuccess={onResetPasswordSuccess}
            />
        </header>
    );
}