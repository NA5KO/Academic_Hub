import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCommunitiesComponent } from './top-communities.component';

describe('TopCommunitiesComponent', () => {
  let component: TopCommunitiesComponent;
  let fixture: ComponentFixture<TopCommunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopCommunitiesComponent]
    });
    fixture = TestBed.createComponent(TopCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
