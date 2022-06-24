import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FishermanPage } from './fisherman.page';

describe('FishermanPage', () => {
  let component: FishermanPage;
  let fixture: ComponentFixture<FishermanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishermanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FishermanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
