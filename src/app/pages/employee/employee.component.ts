import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import {
  IApiResponse,
  IChildDepartment,
  IParentDepartment,
} from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})

export class EmployeeComponent implements OnInit {
  isFormVisible = signal<boolean>(false);
  masterSrv = inject(MasterService);
  parentDepartmentList = signal<IParentDepartment[]>([]);
  childDepartmentList = signal<IChildDepartment[]>([]);
  employeeList = signal<Employee[]>([]);
  parentDepartmentId: number = 0;
  employeeObject: Employee = new Employee();
  ngOnInit(): void {
    this.getParentDepartment();
    this.getEmployees();
  }

  getParentDepartment() {
    this.masterSrv.getAllDepartments().subscribe((result: IApiResponse) => {
      this.parentDepartmentList.set(result.data);
    });
  }

  getEmployees() {
    this.masterSrv.getAllEmployee().subscribe((res: Employee[]) => {
      this.employeeList.set(res);
    });
  }

  onParentDepartmentChange() {
    this.masterSrv
      .getChlidDepartmentsById(this.parentDepartmentId)
      .subscribe((res: IApiResponse) => {
        this.childDepartmentList.set(res.data);
      });
  }

  onSave() {
    this.masterSrv.saveEmployee(this.employeeObject).subscribe(
      (res: IApiResponse) => {
        alert('Employee Added successfully');
        this.getEmployees();
      },
      (error) => {
        alert('Failed to add employee');
      }
    );
  }

  onEdit(employee: Employee) {
    this.employeeObject = employee;
    this.isFormVisible.set(true);
  }

  onUpdate() {
    this.masterSrv.updateEmployee(this.employeeObject).subscribe(
      (res: IApiResponse) => {
        alert('Employee updated successfully');
        this.getEmployees();
      },
      (error) => {
        alert('Failed to update employee');
      }
    );
  }

  onDelete(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee')) {
      this.masterSrv.deleteEmployee(employeeId).subscribe(
        (res: IApiResponse) => {
          alert('Employee deleted successfully');
          this.getEmployees();
        },
        (error) => {
          alert('Failed to delete employee');
        }
      );
    }
  }
}
