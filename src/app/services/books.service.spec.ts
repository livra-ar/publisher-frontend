import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { ConfigService } from '../services/config.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BooksService', () => {
  let service: BooksService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;
  let root_url;
  beforeEach(() => {
    TestBed.configureTestingModule({
    	providers: [ConfigService, BooksService],
      	imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    configService = TestBed.inject(ConfigService);
    root_url = configService.serverUrl;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


	describe('#addBook', () => {
	  	it('should send a POST request to the correct endpoint', () => {
	      	service.addBook({}).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/book/`);
	       	expect(req.request.method).toEqual('POST');
	       	req.flush({});
		});
	});

	describe('#getById', () => {
	  	it('should send a GET request to the correct endpoint', () => {
	  		const id = '1';
	      	service.getById(id).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/book/${id}`);
	       	expect(req.request.method).toEqual('GET');
	       	req.flush({});
		});
	});

	describe('#getUsersBooks', () => {
	  	it('should send a GET request to the correct endpoint', () => {
	      	service.getUsersBooks().subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/publisher/books`);
	       	expect(req.request.method).toEqual('GET');
	       	req.flush({});
		});
	});

	describe('#updateBook', () => {
	  	it('should send a PUT request to the correct endpoint', () => {
	  		const book = { id : 1};
	      	service.updateBook(book).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/book/${book.id}`);
	       	expect(req.request.method).toEqual('PUT');
	       	req.flush({});
		});
	});

	describe('#deleteBook', () => {
	  	it('should send a DELETE request to the correct endpoint', () => {
	  		const  id = '1';
	      	service.deleteBook(id).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/book/${id}`);
	       	expect(req.request.method).toEqual('DELETE');
	       	req.flush({});
		});
	});
});
