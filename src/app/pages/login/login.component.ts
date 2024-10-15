import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);

  userObject: any = {
    username: 'admin@gmail.com',
    password: 'admin@gmail.com',
  };

  login() {
    if (
      this.userObject.username === 'admin@gmail.com' &&
      this.userObject.password === 'admin@gmail.com'
    ) {
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }
}
