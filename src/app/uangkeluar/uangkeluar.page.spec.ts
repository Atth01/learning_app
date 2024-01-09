import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UangkeluarPage } from './uangkeluar.page';

describe('UangkeluarPage', () => {
  let component: UangkeluarPage;
  let fixture: ComponentFixture<UangkeluarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UangkeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
