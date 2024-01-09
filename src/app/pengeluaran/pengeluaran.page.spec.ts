import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengeluaranPage } from './pengeluaran.page';

describe('PengeluaranPage', () => {
  let component: PengeluaranPage;
  let fixture: ComponentFixture<PengeluaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
