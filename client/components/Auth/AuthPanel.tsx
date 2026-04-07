'use client';

import { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    Label,
    Input,
    TextField,
    Tabs,
    Spinner,
    ErrorMessage,
} from '@heroui/react';
import { AUTH_MODE, AUTH_TABS, type AuthMode } from '@/constants/auth';
import { AUTH_MESSAGES } from '@/constants/messages';
import { postRequest } from '@/services/requestAPI';

type AuthPanelProps = {
    initialMode?: AuthMode;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
};

export function AuthPanel({ initialMode = AUTH_MODE.LOGIN, isOpen, onOpenChange }: AuthPanelProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [forgotForm, setForgotForm] = useState({ email: '' });

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await postRequest('/auth/login', {
                email: loginForm.email,
                password: loginForm.password,
            });

            setLoginForm({ email: '', password: '' });
        } catch(err) {
            setMessage(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        if (registerForm.password !== registerForm.confirmPassword) {
            setIsLoading(false);
            return;
        }

        try {
            await postRequest('/auth/register', {
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
            });

            setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
            setMode(AUTH_MODE.LOGIN);
        } catch(err) {
            setMessage(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            await postRequest('/auth/forgot-password', { email: forgotForm.email });
            setForgotForm({ email: '' });
        } catch(err) {
            setMessage('Failed');
        } finally {
            setIsLoading(false);
        }
    };

    const onModeChange = (key: React.Key) => {
        setMessage('');
        setMode(key as AuthMode);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="opaque">
                <Modal.Container placement="top" className="px-4 mt-100">
                    <Modal.Dialog className="w-full max-w-xl">
                        <Modal.Header className="pb-2">
                            <Modal.Heading className="uppercase">Welcome</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-1">
                            <div className="flex flex-col gap-5">
                                <Tabs
                                    aria-label="Authentication options"
                                    selectedKey={mode}
                                    onSelectionChange={onModeChange}
                                    className="flex h-full w-full flex-1 flex-col"
                                    variant="secondary"
                                >
                                    <Tabs.ListContainer>
                                        <Tabs.List aria-label="Authentication options">
                                            {AUTH_TABS.map((tab) => (
                                                <Tabs.Tab
                                                    key={tab.key}
                                                    id={tab.key}
                                                    isDisabled={isLoading}
                                                >
                                                    {tab.label}
                                                    <Tabs.Indicator />
                                                </Tabs.Tab>
                                            ))}
                                        </Tabs.List>
                                    </Tabs.ListContainer>

                                    <Tabs.Panel id={AUTH_MODE.LOGIN} className="px-0">
                                        <form className="space-y-4" onSubmit={login}>
                                            <TextField variant="secondary" isRequired className="w-full">
                                                <Label>{AUTH_MESSAGES.labels.email}</Label>
                                                <Input
                                                    type="email"
                                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                                    value={loginForm.email}
                                                    disabled={isLoading}
                                                    onChange={(event) =>
                                                        setLoginForm((prev) => ({ ...prev, email: event.currentTarget.value }))
                                                    }
                                                />
                                            </TextField>
                                            <TextField variant="secondary" isRequired className="w-full">
                                                <Label>{AUTH_MESSAGES.labels.password}</Label>
                                                <Input
                                                    type="password"
                                                    placeholder={AUTH_MESSAGES.placeholders.password}
                                                    value={loginForm.password}
                                                    disabled={isLoading}
                                                    onChange={(event) =>
                                                        setLoginForm((prev) => ({ ...prev, password: event.currentTarget.value }))
                                                    }
                                                />
                                            </TextField>
                                            <ErrorMessage>{message && <div className="text-sm text-red-500">{message}</div>}</ErrorMessage>
                                            <Button type="submit" variant="primary" isDisabled={isLoading} className="mt-4 w-full">
                                                {isLoading ? <Spinner color="current" size="sm" /> : AUTH_MESSAGES.labels.loginButton}
                                            </Button>
                                        </form>
                                    </Tabs.Panel>

                                    <Tabs.Panel id={AUTH_MODE.REGISTER} className="px-0">
                                        <form className="space-y-4" onSubmit={register} autoComplete="off">
                                            <TextField variant="secondary" isRequired className="w-full">
                                                <Label>{AUTH_MESSAGES.labels.name}</Label>
                                                <Input
                                                    placeholder={AUTH_MESSAGES.placeholders.name}
                                                    value={registerForm.name}
                                                    disabled={isLoading}
                                                    onChange={(event) =>
                                                        setRegisterForm((prev) => ({ ...prev, name: event.currentTarget.value }))
                                                    }
                                                />
                                            </TextField>
                                            <TextField variant="secondary" isRequired className="w-full">
                                                <Label>{AUTH_MESSAGES.labels.email}</Label>
                                                <Input
                                                    type="email"
                                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                                    value={registerForm.email}
                                                    disabled={isLoading}
                                                    onChange={(event) =>
                                                        setRegisterForm((prev) => ({ ...prev, email: event.currentTarget.value }))
                                                    }
                                                />
                                            </TextField>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <TextField variant="secondary" isRequired className="w-full">
                                                    <Label>{AUTH_MESSAGES.labels.password}</Label>
                                                    <Input
                                                        type="password"
                                                        placeholder={AUTH_MESSAGES.placeholders.newPassword}
                                                        value={registerForm.password}
                                                        disabled={isLoading}
                                                        onChange={(event) =>
                                                            setRegisterForm((prev) => ({ ...prev, password: event.currentTarget.value }))
                                                        }
                                                    />
                                                </TextField>
                                                <TextField variant="secondary" isRequired className="w-full">
                                                    <Label>{AUTH_MESSAGES.labels.confirmPassword}</Label>
                                                    <Input
                                                        type="password"
                                                        placeholder={AUTH_MESSAGES.placeholders.confirmPassword}
                                                        value={registerForm.confirmPassword}
                                                        disabled={isLoading}
                                                        onChange={(event) =>
                                                            setRegisterForm((prev) => ({ ...prev, confirmPassword: event.currentTarget.value }))
                                                        }
                                                    />
                                                </TextField>
                                            </div>
                                            <ErrorMessage>{message && <div className="text-sm text-red-500">{message}</div>}</ErrorMessage>
                                            <Button type="submit" variant="primary" isDisabled={isLoading} className="mt-4 w-full">
                                                {isLoading ? <Spinner color="current" size="sm" /> : AUTH_MESSAGES.labels.registerButton}
                                            </Button>
                                        </form>
                                    </Tabs.Panel>

                                    <Tabs.Panel id={AUTH_MODE.FORGOT} className="px-0">
                                        <form className="space-y-4" onSubmit={forgotPassword}>
                                            <TextField variant="secondary" isRequired className="w-full">
                                                <Label>{AUTH_MESSAGES.labels.email}</Label>
                                                <Input
                                                    type="email"
                                                    placeholder={AUTH_MESSAGES.placeholders.email}
                                                    value={forgotForm.email}
                                                    disabled={isLoading}
                                                    onChange={(event) => setForgotForm({ email: event.currentTarget.value })}
                                                />
                                            </TextField>
                                            <ErrorMessage>{message && <div className="text-sm text-red-500">{message}</div>}</ErrorMessage>
                                            <Button type="submit" variant="primary" isDisabled={isLoading} className="mt-4 w-full">
                                                {isLoading ? <Spinner color="current" size="sm" /> : AUTH_MESSAGES.labels.sendResetButton}
                                            </Button>
                                        </form>
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
