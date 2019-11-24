import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesListComponent } from './NodesList.component';
import {NodesListRoutingModule} from './NodesList-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NodesListRoutingModule,
    SharedModule
  ],
  declarations: [NodesListComponent]
})
export class NodesListModule { }
