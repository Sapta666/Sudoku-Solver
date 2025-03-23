import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SudokuSolverComponent } from './sudoku-solver/sudoku-solver.component';
import { SudokuOutputMatrixControlComponent } from './sudoku-output-matrix/sudoku-output-matrix-control.component';
import { SudokuInputMatrixControlComponent } from './sudoku-input-matrix/sudoku-input-matrix-control.component';

@NgModule({
  declarations: [
    AppComponent,

    SudokuSolverComponent,
    SudokuOutputMatrixControlComponent,
    SudokuInputMatrixControlComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
