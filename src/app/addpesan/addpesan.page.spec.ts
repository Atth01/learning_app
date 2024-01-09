import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpesanPage } from './addpesan.page';

describe('AddpesanPage', () => {
  let component: AddpesanPage;
  let fixture: ComponentFixture<AddpesanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddpesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
