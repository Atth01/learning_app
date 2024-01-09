import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpengeluaranPage } from './addpengeluaran.page';

describe('AddpengeluaranPage', () => {
  let component: AddpengeluaranPage;
  let fixture: ComponentFixture<AddpengeluaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddpengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
