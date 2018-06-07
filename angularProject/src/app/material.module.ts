import { NgModule } from "@angular/core";
import {MatButtonModule,MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule,MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule} from "@angular/material"
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
MatProgressSpinnerModule]
})
export class MaterialModule{}