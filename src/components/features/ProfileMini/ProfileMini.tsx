import { observer } from 'mobx-react-lite';
import { Button, Dropdown, DropdownItem, Spinner } from 'flowbite-react';
import { authStore } from '@/stores/auth';
import Link from 'next/link';

const ProfileMini = observer(function ProfileMini() {
    return (
        <div className="profile-mini flex items-center justify-center min-w-40 min-h-10">
            {authStore.isMeLoading && (
                <Spinner aria-label="Default status example" />
            )}
            {authStore.user && (
                <Dropdown label={authStore.user.email} dismissOnClick={false}>
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
            )}
            {!authStore.user && !authStore.isMeLoading && (
                <Button as={Link} href="/auth/login">
                    Login
                </Button>
            )}
        </div>
    );
});

export default ProfileMini;
