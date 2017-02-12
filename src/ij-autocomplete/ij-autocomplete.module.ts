import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';

import { IjAutocompleteComponent } from './ij-autocomplete.component';

@NgModule({
  declarations: [
    IjAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports : [
    IjAutocompleteComponent
  ]
})
export class IjAutocompleteModule {

}
