import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdduangkeluarPage } from './adduangkeluar.page';

describe('AdduangkeluarPage', () => {
  let component: AdduangkeluarPage;
  let fixture: ComponentFixture<AdduangkeluarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdduangkeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
