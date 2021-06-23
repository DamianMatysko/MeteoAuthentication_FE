import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStationComponent } from './register-station.component';

describe('RegisterStationComponent', () => {
  let component: RegisterStationComponent;
  let fixture: ComponentFixture<RegisterStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
