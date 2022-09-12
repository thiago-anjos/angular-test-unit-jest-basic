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
  let service: BookService;

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

    //get service outside this component
    service = fixture.debugElement.injector.get(BookService); // new way
  });

  it('should create component', () => {
    //verificar se o componente foi criado corretamente
    expect(component).toBeTruthy();
  });

  it('getTotalPrice return an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBe(null);
  });

  //test an method wich return void
  it('onInputNumberChange increments correctly plus and minus books', () => {
    const action = 'plus';
    const action2 = 'minus';
    const book: Book = {
      id: '2',
      name: 'Name Test',
      author: 'Author Test',
      isbn: '455454fdsfds',
      price: 25,
      amount: 2,
    };

    // unit test only needs to test methods of its own class, but in this method we call another service outside this class,
    // so we need to test only a call to this outside method

    // get service outside our class using fixture.debugElement.injector.get(BookService)
    // const service2 = TestBed.get(BookService); //old way
    //const service = fixture.debugElement.injector.get(BookService); // new way

    //This will not execute this service, just spy
    //This will allow us to test the method and it outside call services with "mock"

    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);

    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    expect(book.amount).toBe(2);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(3);
    component.onInputNumberChange(action2, book);
    expect(book.amount).toBe(2);

    expect(spy1).toHaveBeenCalledTimes(2);
    expect(spy2).toHaveBeenCalledTimes(2);
  });
});
