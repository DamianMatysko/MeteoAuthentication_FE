import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTokenComponent } from './show-token.component';

describe('ShowTokenComponent', () => {
  let component: ShowTokenComponent;
  let fixture: ComponentFixture<ShowTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
