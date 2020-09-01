import { TestBed } from '@angular/core/testing';

import { ContentService } from './Content.service';
import { ConfigService } from '../services/config.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContentService', () => {
  let service: ContentService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;
  let root_url;
  beforeEach(() => {
    TestBed.configureTestingModule({
    	providers: [ConfigService, ContentService],
      	imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContentService);
    configService = TestBed.inject(ConfigService);
    root_url = configService.serverUrl;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


	describe('#addBook', () => {
	  	it('should send a POST request to the correct endpoint', () => {
	      	service.addContent({}).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/content/`);
	       	expect(req.request.method).toEqual('POST');
	       	req.flush({});
		});
	});

	describe('#getById', () => {
	  	it('should send a GET request to the correct endpoint', () => {
	  		const id = '1';
	      	service.getById(id).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/content/${id}`);
	       	expect(req.request.method).toEqual('GET');
	       	req.flush({});
		});
	});

	describe('#getByBookId', () => {
	  	it('should send a GET request to the correct endpoint', () => {
	  		const id = '1';
	      	service.getByBookId(id).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/content/book/${id}`);
	       	expect(req.request.method).toEqual('GET');
	       	req.flush({});
		});
	});

	describe('#getUsersContent', () => {
	  	it('should send a GET request to the correct endpoint', () => {
	      	service.getUsersContent().subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/creator/content`);
	       	expect(req.request.method).toEqual('GET');
	       	req.flush({});
		});
	});

	describe('#updateContent', () => {
	  	it('should send a PUT request to the correct endpoint', () => {
	  		const content = { id : 1};
	      	service.updateContent(content).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/content/${content.id}`);
	       	expect(req.request.method).toEqual('PUT');
	       	req.flush({});
		});
	});

	describe('#deleteBook', () => {
	  	it('should send a DELETE request to the correct endpoint', () => {
	  		const  id = '1';
	      	service.deleteContent(id).subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/content/${id}`);
	       	expect(req.request.method).toEqual('DELETE');
	       	req.flush({});
		});
	});
});
