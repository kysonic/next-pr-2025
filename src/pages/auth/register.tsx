import RegisterForm from '@/components/features/RegisterForm/RegisterForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import type { NextPageWithLayout } from '@/types/common';

export const Login: NextPageWithLayout = () => {
    return <RegisterForm />;
};

Login.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
