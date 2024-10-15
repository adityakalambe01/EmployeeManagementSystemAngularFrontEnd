import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IApiResponse, IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  projectList = signal<IProject[]>([]);

  masterService = inject(MasterService);

  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.masterService.getAllProjects().subscribe((projects: IProject[]) => {
      this.projectList.set(projects);
    });
  }

  onEdit(projectId: number) {
    this.router.navigate(['new-project', projectId]);
  }

  onDelete(projectId: number) {
    if(confirm('Are you sure you want to delete this project')) {
      this.masterService.deleteProjectById(projectId).subscribe(
        (res: IApiResponse)=>{
          // alert('Project deleted successfully');
          this.getAllProjects();
        },error=>{
          alert('Failed to delete project');
        }
      )
    }
  }
}
