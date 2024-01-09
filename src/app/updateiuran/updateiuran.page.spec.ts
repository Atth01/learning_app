import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateiuranPage } from './updateiuran.page';

describe('UpdateiuranPage', () => {
  let component: UpdateiuranPage;
  let fixture: ComponentFixture<UpdateiuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateiuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
