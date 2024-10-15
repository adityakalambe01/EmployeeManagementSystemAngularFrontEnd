import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IApiResponse,
  IProject,
  IProjectEmployee,
} from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  http = inject(HttpClient);
  API_URL = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor() {}

  getAllDepartments(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.API_URL}GetParentDepartment`);
  }

  getChlidDepartmentsById(departmentId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${this.API_URL}GetChildDepartmentByParentId?deptId=${departmentId}`
    );
  }

  saveEmployee(employee: Employee): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.API_URL}CreateEmployee`,
      employee
    );
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_URL}GetAllEmployees`);
  }

  updateEmployee(employee: Employee) {
    return this.http.put<IApiResponse>(
      `${this.API_URL}UpdateEmployee/${employee.employeeId}`,
      employee
    );
  }
  deleteEmployee(employeeId: number) {
    return this.http.delete<IApiResponse>(
      `${this.API_URL}DeleteEmployee/${employeeId}`
    );
  }

  saveProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(`${this.API_URL}CreateProject`, project);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.API_URL}GetAllProjects`);
  }

  getProjectById(projectId: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.API_URL}GetProject/${projectId}`);
  }

  updateProject(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(
      `${this.API_URL}UpdateProject/${project.projectId}`,
      project
    );
  }

  deleteProjectById(projectId: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(
      `${this.API_URL}DeleteProject/${projectId}`
    );
  }

  getAllProjectEmployee(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(
      `${this.API_URL}GetAllProjectEmployees`
    );
  }

  saveProjectEmployee(
    projectEmployee: IProjectEmployee
  ): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.API_URL}CreateProjectEmployee`,
      projectEmployee
    );
  }

  updateProjectEmployee(projectEmployee: IProjectEmployee): Observable<IProjectEmployee> {
    return this.http.put<IProjectEmployee>(
      `${this.API_URL}UpdateProjectEmployee/${projectEmployee.empProjectId}`,
      projectEmployee
    );
  }
}
