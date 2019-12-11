import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonerComponent } from './cloner.component';

describe('ClonerComponent', () => {
	let component: ClonerComponent;
	let fixture: ComponentFixture<ClonerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ClonerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ClonerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
