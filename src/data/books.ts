import { faker } from '@faker-js/faker';
import type { Book } from '@/entities/Book';

export const getBooks = (length = 10): Book[] => {
    return Array.from({ length }).map((v, i) => ({
        id: i + 1,
        author: faker.person.fullName(),
        title: faker.book.title(),
        isbn: faker.number.hex(),
        price: faker.number.int(),
        description: faker.lorem.paragraph(),
        coverImage: faker.image.urlPicsumPhotos(),
        publishedDate: faker.date.past(),
        publisher: faker.book.publisher(),
        pages: faker.number.int({ min: 1, max: 100 }),
        rating: faker.number.int({ min: 0, max: 5 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    }));
};

export const getBook = (id: number): Book => ({
    id,
    author: faker.person.fullName(),
    title: faker.book.title(),
    isbn: faker.number.hex(),
    price: faker.number.int(),
    description: faker.lorem.paragraph(),
    coverImage: faker.image.urlPicsumPhotos(),
    publishedDate: faker.date.past(),
    publisher: faker.book.publisher(),
    pages: faker.number.int({ min: 1, max: 100 }),
    rating: faker.number.int({ min: 0, max: 5 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
});
