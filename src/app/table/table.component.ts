import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  readdata: any;
  ngOnInit(): void {
    this.getAllData();
  }

  EditID(id: any) {
    console.log('edit id', id);
  }

  deleteID(id: any) {
    console.log('delete id==>', id);
    this.service.deleteData(id).subscribe((res) => {
      console.log('Delete response==>', res);
      this.getAllData();
    });
  }
  getAllData() {
    this.service.getAllData().subscribe((res) => {
      console.log('res==>', res);
      this.readdata = res.data;
    });
  }
}
