import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import {
    Button,
    Dropdown,
    DropdownItem,
    Spinner,
    Toast,
    ToastToggle,
} from 'flowbite-react';
import { authStore } from '@/stores/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appConfig } from '@/shared/config';
import Portal from '@/components/ui/Portal/Portal';

const ProfileMini = observer(function ProfileMini() {
    const router = useRouter();

    const logout = async () => {
        try {
            await authStore.logout();
            router.push(appConfig.routes.login);
        } catch (err) {}
    };

    return (
        <div className="profile-mini flex items-center justify-center min-w-40 min-h-10">
            {authStore.isMeLoading && (
                <Spinner aria-label="Default status example" />
            )}
            {authStore.user && (
                <Dropdown label={authStore.user.email} dismissOnClick={false}>
                    <DropdownItem onClick={logout}>Sign out</DropdownItem>
                </Dropdown>
            )}
            {!authStore.user && !authStore.isMeLoading && (
                <Button as={Link} href="/auth/login">
                    Login
                </Button>
            )}
            <Portal>
                {authStore.logoutServerError && (
                    <div className="absolute bottom-10 right-10">
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                                !
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {authStore.logoutServerError}
                            </div>
                            <ToastToggle
                                onClick={() =>
                                    authStore.suspenseLogoutServerError()
                                }
                            />
                        </Toast>
                    </div>
                )}
            </Portal>
        </div>
    );
});

export default ProfileMini;
