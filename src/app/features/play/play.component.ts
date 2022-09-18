import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  public readonly axis_x = ['x1','x2','x3'];
  public readonly axis_y = ['y1','y2','y3'];
  public board:any = {};
  private readonly emptyBoard:any = {
    x1: {y1:"",y2:"", y3:""},
    x2: {y1:"",y2:"", y3:""},
    x3: {y1:"",y2:"", y3:""},
  }
  private readonly winningTable = [
    ['x1-y1','x2-y1','x3-y1'],
    ['x1-y2','x2-y2','x3-y2'],
    ['x1-y3','x2-y3','x3-y3'],
    ['x1-y1','x1-y2','x1-y3'],
    ['x2-y1','x2-y2','x2-y3'],
    ['x3-y1','x3-y2','x3-y3'],
    ['x1-y1','x2-y2','x3-y3'],
    ['x1-y3','x2-y2','x3-y1'],
  ];

  public currentPlayer:string = 'X';
  private boardPlayerX:string[] = [];
  private boardPlayerO:string[] = [];

  public winnerX = 0;
  public winnerO = 0;
  public tie = 0;
  private moves = 0;

  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  public changePlayer():void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  public selectPosition(x:string,y:string):void {
    this.moves++;
    this.board[x][y] = this.currentPlayer;

    if(this.currentPlayer === 'X'){
      this.boardPlayerX.push(x+'-'+y);      
    }
    else if(this.currentPlayer === 'O'){
      this.boardPlayerO.push(x+'-'+y);      
    }
  
    if(this.moves>=5 && this.checkWiner()){
      this.currentPlayer === 'X' ? this.winnerX++ : this.winnerO++;
      this.reset()
    }
    else {
      if(this.moves===9){
        this.tie++
      this.reset();
      }
    }
    this.changePlayer();
  }

  public reset():void {
    this.board = JSON.parse(JSON.stringify(this.emptyBoard));
    this.boardPlayerX = [];
    this.boardPlayerO = []; 
    this.moves = 0;  
  }

  private checkWiner():boolean {
    this.boardPlayerX.sort();
    this.boardPlayerO.sort();
    let check:boolean = false;

    for (let index = 0; index < this.winningTable.length; index++) {
      if(this.currentPlayer === 'X'){
        check = this.winningTable[index].toString().includes(this.boardPlayerX.toString());
        if(check){
          break 
        }
    }
    else if(this.currentPlayer === 'O'){
      check = this.winningTable[index].toString().includes(this.boardPlayerO.toString());
      if(check){
        break 
      }
  }
  }
    return check;
  }  
}
