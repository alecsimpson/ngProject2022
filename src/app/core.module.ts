import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        SharedModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
})
export class CoreModule {}