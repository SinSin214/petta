'use client';

import type { ReactNode } from 'react';
import { Toast } from '@heroui/react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Toast.Provider placement="top end" maxVisibleToasts={4} />
        </>
    );
}