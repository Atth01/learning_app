import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatepesanPage } from './updatepesan.page';

describe('UpdatepesanPage', () => {
  let component: UpdatepesanPage;
  let fixture: ComponentFixture<UpdatepesanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatepesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
