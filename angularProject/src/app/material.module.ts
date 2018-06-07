import { NgModule } from "@angular/core";
import {MatButtonModule,MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule,MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule} from "@angular/material"
@NgModule({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    MatNativeDateModule,
MatCheckboxModule,
MatSidenavModule,
MatToolbarModule,
MatListModule,
MatTabsModule,
MatCardModule,
MatSelectModule,
MatDialogModule,
MatProgressSpinnerModule],
    exports:[
        MatButtonModule,
        MatNativeDateModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckboxModule,
    MatSidenavModule,
MatToolbarModule,
MatListModule,
MatTabsModule,
MatCardModule,
MatSelectModule,
MatProgressSpinnerModule,
MatDialogModule]
})
export class MaterialModule{}