'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Link,
    Tabs,
    Tab,
    Chip,
} from '@heroui/react';
import { AUTH_MODE, AUTH_TABS, type AuthMode } from '@/constants/auth';
import { AUTH_MESSAGES } from '@/constants/messages';
import { postRequest } from '@/services/requestAPI';

type AuthPanelProps = {
    initialMode?: AuthMode;
};

type AuthUser = {
    email: string;
    fullName?: string;
};

export function AuthPanel({ initialMode = AUTH_MODE.LOGIN }: AuthPanelProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [forgotForm, setForgotForm] = useState({ email: '' });

    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setMode(initialMode);
        setFeedback('');
    }, [initialMode]);

    const title = useMemo(() => {
        if (currentUser) {
            return AUTH_MESSAGES.titles.authenticated;
        }

        return AUTH_MESSAGES.titles[mode] || AUTH_MESSAGES.titles.login;
    }, [mode, currentUser]);

    const subtitle = useMemo(() => {
        if (currentUser) {
            return AUTH_MESSAGES.subtitles.authenticated;
        }

        return AUTH_MESSAGES.subtitles[mode] || AUTH_MESSAGES.subtitles.login;
    }, [mode, currentUser]);

    const setFeedback = (text: string, error = false) => {
        setMessage(text);
        setIsError(error);
    };

    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback('');

        try {
            const response = await postRequest('/auth/login', {
                email: loginForm.email,
                password: loginForm.password,
            });

            const name = response?.user?.fullName ?? response?.user?.name;
            setCurrentUser({ email: loginForm.email, fullName: name });
            setFeedback(AUTH_MESSAGES.feedback.loginSuccess);
            setLoginForm({ email: '', password: '' });
        } catch {
            setFeedback(AUTH_MESSAGES.feedback.loginError, true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const signup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback('');

        if (signupForm.password !== signupForm.confirmPassword) {
            setFeedback(AUTH_MESSAGES.feedback.passwordMismatch, true);
            setIsSubmitting(false);
            return;
        }

        try {
            await postRequest('/auth/signup', {
                fullName: signupForm.fullName,
                email: signupForm.email,
                password: signupForm.password,
            });

            setFeedback(AUTH_MESSAGES.feedback.signupSuccess);
            setSignupForm({ fullName: '', email: '', password: '', confirmPassword: '' });
            setMode(AUTH_MODE.LOGIN);
        } catch {
            setFeedback(AUTH_MESSAGES.feedback.signupError, true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const forgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback('');

        try {
            await postRequest('/auth/forgot-password', { email: forgotForm.email });
            setFeedback(AUTH_MESSAGES.feedback.forgotSuccess);
            setForgotForm({ email: '' });
        } catch {
            setFeedback(AUTH_MESSAGES.feedback.forgotError, true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const logout = async () => {
        setIsSubmitting(true);
        setFeedback('');

        try {
            await postRequest('/auth/logout', {});
            setCurrentUser(null);
            setFeedback(AUTH_MESSAGES.feedback.logoutSuccess);
            setMode(AUTH_MODE.LOGIN);
        } catch {
            setFeedback(AUTH_MESSAGES.feedback.logoutError, true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onModeChange = (key: React.Key) => {
        setMode(key as AuthMode);
        setFeedback('');
    };

    return (
        <Card className="w-full border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white shadow-2xl shadow-amber-100/60">
            <CardHeader className="flex flex-col items-start gap-2 pb-1">
                <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            </CardHeader>

            <CardBody className="gap-4">
                {message ? (
                    <Chip color={isError ? 'danger' : 'success'} variant="flat" className="max-w-max">
                        {message}
                    </Chip>
                ) : null}

                {currentUser ? (
                    <div className="space-y-4">
                        <p className="text-slate-700">
                            {AUTH_MESSAGES.labels.signedInAs}{' '}
                            <span className="font-semibold">{currentUser.fullName ?? currentUser.email}</span>
                        </p>
                        <Button color="danger" variant="flat" onPress={logout} isLoading={isSubmitting} className="w-full sm:w-auto">
                            {AUTH_MESSAGES.labels.logoutButton}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Tabs selectedKey={mode} onSelectionChange={onModeChange} color="warning" radius="full" classNames={{ tabList: 'bg-amber-100/70 p-1' }}>
                            {AUTH_TABS.map((tab) => (
                                <Tab key={tab.key} title={tab.label} />
                            ))}
                        </Tabs>

                        {mode === AUTH_MODE.LOGIN ? (
                            <form className="space-y-4" onSubmit={login}>
                                <Input
                                    type="email"
                                    label={AUTH_MESSAGES.labels.email}
                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                    isRequired
                                    variant="bordered"
                                    value={loginForm.email}
                                    onValueChange={(value) => setLoginForm((prev) => ({ ...prev, email: value }))}
                                />
                                <Input
                                    type="password"
                                    label={AUTH_MESSAGES.labels.password}
                                    placeholder={AUTH_MESSAGES.placeholders.password}
                                    isRequired
                                    variant="bordered"
                                    value={loginForm.password}
                                    onValueChange={(value) => setLoginForm((prev) => ({ ...prev, password: value }))}
                                />
                                <div className="flex items-center justify-between">
                                    <Link size="sm" onPress={() => setMode(AUTH_MODE.FORGOT)} className="cursor-pointer text-amber-700">
                                        {AUTH_MESSAGES.labels.forgotQuestion}
                                    </Link>
                                    <Button type="submit" color="warning" isLoading={isSubmitting}>
                                        {AUTH_MESSAGES.labels.loginButton}
                                    </Button>
                                </div>
                            </form>
                        ) : null}

                        {mode === AUTH_MODE.SIGNUP ? (
                            <form className="space-y-4" onSubmit={signup} autoComplete="off">
                                <Input
                                    label={AUTH_MESSAGES.labels.fullName}
                                    placeholder={AUTH_MESSAGES.placeholders.fullName}
                                    isRequired
                                    variant="bordered"
                                    value={signupForm.fullName}
                                    onValueChange={(value) => setSignupForm((prev) => ({ ...prev, fullName: value }))}
                                />
                                <Input
                                    type="email"
                                    label={AUTH_MESSAGES.labels.email}
                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                    isRequired
                                    variant="bordered"
                                    value={signupForm.email}
                                    onValueChange={(value) => setSignupForm((prev) => ({ ...prev, email: value }))}
                                />
                                <Input
                                    type="password"
                                    label={AUTH_MESSAGES.labels.password}
                                    placeholder={AUTH_MESSAGES.placeholders.newPassword}
                                    isRequired
                                    variant="bordered"
                                    value={signupForm.password}
                                    onValueChange={(value) => setSignupForm((prev) => ({ ...prev, password: value }))}
                                />
                                <Input
                                    type="password"
                                    label={AUTH_MESSAGES.labels.confirmPassword}
                                    placeholder={AUTH_MESSAGES.placeholders.confirmPassword}
                                    isRequired
                                    variant="bordered"
                                    value={signupForm.confirmPassword}
                                    onValueChange={(value) =>
                                        setSignupForm((prev) => ({ ...prev, confirmPassword: value }))
                                    }
                                />
                                <Button type="submit" color="warning" isLoading={isSubmitting} className="w-full">
                                    {AUTH_MESSAGES.labels.signupButton}
                                </Button>
                            </form>
                        ) : null}

                        {mode === AUTH_MODE.FORGOT ? (
                            <form className="space-y-4" onSubmit={forgotPassword} autoComplete="off">
                                <Input
                                    type="email"
                                    label={AUTH_MESSAGES.labels.email}
                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                    isRequired
                                    variant="bordered"
                                    value={forgotForm.email}
                                    onValueChange={(value) => setForgotForm({ email: value })}
                                />
                                <Button type="submit" color="warning" isLoading={isSubmitting} className="w-full">
                                    {AUTH_MESSAGES.labels.sendResetButton}
                                </Button>
                            </form>
                        ) : null}
                    </>
                )}
            </CardBody>
        </Card>
    );
}
