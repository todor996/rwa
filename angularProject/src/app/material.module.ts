import { NgModule } from "@angular/core";
import {MatButtonModule,MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule,MatListModule} from "@angular/material"
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
MatListModule],
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
MatListModule]
})
export class MaterialModule{}