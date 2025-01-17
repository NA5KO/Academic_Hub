import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCommunitiesComponent } from './related-communities.component';

describe('RelatedCommunitiesComponent', () => {
  let component: RelatedCommunitiesComponent;
  let fixture: ComponentFixture<RelatedCommunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedCommunitiesComponent]
    });
    fixture = TestBed.createComponent(RelatedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
