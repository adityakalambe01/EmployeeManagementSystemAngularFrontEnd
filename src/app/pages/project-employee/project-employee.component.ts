import { Component, inject, OnInit, signal } from '@angular/core';
import { IApiResponse, IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [JsonPipe, DatePipe, ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css',
})
export class ProjectEmployeeComponent implements OnInit {
  projectEmployeesList = signal<IProjectEmployee[]>([]);

  projectList$: Observable<IProject[]> = new Observable<IProject[]>();
  employeeList$: Observable<Employee[]> = new Observable<Employee[]>();

  masterService = inject(MasterService);
  form: FormGroup = new FormGroup({});

  constructor() {
    this.initilizeForm();
    this.employeeList$ = this.masterService.getAllEmployee();
    this.projectList$ = this.masterService.getAllProjects();
  }

  initilizeForm(data?: IProjectEmployee) {
    this.form = new FormGroup({
      empProjectId: new FormControl(data ? data.empProjectId : 0),
      projectId: new FormControl(data ? data.projectId : 0),
      empId: new FormControl(data ? data.empId : 0),
      assignedDate: new FormControl(data ? data.assignedDate : ''),
      role: new FormControl(data ? data.role : ''),
      isActive: new FormControl(data ? data.isActive : false),
    });
  }

  ngOnInit(): void {
    this.getAllProjectEmployees();
  }

  getAllProjectEmployees() {
    this.masterService
      .getAllProjectEmployee()
      .subscribe((data: IProjectEmployee[]) => {
        this.projectEmployeesList.set(data);
      });
  }

  onSaveProjectEmployee() {
    this.masterService.saveProjectEmployee(this.form.value).subscribe(
      (data: IApiResponse) => {
        alert("Project assigned successfully!");
        this.getAllProjectEmployees();
        this.initilizeForm();
      }, error =>{
        alert("Failed to assign project!");
      }
    );
  }

  onDeleteProjectEmployee(empProjectId: number) {}

  onUpdateProjectEmployee() {}
}
