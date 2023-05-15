import { Component, OnInit } from '@angular/core';
import { AutorisationService } from '../../../core/services/autorisation.service';

@Component({
  selector: 'app-autorisations',
  templateUrl: './autorisations.component.html',
  styleUrls: ['./autorisations.component.scss']
})
export class AutorisationsComponent implements OnInit {
  autorisations: any[];
  chefId: number;
  constructor(private autorisationService: AutorisationService) {}

  ngOnInit(): void {
    this.fetchAutorisations();
  }

  approveAutorisation(autorisationId: number) {
    this.autorisationService.approveAuthorization(autorisationId).subscribe(
      () => {
        const autorisationIndex = this.autorisations.findIndex((autorisation) => autorisation.id === autorisationId);
        if (autorisationIndex !== -1) {
          this.autorisations[autorisationIndex].statut = 'Approuvé';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  rejectAutorisation(autorisationId: number) {
    this.autorisationService.rejectAuthorization(autorisationId).subscribe(
      () => {
        const autorisationIndex = this.autorisations.findIndex((autorisation) => autorisation.id === autorisationId);
        if (autorisationIndex !== -1) {
          this.autorisations[autorisationIndex].statut = 'Rejeté';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchAutorisations() {
    // Assuming you have a method in the autorisationsService to fetch the autorisations based on the chefId
    this.autorisationService.getAuthorizationsByChefId(this.chefId).subscribe(
      (autorisations) => {
        this.autorisations = autorisations;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
