import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlokPage } from './blok.page';

describe('BlokPage', () => {
  let component: BlokPage;
  let fixture: ComponentFixture<BlokPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BlokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
