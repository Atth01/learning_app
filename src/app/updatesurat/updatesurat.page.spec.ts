import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatesuratPage } from './updatesurat.page';

describe('UpdatesuratPage', () => {
  let component: UpdatesuratPage;
  let fixture: ComponentFixture<UpdatesuratPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatesuratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
