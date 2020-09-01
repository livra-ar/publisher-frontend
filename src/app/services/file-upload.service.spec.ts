import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { ConfigService } from '../services/config.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;
  let root_url = 'http://localhost:3000';

 beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService, ConfigService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FileUploadService);
    configService = TestBed.inject(ConfigService);
    root_url = configService.serverUrl;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('#uploadFiles', () => {
	    it('should send a POST request to /raw if the type is file', () => {
	      	service.uploadFiles(new FormData(), 'files').subscribe();
	       	const req = httpTestingController.expectOne(`${root_url}/upload/raw/file`);
	       	expect(req.request.method).toEqual('POST');
	       	req.flush({});
	   	});

	    it('should send a POST request to /img if the type is image', () => {
	      	service.uploadFiles(new FormData(), 'images').subscribe();
			const req = httpTestingController.expectOne(`${root_url}/upload/img/file`);
			expect(req.request.method).toEqual('POST');
			req.flush({});
	    });
	});	

  describe('#deleteFiles', () => {
	    it('should send a delete request with the correct ids', () => {
	    	let cloudinary = configService.cloudinaryId;
	      	service.deleteFiles([
	      		`https://res.cloudinary.com/${cloudinary}/image/upload/v1587452919/r3ejhfm42gt3jp6i37et.jpg`,
	      		`https://res.cloudinary.com/${cloudinary}/image/upload/v1587452919/r2ejhfm42gt3jp6i37et.sfb`
      		]);
	       	const reqJpeg = httpTestingController.expectOne(`${root_url}/files/delete/r3ejhfm42gt3jp6i37et/`);
	       	expect(reqJpeg.request.method).toEqual('DELETE');

	       	const reqSfb = httpTestingController.expectOne(`${root_url}/files/delete/r2ejhfm42gt3jp6i37et/`);
	       	expect(reqSfb.request.method).toEqual('DELETE');
	       	reqJpeg.flush({});
	       	reqSfb.flush({});
	   	});
	});	


});
