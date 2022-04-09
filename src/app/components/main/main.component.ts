import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPerson } from 'src/app/shared/interfaces/person/person.interface';
import { MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public arr: Array<IPerson> = [];
  public version = 0;
  public array: Array<any> = [];
  public emails!: string;
  public name = '';
  public duration = '';
  public angular = [
    { frameworksVersion: '1.1.1' },
    { frameworksVersion: '1.2.1' },
    { frameworksVersion: '1.3.4' },
  ]
  public react = [
    { frameworksVersion: '2.1.2' },
    { frameworksVersion: '3.2.4' },
    { frameworksVersion: '4.3.1' },
  ]
  public vue = [
    { frameworksVersion: '3.3.1' },
    { frameworksVersion: '5.2.1' },
    { frameworksVersion: '5.1.3' },
  ]
  public frameworks = [
    { framework: 'Angular' },
    { framework: 'React' },
    { framework: 'Vue.js' },
  ]

  public personForm!: FormGroup;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initPersonForm();
    this.loadPersons();
  }

  loadPersons(): void {
    this.mainService.getAll().subscribe((data) => {
      this.arr = data as IPerson[];
      data.forEach(doc => {
        this.emails = doc.email;
      })
    })
  }

  initPersonForm(): void {
    this.personForm = this.fb.group({
      id: [],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      framework: [null, Validators.required],
      frameworkVersion: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      hobby: [this.array]
    })
  }

  loadHobby(): void {
    let obj = {
      name: this.name,
      duration: this.duration
    }
    if (this.name === "" || this.duration === "") {
      this.toastr.error('Введіть хобі')
    } else {
      this.array.push(obj);
      this.toastr.success('Хобі добалено')
    }
    this.name = '';
    this.duration = '';
  }

  addperson(): void {
    if (this.array.length === 0) {
      this.toastr.error('Введіть хобі')
    } else {
      if (this.personForm.get('email')?.value === this.emails) {
        this.toastr.error('Даний емейл є зайнятий')
      } else {
        this.mainService.create(this.personForm.value).subscribe((data) => {
          this.initPersonForm();
          this.toastr.success('Користувач добалений')
        })
      }
    }
    this.version = 0;
    this.array = [];
  }

  changeProp(a: any): void {
    if (a.target.innerHTML === ' Angular ') {
      this.version = 1;
    } else if (a.target.innerHTML === ' React ') {
      this.version = 2;
    } else if (a.target.innerHTML === ' Vue.js ') {
      this.version = 3;
    }
  }
}
