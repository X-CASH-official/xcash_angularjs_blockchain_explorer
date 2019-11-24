import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifySenderComponent } from './VerifySender.component';
import {VerifySenderRoutingModule} from './VerifySender-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VerifySenderRoutingModule,
    SharedModule
  ],
  declarations: [VerifySenderComponent]
})
export class VerifySenderModule { }
