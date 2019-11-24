import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TXSearchResultsComponent} from './TXSearchResults.component';

const routes: Routes = [
  {
    path: '',
    component: TXSearchResultsComponent,
    data: {
      
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TXSearchResultsRoutingModule { }
