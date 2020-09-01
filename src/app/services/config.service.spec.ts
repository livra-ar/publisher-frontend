import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
	let service: ConfigService;

	beforeEach(() => {
	TestBed.configureTestingModule({});
	service = TestBed.inject(ConfigService);
	});

	it('should be created', () => {
	expect(service).toBeTruthy();
	});

	it('should not return an http address when getServerUrl is called.', () => {
	expect(service.serverUrl).toMatch('^https?://.*');
	});

	it('should not return localhost when getServerUrl is called.', () => {
	expect(service.serverUrl).not.toMatch('^https?://localhost/.*');
	});
});
