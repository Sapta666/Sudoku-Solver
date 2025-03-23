import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-sudoku-input-matrix-control",
    templateUrl: "./sudoku-input-matrix-control.component.html"
})
export class SudokuInputMatrixControlComponent implements OnInit {

    //#region Variables

    public matSize: number = 9;
    public isMatInit: boolean = false;

    public currCol: number = -1;
    public currRow: number = 1;

    public inputMatrix: number[][] = [[]];

    //#endregion

    //#region Properties

    @Output() onMatrixValidationSuccess = new EventEmitter();

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
            this.inputMatrix[m] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.isMatInit = true;
    }

    private onInvalidInput(evt: Event, m: number, n: number): void {
        alert("Invalid Input");
        this.inputMatrix[m][n] = 0;
        (evt.target as HTMLInputElement).value = '';
    }

    //function to check whether the input data 
    //comprises of valid numbers
    private isInputDataValid(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (Number.isNaN(this.inputMatrix[row][col])) {
                    alert("Input Matrix is Invalid!");
                    return false;
                }
            }
        }
        return true;
    }

    //function to check whether the input data 
    //is valid as per the rules of sudoku
    private isRuleMaintained(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {

                //checking for duplicate values in the same column
                for (let row_2 = 0; row_2 < 9; row_2++) {                    
                    if (row != row_2 && this.inputMatrix[row_2][col]!= 0) {
                        if (this.inputMatrix[row][col] == this.inputMatrix[row_2][col]) {
                            alert("Column with duplicate data found!!"+" Sudoku Matrix Input Is Invalid!!");
                            return false;
                        }
                    }
                }

                //checking for duplicate values in the same row
                for (let col_2 = 0; col_2 < 9; col_2++) {
                    if (col != col_2 && this.inputMatrix[row][col_2]!= 0) {
                        if (this.inputMatrix[row][col] == this.inputMatrix[row][col_2]) {
                            alert("Row with duplicate data found!!"+" Sudoku Matrix Input Is Invalid!!");
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
                        if(this.inputMatrix[row][col] != 0) {
                            tempArr.push(this.inputMatrix[row][col]);
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
                            alert('Number is repeated in grid '+(grid+1)+' of section '+(sec1+1));
                            return false;
                        }
                    }
                }

            }
        }

        return true;
    }

    //#endregion

    //#region Public Functions 

    public clearMatrix(): void {
        for (let m = 0; m < 9; m++) {
            for (let n = 0; n < 9; n++) {
                this.inputMatrix[m][n] = 0;
            }
        }
        let inputEles: any = document.getElementsByTagName("input");
        for (let element of inputEles) {
            element.value = "";
        }
    }

    public checkMatrixValidity(): void {
        if (this.isInputDataValid()) {
            if (this.isRuleMaintained()) {
                this.onMatrixValidationSuccess.emit(this.inputMatrix);
            }
        }
    }

    //#endregion

    //#region Component Functions

    public onMatrixInput(evt: Event, row: number, col: number): void {

        // logic for conversion of grid position
        // to array position
        let m = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        let n = (row % 3) * 3 + col % 3;

        let value: number = 0;
        try {
            value = parseInt((evt.target as HTMLInputElement).value);
        } catch (e) {
            this.onInvalidInput(evt, m, n);
        }

        this.inputMatrix[m][n] = value;

        if (value <= 0 || value >= 10) {
            this.onInvalidInput(evt, m, n);
        }

        //console.log(row+","+col,"====",(evt.target as HTMLInputElement).id);

        // console.log(row+","+col,"===",i+","+j);
    }

    //#endregion

}