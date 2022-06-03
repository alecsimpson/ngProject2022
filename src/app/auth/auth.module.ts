import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule {

}