import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributorsComponent } from './top-contributors.component';

describe('TopContributorsComponent', () => {
  let component: TopContributorsComponent;
  let fixture: ComponentFixture<TopContributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopContributorsComponent]
    });
    fixture = TestBed.createComponent(TopContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
