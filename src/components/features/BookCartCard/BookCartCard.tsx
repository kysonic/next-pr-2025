import { useState, type FC, type MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import type { Book } from '@/entities/Book';
import { Button, Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartStore } from '@/stores/cart';

export interface BookCartCardProps {
    book: Book;
}

export const BookCartCard: FC<BookCartCardProps> = observer(({ book }) => {
    // For items loading state should be not global
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

    const checkout = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsCheckoutLoading(true);
        await cartStore.checkout(book.id);
        setIsCheckoutLoading(false);
    };

    return (
        <Card
            className="max-w-fit w-full md:max-w-full"
            horizontal
            renderImage={() => (
                <Image
                    className="max-w-[200] aspect-square rounded-md"
                    width={200}
                    height={200}
                    src={book.coverImage}
                    alt={book.title}
                />
            )}
        >
            <Link href={`/book/${book.id}`}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {book.title} by {book.author}
                </h5>
            </Link>

            <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.description}
            </p>
            <div className="controls flex gap-5">
                <Button
                    onClick={checkout}
                    className="cursor-pointer"
                    color="alternative"
                    pill
                    disabled={isCheckoutLoading}
                >
                    Checkout
                </Button>
            </div>
        </Card>
    );
});

export default BookCartCard;
