import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenSearchComponent } from './fullscreen-search.component';

describe('FullscreenSearchComponent', () => {
  let component: FullscreenSearchComponent;
  let fixture: ComponentFixture<FullscreenSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
