import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendHexadecimalTXComponent } from './SendHexadecimalTX.component';
import {SendHexadecimalTXRoutingModule} from './SendHexadecimalTX-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SendHexadecimalTXRoutingModule,
    SharedModule
  ],
  declarations: [SendHexadecimalTXComponent]
})
export class SendHexadecimalTXModule { }
