import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddsuratPage } from './addsurat.page';

describe('AddsuratPage', () => {
  let component: AddsuratPage;
  let fixture: ComponentFixture<AddsuratPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddsuratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
