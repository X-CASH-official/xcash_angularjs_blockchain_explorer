import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TXPoolComponent } from './TXPool.component';
import {TXPoolRoutingModule} from './TXPool-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TXPoolRoutingModule,
    SharedModule
  ],
  declarations: [TXPoolComponent]
})
export class TXPoolModule { }
