import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendudukPage } from './penduduk.page';

describe('PendudukPage', () => {
  let component: PendudukPage;
  let fixture: ComponentFixture<PendudukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PendudukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
