import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-token',
  templateUrl: './show-token.component.html',
  styleUrls: ['./show-token.component.css']
})
export class ShowTokenComponent implements OnInit {
  token: string;

  constructor(public dialogBox: MatDialogRef<ShowTokenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.token = this.data.token;
  }

  onClose(): void {
    this.dialogBox.close();
  }

}
