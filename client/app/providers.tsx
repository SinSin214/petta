'use client';

import type { ReactNode } from 'react';
import { Toast } from '@heroui/react';
import { I18nProvider } from '@/i18n/I18nProvider';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <I18nProvider>
            {children}
            <Toast.Provider
                placement="top end"
                width={300}
            />
        </I18nProvider>
    );
}