import { Book } from "./books";

export const parseBook = (data: any): Book => {
    return {
        id: data.id, 
        title: data.volumeInfo.title, 
        publishedDate: data.volumeInfo.publishedDate,
        imageUrl: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : "https://leadershiftinsights.com/wp-content/uploads/2019/07/no-book-cover-available.jpg",
        authors: data.volumeInfo.authors,
        categories: data.volumeInfo.categories,
        pageCount: data.volumeInfo.pageCount,
        language: data.volumeInfo.language,
        publisher: data.volumeInfo.publisher,
        price: data.saleInfo.listPrice ? `${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}` : ""
    };
};