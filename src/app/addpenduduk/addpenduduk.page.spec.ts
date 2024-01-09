import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpendudukPage } from './addpenduduk.page';

describe('AddpendudukPage', () => {
  let component: AddpendudukPage;
  let fixture: ComponentFixture<AddpendudukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddpendudukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
