import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecodeTXComponent } from './DecodeTX.component';
import {DecodeTXRoutingModule} from './DecodeTX-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DecodeTXRoutingModule,
    SharedModule
  ],
  declarations: [DecodeTXComponent]
})
export class DecodeTXModule { }
