import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './Price.component';
import {PriceRoutingModule} from './Price-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PriceRoutingModule,
    SharedModule
  ],
  declarations: [PriceComponent]
})
export class PriceModule { }
