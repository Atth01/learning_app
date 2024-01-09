import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatepengeluaranPage } from './updatepengeluaran.page';

describe('UpdatepengeluaranPage', () => {
  let component: UpdatepengeluaranPage;
  let fixture: ComponentFixture<UpdatepengeluaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatepengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
