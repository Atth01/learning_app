import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuratkeluarPage } from './suratkeluar.page';

describe('SuratkeluarPage', () => {
  let component: SuratkeluarPage;
  let fixture: ComponentFixture<SuratkeluarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuratkeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
