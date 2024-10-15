import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { IApiResponse, IProject } from '../../model/interface/master';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  projectForm: FormGroup = new FormGroup({});

  empList$: Observable<Employee[]> = new Observable<[]>();

  masterService = inject(MasterService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  constructor() {
    this.empList$ = this.masterService.getAllEmployee();
    this.initializeForm();
    this.activatedRoute.params.subscribe((parameters: any) => {
      if (parameters.id != 0) {
        this.getProjectById(parameters.id);
      }
    });
  }

  initializeForm(data?: IProject) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(data ? data.projectId : 0),
      projectName: new FormControl(data ? data.projectName : ''),
      clientName: new FormControl(data ? data.clientName : ''),
      startDate: new FormControl(data ? data.startDate : ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId : 0),
      contactPerson: new FormControl(data ? data.contactPerson : ''),
      contactNo: new FormControl(data ? data.contactNo : ''),
      emailId: new FormControl(data ? data.emailId : ''),
    });
  }

  getProjectById(id: any) {
    this.masterService.getProjectById(id).subscribe((res: IProject) => {
      this.initializeForm(res);
      // this.projectForm.patchValue(res);
    });
  }

  onSaveProjet() {
    this.masterService.saveProject(this.projectForm.value).subscribe(
      (res: IProject) => {
        alert('Project Added successfully');
        this.projectForm.reset();
      },
      (error) => {
        alert('Failed to add project');
      }
    );
  }

  onUpdateProject() {
    this.masterService.updateProject(this.projectForm.value).subscribe(
      (res: IProject) => {
        alert('Project updated successfully');
        this.router.navigateByUrl('/project');
      },
      (error) => {
        alert('Failed to update project');
      }
    );
  }
}
