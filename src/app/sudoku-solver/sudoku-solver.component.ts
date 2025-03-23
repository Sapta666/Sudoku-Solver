import { Component, ViewChild } from "@angular/core";
import { SudokuInputMatrixControlComponent } from "../sudoku-input-matrix/sudoku-input-matrix-control.component";
import { SudokuOutputMatrixControlComponent } from "../sudoku-output-matrix/sudoku-output-matrix-control.component";

@Component({
    selector: "app-sudoku-solver",
    templateUrl: "./sudoku-solver.component.html"
})
export class SudokuSolverComponent {

    //#region Variables

    @ViewChild('sudokuInputMatrixControl') sudokuInputMatrixControl: SudokuInputMatrixControlComponent;
    @ViewChild('sudokuOutputMatrixControl') sudokuOutputMatrixControl: SudokuOutputMatrixControlComponent;

    //#endregion

    //#region Page Load
 
    //#endregion

    //#region Private Functions

    //#endregion

    //#region Component Functions

    public onSolveClick(): void {
        this.sudokuInputMatrixControl.checkMatrixValidity();
    }

    public onClearClick(): void {
        this.sudokuInputMatrixControl.clearMatrix();
    }

    public onMatrixValidationSuccess(inputMatrix: number[][]): void {
        this.sudokuOutputMatrixControl.pOutputMatrix = inputMatrix;
        this.sudokuOutputMatrixControl.calculateSudokuMatrix();
    }   

    //#endregion

}