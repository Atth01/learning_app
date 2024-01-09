import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddblokPage } from './addblok.page';

describe('AddblokPage', () => {
  let component: AddblokPage;
  let fixture: ComponentFixture<AddblokPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddblokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
