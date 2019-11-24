import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './Statistics.component';
import {StatisticsRoutingModule} from './Statistics-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule { }
