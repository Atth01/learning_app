import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateinfoPage } from './updateinfo.page';

describe('UpdateinfoPage', () => {
  let component: UpdateinfoPage;
  let fixture: ComponentFixture<UpdateinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
