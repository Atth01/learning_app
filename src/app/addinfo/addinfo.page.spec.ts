import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddinfoPage } from './addinfo.page';

describe('AddinfoPage', () => {
  let component: AddinfoPage;
  let fixture: ComponentFixture<AddinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
