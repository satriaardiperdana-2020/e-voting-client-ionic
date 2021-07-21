import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaftarPemilihPage } from './daftar-pemilih.page';

describe('DaftarPemilihPage', () => {
  let component: DaftarPemilihPage;
  let fixture: ComponentFixture<DaftarPemilihPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPemilihPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarPemilihPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
