import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeComponentComponent } from './cube-component.component';

describe('CubeComponentComponent', () => {
  let component: CubeComponentComponent;
  let fixture: ComponentFixture<CubeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
