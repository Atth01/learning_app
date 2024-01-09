import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddiuranPage } from './addiuran.page';

describe('AddiuranPage', () => {
  let component: AddiuranPage;
  let fixture: ComponentFixture<AddiuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddiuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
