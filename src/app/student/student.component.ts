import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}
  getParamsid: any;

  ngOnInit(): void {
    console.log(this.router.snapshot.paramMap.get('id'), 'getid');
    this.getParamsid = this.router.snapshot.paramMap.get('id');
    if (this.getParamsid) {
      this.service.getSingleData(this.getParamsid).subscribe((res) => {
        console.log('res==>', res);
        this.userform.patchValue({
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        });
      });
    }
  }

  errorMsg: any;
  userform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  userSubmit() {
    if (this.userform.valid) {
      console.log(this.userform.value);
      this.service.createData(this.userform.value).subscribe((res) => {
        console.log('response==>', res);
        this.userform.reset();
      });
    } else {
      this.errorMsg = 'All Fields are Required!';
    }
  }

  userUpdate() {
    if (this.userform.valid) {
      console.log(this.userform.value);
      this.service
        .updateData(this.userform.value, this.getParamsid)
        .subscribe((res) => {
          console.log('response==>', res);
          this.userform.reset();
        });
    }
  }
}
