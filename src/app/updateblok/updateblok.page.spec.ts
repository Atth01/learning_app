import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateblokPage } from './updateblok.page';

describe('UpdateblokPage', () => {
  let component: UpdateblokPage;
  let fixture: ComponentFixture<UpdateblokPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateblokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
