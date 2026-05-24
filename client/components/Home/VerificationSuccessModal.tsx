'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Modal, toast } from '@heroui/react';
import { OPEN_AUTH_MODAL_EVENT, AUTH_MODE } from '@/constants/auth';
import { useI18n } from '@/i18n/I18nProvider';

const VERIFIED_QUERY_PARAM = 'verified';
const VERIFIED_SUCCESS_VALUE = 'success';

export function VerificationSuccessModal() {
	const { t } = useI18n();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);
	const hasShownVerificationToast = useRef(false);

	useEffect(() => {
		const isVerified = searchParams.get(VERIFIED_QUERY_PARAM) === VERIFIED_SUCCESS_VALUE;

		setIsOpen(isVerified);

		if (isVerified && !hasShownVerificationToast.current) {
			toast.success(t('auth.feedback.verifyEmailSuccess'));
			hasShownVerificationToast.current = true;
		}

		if (!isVerified) {
			hasShownVerificationToast.current = false;
		}
	}, [searchParams, t]);

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
							<Modal.Heading>{t('auth.modal.verifiedHeading')}</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<p className="text-sm leading-6 text-slate-600">
								{t('auth.feedback.verifyEmailSuccess')}
							</p>
						</Modal.Body>
						<Modal.Footer className="flex justify-end gap-3">
							<Button variant="secondary" onPress={() => handleOpenChange(false)}>
								{t('auth.labels.closeButton')}
							</Button>
							<Button variant="primary" onPress={handleLoginNow}>
								{t('auth.labels.loginNowButton')}
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}