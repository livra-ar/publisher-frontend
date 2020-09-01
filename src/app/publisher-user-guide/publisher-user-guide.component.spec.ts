import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherUserGuideComponent } from './publisher-user-guide.component';

describe('PublisherUserGuideComponent', () => {
  let component: PublisherUserGuideComponent;
  let fixture: ComponentFixture<PublisherUserGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherUserGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherUserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
