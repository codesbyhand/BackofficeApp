import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCustom } from './table-custom';

describe('TableCustom', () => {
  let component: TableCustom;
  let fixture: ComponentFixture<TableCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
