import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment.prod';
import listBook from '../shared/listbook';
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import swal from 'sweetalert2';

const book: Book = {
  author: 'thiago',
  isbn: 'qwqwq',
  name: 'teste',
  amount: 0,
  description: 'des',
  id: '5000',
  photoUrl: '',
  price: 300,
};

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  });

  afterAll(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of book and does a get method', () => {
    service.getBooks().subscribe((res: Book[]) => {
      expect(res).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCart return an empty array when localstorage is empty', () => {
    const list = service.getBooksFromCart();
    expect(list.length).toBe(0);
  });

  it('getBooksFromCart set a value on localstorage to return it', () => {
    //set localstorage
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const list = service.getBooksFromCart();
    expect(list.length).toBe(3);
  });

  it('removeBooksFromCart', () => {
    localStorage.clear();

    const toastMock = {
      fire: () => null,
    } as any;

    const spy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    let newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(0);
    service.addBookToCart(book);
    newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(1);

    service.removeBooksFromCart();
    newListBook = service.getBooksFromCart();

    expect(newListBook.length).toBe(0);
  });

  it('addBookToCart', () => {
    localStorage.clear();

    const toastMock = {
      fire: () => null,
    } as any;

    const spy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    let listBook = null;
    expect(listBook).toBeNull;

    listBook = service.addBookToCart(book);
  });

  it('updateAmountBook', async () => {
    const book2: Book = {
      author: 'thiago',
      isbn: 'qwqwq',
      name: 'teste',
      amount: 0,
      description: 'des',
      id: '5000',
      photoUrl: '',
      price: 300,
    };
    service.updateAmountBook(book);
    service.updateAmountBook(book2);
  });
});
