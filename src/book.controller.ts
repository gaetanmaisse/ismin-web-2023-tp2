import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(@Query('author') author: string): Array<Book> {
    if (author) {
      return this.bookService.getBooksOf(author);
    }
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() book: Book): Book {
    this.bookService.addBook(book);
    return this.bookService.getBook(book.isbn);
  }

  @Get(':isbn')
  getBook(@Param('isbn') isbn: string): Book {
    return this.bookService.getBook(isbn);
  }

  @Delete(':isbn')
  deleteBook(@Param('isbn') isbn: string): void {
    this.bookService.delete(isbn);
  }
}
