import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoFormComponent } from './insumo-form.component';

describe('InsumoFormComponent', () => {
  let component: InsumoFormComponent;
  let fixture: ComponentFixture<InsumoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsumoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
