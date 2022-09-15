import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import listBook from '../../shared/listbook';
import { of } from 'rxjs';

describe('Home component0', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks method', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy = jest
      .spyOn(bookService, 'getBooks')
      .mockReturnValueOnce(of(listBook));
    component.getBooks();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.listBook.length).toBe(3);
  });
});
