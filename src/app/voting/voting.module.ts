import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotingPageRoutingModule } from './voting-routing.module';

import { VotingPage } from './voting.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VotingPage]
})
export class VotingPageModule {}
