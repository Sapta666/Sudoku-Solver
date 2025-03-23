import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-sudoku-output-matrix-control",
    templateUrl: "./sudoku-output-matrix-control.component.html"
})
export class SudokuOutputMatrixControlComponent implements OnInit {

    //#region Variables

    public matSize: number = 9;

    //#endregion

    //#region Properties

    @Input() pOutputMatrix: number[][] = [[]];

    //#endregion

    //#region Page Load

    constructor() {

    }

    ngOnInit(): void {
        this.initArray();
    }

    //#endregion

    //#region Private Function

    private initArray(): void {
        for (let m = 0; m < this.matSize; m++) {
            this.pOutputMatrix[m] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }

    //function to check whether the input data 
    //is valid as per the rules of sudoku
    private isRuleMaintained(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {

                //checking for duplicate values in the same column
                for (let row_2 = 0; row_2 < 9; row_2++) {
                    if (row != row_2 && this.pOutputMatrix[row_2][col] != 0) {
                        if (this.pOutputMatrix[row][col] == this.pOutputMatrix[row_2][col]) {
                            return false;
                        }
                    }
                }

                //checking for duplicate values in the same row
                for (let col_2 = 0; col_2 < 9; col_2++) {
                    if (col != col_2 && this.pOutputMatrix[row][col_2] != 0) {
                        if (this.pOutputMatrix[row][col] == this.pOutputMatrix[row][col_2]) {
                            return false;
                        }
                    }
                }
            }
        }

        // logic to see if numbers repeat in a 
        // grid
        for(let sec1 = 0; sec1<3; sec1++) {
            for(let grid = 0; grid < 3; grid++) {

                let tempArr: Array<number> = [];

                for(let row = sec1*3; row<(sec1+1)*3;row++) {
                    for(let col = grid*3; col<(grid+1)*3; col++) {
                        if(this.pOutputMatrix[row][col] != 0) {                        
                            tempArr.push(this.pOutputMatrix[row][col]);
                        }
                    }
                }

                for( let m = 0; m<tempArr.length; m++) {
                    let counter: number = 1;
                    for(let n = m+1; n < tempArr.length; n++) {
                        if(tempArr[m] == tempArr[n]) {
                            counter++;
                        }
                        if(counter >=2) {                            
                            return false;
                        }
                    }
                }

            }
        }

        return true;
    }

    private isMatrixComplete(matrix: number[][]): boolean {

        for(let m = 0; m < this.matSize; m++) {
            for(let n = 0; n < this.matSize; n++) {
                if(matrix[m][n] == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    private computeSudoku(matrix: number[][], row: number, col: number): number[][] {

        if(row == this.matSize)
            return matrix;

        // to check if value is already present 
        // or not 
        if(matrix[row][col] != 0) {
            let m = row;
            let n = col+1;
            if (n == this.matSize) {
                n = 0;
                m++;
            }        
            return this.computeSudoku(matrix,m,n);
        }
        
        for (let i = 1; i <= this.matSize; i++) {
            matrix[row][col] = i;

            if (row == this.matSize - 1 && col == this.matSize - 1 && this.isRuleMaintained()) {
                return matrix;
            } else if (this.isRuleMaintained()) {
                let m = row;
                let n = col+1;
                if (n == this.matSize) {
                    n = 0;
                    m++;
                }        
                if(this.isMatrixComplete(this.computeSudoku(matrix,m,n))) {
                    return matrix;
                } 
            }
        }
        matrix[row][col] = 0;        
        return matrix;
    }

    private displaySudoku(): void {
        for (let row = 0; row < this.matSize; row++) {
            for (let col = 0; col < this.matSize; col++) {
                //  logic for conversion of array postion 
                //  to grid position
                let i = Math.floor(row / 3) * 3 + Math.floor(col / 3);
                let j = col % 3 + (row % 3) * 3;
                let value: string = this.pOutputMatrix[i][j].toString();
                (document.getElementById('output:' + row + ',' + col) as HTMLInputElement).value = value == '0' ? '' : value;
            }
        }
    }


    //#endregion

    //#region Public Functions

    public calculateSudokuMatrix(): void {

        this.pOutputMatrix = this.computeSudoku(this.pOutputMatrix, 0, 0);

        this.displaySudoku();
    }

    //#endregion

    //#region Component Functions

    //#endregion

}