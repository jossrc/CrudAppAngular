import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, Book, Category, Response, ResponseBook } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}/Autores`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/Categorias`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/Libros`);
  }

  getBookById(id: number): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(`${this.url}/Libros/${id}`)
  }

  addNewBook(book: Book): Observable<Response> {
    return this.http.post<Response>(`${this.url}/Libros`, book);
  }

  updateBook(book: Book): Observable<Response> {
    return this.http.put<Response>(`${this.url}/Libros`, book);
  }

  deleteBook(id: number): Observable<Response> {
    return this.http.delete<ResponseBook>(`${this.url}/Libros/${id}`)
  }

}
