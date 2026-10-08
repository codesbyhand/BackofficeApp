import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCustom } from './select-custom';

describe('SelectCustom', () => {
  let component: SelectCustom;
  let fixture: ComponentFixture<SelectCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
