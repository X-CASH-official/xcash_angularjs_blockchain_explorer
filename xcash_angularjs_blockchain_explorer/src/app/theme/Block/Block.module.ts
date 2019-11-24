import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './Block.component';
import {BlockRoutingModule} from './Block-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BlockRoutingModule,
    SharedModule
  ],
  declarations: [BlockComponent]
})
export class BlockModule { }
