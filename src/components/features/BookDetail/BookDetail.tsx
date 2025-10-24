import { useEffect, useState } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { booksStore } from '@/stores/books';
import { useRouter } from 'next/router';
import type { Book } from '@/entities/Book';
import { Button } from 'flowbite-react';

export type PartialBookKeys = Partial<Record<keyof Book, string>>;

const BOOKS_PROPS_TO_RENDER: PartialBookKeys = {
    isbn: 'ISBN',
    pages: 'PAGES',
    price: 'PRICE',
    publisher: 'PUBLISHER',
    publishedDate: 'PUBLISH DATE',
    rating: 'RATING',
};

export const BookDetail = observer(() => {
    const router = useRouter();
    // For items loading state should be not global
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [isToCartLoading, setIsToCartLoading] = useState(false);

    const favorite = async () => {
        if (booksStore.book) {
            setIsFavoriteLoading(true);
            await booksStore.favorite(booksStore.book.id);
            setIsFavoriteLoading(false);
        }
    };

    const toCart = async () => {
        if (booksStore.book) {
            setIsToCartLoading(true);
            await booksStore.toCart(booksStore.book.id);
            setIsToCartLoading(false);
        }
    };

    useEffect(() => {
        if (router?.query?.id) {
            booksStore.getBook(+router.query.id);
        }
    }, [router.query.id]);

    return (
        <div className="book-detail grid grid-cols-1 p-5 md:grid-cols-2 md:grid-rows-[auto_auto] md:p-10 gap-10">
            <div className="main">
                <div className="title text-3xl">
                    "{booksStore.book?.title}" by {booksStore.book?.author}
                </div>
                <div className="image overflow-hidden relative aspect-[3/2] mt-2">
                    <Image
                        className="w-full h-full rounded-md"
                        alt={booksStore.book?.title ?? ''}
                        src={booksStore.book?.coverImage ?? ''}
                        fill={true}
                    />
                </div>
            </div>
            <div className="info flex flex-col gap-2 mt-10">
                {Object.entries(BOOKS_PROPS_TO_RENDER).map(([k, v]) => (
                    <div key={k}>
                        <span className="text-base font-bold">{v}:</span>
                        <span className="text-base ml-10">
                            {booksStore.book?.[k as keyof Book].toString()}
                        </span>
                    </div>
                ))}
            </div>
            <div className="description self-start">
                <p className="text-base">{booksStore.book?.description}</p>
            </div>
            <div className="controls self-start flex gap-5">
                <Button
                    onClick={favorite}
                    className="cursor-pointer"
                    color="alternative"
                    pill
                    disabled={isFavoriteLoading}
                >
                    Favorite
                </Button>
                <Button
                    onClick={toCart}
                    className="cursor-pointer"
                    pill
                    disabled={isToCartLoading}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
});

export default BookDetail;
