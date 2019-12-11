import { TestBed } from '@angular/core/testing';

import { ClonerService } from './cloner.service';

describe('ClonerService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ClonerService = TestBed.get(ClonerService);
		expect(service).toBeTruthy();
	});
});
