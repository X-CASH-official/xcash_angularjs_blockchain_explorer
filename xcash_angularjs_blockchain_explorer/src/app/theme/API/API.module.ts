import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIComponent } from './API.component';
import {APIRoutingModule} from './API-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    APIRoutingModule,
    SharedModule
  ],
  declarations: [APIComponent]
})
export class APIModule { }
