'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Modal } from '@heroui/react';
import { OPEN_AUTH_MODAL_EVENT, AUTH_MODE } from '@/constants/auth';
import { AUTH_MESSAGES } from '@/constants/messages';

const VERIFIED_QUERY_PARAM = 'verified';
const VERIFIED_SUCCESS_VALUE = 'success';

export function VerificationSuccessModal() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(searchParams.get(VERIFIED_QUERY_PARAM) === VERIFIED_SUCCESS_VALUE);
	}, [searchParams]);

	const clearVerificationQuery = () => {
		const nextParams = new URLSearchParams(searchParams.toString());
		nextParams.delete(VERIFIED_QUERY_PARAM);
		const nextQuery = nextParams.toString();

		router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);

		if (!open) {
			clearVerificationQuery();
		}
	};

	const handleLoginNow = () => {
		clearVerificationQuery();
		window.dispatchEvent(
			new CustomEvent(OPEN_AUTH_MODAL_EVENT, {
				detail: { mode: AUTH_MODE.LOGIN },
			}),
		);
		setIsOpen(false);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
			<Modal.Backdrop variant="opaque">
				<Modal.Container placement="center" className="px-4">
					<Modal.Dialog className="w-full max-w-md">
						<Modal.Header>
							<Modal.Heading>Account verified</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<p className="text-sm leading-6 text-slate-600">
								{AUTH_MESSAGES.feedback.verifyEmailSuccess}
							</p>
						</Modal.Body>
						<Modal.Footer className="flex justify-end gap-3">
							<Button variant="secondary" onPress={() => handleOpenChange(false)}>
								{AUTH_MESSAGES.labels.closeButton}
							</Button>
							<Button variant="primary" onPress={handleLoginNow}>
								{AUTH_MESSAGES.labels.loginNowButton}
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}