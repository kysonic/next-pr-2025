import { Card, Checkbox, Label, TextInput, Button } from 'flowbite-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/shared/validation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ErrorField from '@/components/ui/forms/ErrorField';
import { useRouter } from 'next/navigation';
import { authStore } from '@/stores/auth';
import { appConfig } from '@/shared/config';

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const onSubmit = async (values: LoginSchemaType) => {
        await authStore.login(values);
        // Show toast!!!
        router.push(appConfig.routes.home);
    };

    return (
        <Card className="min-w-sm lg:min-w-md">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Login
            </h5>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex max-w-md flex-col gap-4"
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1">Your email</Label>
                    </div>
                    <TextInput
                        {...register('email')}
                        id="email1"
                        type="email"
                        placeholder="Enter your Email"
                        required
                        color={errors.email ? 'failure' : 'gray'}
                    />
                    <ErrorField error={errors.email?.message} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1">Your password</Label>
                    </div>
                    <TextInput
                        {...register('password')}
                        id="password1"
                        type="password"
                        required
                        color={errors.password ? 'failure' : 'gray'}
                    />
                    <ErrorField error={errors.password?.message} />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button className="cursor-pointer" type="submit">
                    Submit
                </Button>
            </form>
        </Card>
    );
}

export default LoginForm;
