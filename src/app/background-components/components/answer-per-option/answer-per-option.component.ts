import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { dbConnectionService } from '../../services/callDbConnection';

@Component({
  selector: 'app-answer-per-option',
  templateUrl: './answer-per-option.component.html',
  styleUrls: ['./answer-per-option.component.css']
})
export class AnswerPerOptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private dbConnection: dbConnectionService) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
