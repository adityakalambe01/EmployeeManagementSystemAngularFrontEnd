export interface IApiResponse {
  message: string;
  result: boolean;
  data: any;
}

export interface IParentDepartment {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

export interface IChildDepartment {
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IProjectEmployee {
  empProjectId: number;
  projectId: number;
  empId: number;
  assignedDate: string;
  role: string;
  isActive: string;
}

export interface IProject {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: string;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: string;
  emailId: string;
}
