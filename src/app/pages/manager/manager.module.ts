import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorisationsComponent } from './autorisations/autorisations.component';
import { CongesComponent } from './conges/conges.component';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  declarations: [
    AutorisationsComponent,
    CongesComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
