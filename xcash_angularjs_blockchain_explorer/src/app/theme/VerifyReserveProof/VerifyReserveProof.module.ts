import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyReserveProofComponent } from './VerifyReserveProof.component';
import {VerifyReserveProofRoutingModule} from './VerifyReserveProof-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyReserveProofRoutingModule,
    SharedModule
  ],
  declarations: [VerifyReserveProofComponent]
})
export class VerifyReserveProofModule { }
