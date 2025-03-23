import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudokuSolverComponent } from './sudoku-solver/sudoku-solver.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "sudoku-solver" },

  { path: "sudoku-solver", component: SudokuSolverComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
