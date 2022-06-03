import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthModule } from "./auth/auth.module";
import { RecipesModule } from "./recipes/recipes.module";
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

@NgModule({
    imports: [
        RecipesModule,
        ShoppingListModule,
        AuthModule,
        SharedModule
    ],
    exports: [
        RecipesModule,
        ShoppingListModule,
        AuthModule,
        SharedModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
})
export class CoreModule {}