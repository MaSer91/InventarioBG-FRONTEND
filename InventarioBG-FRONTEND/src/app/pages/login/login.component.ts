import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin(): void {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/products']);
        this.loading = false;
      },
      (error:any) => {
        this.loading = false;
        this.snackBar.open('Error de autenticación. Verifique sus credenciales.', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
