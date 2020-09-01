import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserGuideComponent } from './mobile-user-guide.component';

describe('MobileUserGuideComponent', () => {
  let component: MobileUserGuideComponent;
  let fixture: ComponentFixture<MobileUserGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileUserGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
