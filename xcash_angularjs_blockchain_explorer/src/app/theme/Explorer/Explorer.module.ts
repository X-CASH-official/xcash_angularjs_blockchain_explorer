import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './Explorer.component';
import {ExplorerRoutingModule} from './Explorer-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    SharedModule
  ],
  declarations: [ExplorerComponent]
})
export class ExplorerModule { }
