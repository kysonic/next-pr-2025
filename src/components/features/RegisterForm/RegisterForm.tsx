import { Card, Label, TextInput, Button } from 'flowbite-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchemaType } from '@/shared/validation';
import { useForm } from 'react-hook-form';
import ErrorField from '@/components/ui/forms/ErrorField';
import { useRouter } from 'next/navigation';
import { authStore } from '@/stores/auth';
import { appConfig } from '@/shared/config';

function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });
    const router = useRouter();

    const onSubmit = async (values: RegisterSchemaType) => {
        await authStore.register(values);
        // Show toast!!!
        router.push(appConfig.routes.home);
    };

    return (
        <Card className="min-w-sm lg:min-w-md">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Register
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
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1">Confirm password</Label>
                    </div>
                    <TextInput
                        {...register('confirmPassword')}
                        id="password2"
                        type="password"
                        required
                        color={errors.confirmPassword ? 'failure' : 'gray'}
                    />
                    <ErrorField error={errors.confirmPassword?.message} />
                </div>
                <div className="flex items-center gap-2"></div>
                <Button className="cursor-pointer" type="submit">
                    Submit
                </Button>
            </form>
        </Card>
    );
}

export default RegisterForm;
