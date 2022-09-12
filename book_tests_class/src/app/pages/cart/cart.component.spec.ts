import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from 'src/app/models/book.model';
import { BookService } from '../../services/book.service';
import { CartComponent } from './cart.component';

const listBook: Book[] = [
  {
    id: '1',
    name: 'Name Test',
    author: 'Author Test',
    isbn: '455454fdsfds',
    price: 15,
    amount: 1,
  },
  {
    id: '2',
    name: 'Name Test',
    author: 'Author Test',
    isbn: '455454fdsfds',
    price: 25,
    amount: 2,
  },
  {
    id: '3',
    name: 'Name Test',
    author: 'Author Test',
    isbn: '455454fdsfds',
    price: 5,
    amount: 3,
  },
];

describe('Cart Component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    //instanciar o component
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    //ngOnit
    fixture.detectChanges();
  });

  it('should create component', () => {
    //verificar se o componente foi criado corretamente
    expect(component).toBeTruthy();
  });

  it('test getTotalPrice return an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBe(null);
  });

  // public getTotalPrice(listCartBook: Book[]): number {
  //   let totalPrice = 0;
  //   listCartBook.forEach((book: Book) => {
  //     totalPrice += book.amount * book.price;
  //   });
  //   return totalPrice;
  // }
});
