import { Component, OnInit } from '@angular/core';
import { AutorisationService } from '../../../core/services/autorisation.service';
import { Autorisation } from '../../../core/models/autorisation.module';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-demandes-autorisations',
  templateUrl: './demandes-autorisations.component.html',
  styleUrls: ['./demandes-autorisations.component.scss']
})
export class DemandesAutorisationsComponent implements OnInit {
  autorisations: Autorisation[];

  constructor(private autorisationService: AutorisationService) { }

  ngOnInit(): void {
    this.loadAutorisations();
  }

  loadAutorisations(): void {
    this.autorisationService.getAll().subscribe((data: any[]) => {
      this.autorisations = data;
    });
  }

  approveAutorisation(autorisationId: number): void {
    this.autorisationService.approveAuthorization(autorisationId).subscribe(() => {
      console.log('Autorisation approved:', autorisationId);
      // Optionally, you can update the autorisations array or perform any other actions
    }, (error) => {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    });
  }

  rejectAutorisation(autorisationId: number): void {
    this.autorisationService.rejectAuthorization(autorisationId).subscribe(() => {
      console.log('Autorisation rejected:', autorisationId);
      // Optionally, you can update the autorisations array or perform any other actions
    }, (error) => {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    });
  }
}
