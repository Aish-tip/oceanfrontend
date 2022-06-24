import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFishermanPage } from './add-fisherman.page';

describe('AddFishermanPage', () => {
  let component: AddFishermanPage;
  let fixture: ComponentFixture<AddFishermanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFishermanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFishermanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
