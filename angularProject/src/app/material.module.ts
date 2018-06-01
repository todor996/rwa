import { NgModule } from "@angular/core";
import {MatButtonModule,MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule} from "@angular/material"
@NgModule({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    MatNativeDateModule,
MatCheckboxModule],
    exports:[
        MatButtonModule,
        MatNativeDateModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckboxModule]
})
export class MaterialModule{}