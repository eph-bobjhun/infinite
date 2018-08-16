import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AdminGuard } from "../auth/_guards/auth.guard";
const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
            },
            {
                "path": "codes",
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/codes\/codes.module#CodesModule"
                    }
                ]
            },
            {
                "path": "genealogy",
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/genealogy\/genealogy.module#GenealogyModule"
                    }
                ]
            },
            {
                "path": "directref",
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/directref\/directref.module#DirectRefModule"
                    }
                ]
            },
            {
                "path": "my-account",
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/my-account\/my-account.module#MyAccountModule"
                    }
                ]
            },
            {
                "path": "withdrawals",
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/withdrawals\/withdrawal.module#WithdrawalModule"
                    }
                ]
            },
            {
                "path": "adminwithdrawals",
                "canActivate": [AdminGuard],
                "children": [
                    {
                        "path": "",
                        "loadChildren": ".\/pages\/default\/adminwithdrawals\/adminwithdrawal.module#AdminWithdrawalModule"
                    }
                ]
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }