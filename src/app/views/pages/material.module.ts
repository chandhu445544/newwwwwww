import {NgModule} from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatCheckboxModule,  
  MatTreeModule,
  MatPaginatorModule,

} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule,
    CdkTreeModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule,
    CdkTreeModule,

    
  ],
  declarations: [	
    	
  ]
})
export class MaterialModule {}
