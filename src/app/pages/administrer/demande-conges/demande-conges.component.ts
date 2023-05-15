import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../../app/core/services/conge.service';

@Component({
  selector: 'app-demande-conges',
  templateUrl: './demande-conges.component.html',
  styleUrls: ['./demande-conges.component.scss']
})
export class DemandeCongesComponent implements OnInit {
  demandesConges: any[]; // Holds the list of leave requests

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.fetchDemandesConges();
  }

  fetchDemandesConges() {
    // Fetch the list of leave requests from the CongeService
    const chefId = 1; // Replace with the actual chef ID
    this.congeService.getCongesByChefId(chefId).subscribe(
      (demandes) => {
        this.demandesConges = demandes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  approuverDemande(idDemande: number) {
    // Check if the leave request has already been accepted by the chef
    const demande = this.demandesConges.find((demande) => demande.id === idDemande);
    if (demande && demande.statut === 'Approuvé par le chef') {
      this.congeService.approveConge(idDemande).subscribe(
        () => {
          // Leave request approved successfully, update the status in the local list
          const demandeIndex = this.demandesConges.findIndex((demande) => demande.id === idDemande);
          if (demandeIndex !== -1) {
            this.demandesConges[demandeIndex].statut = 'Approuvé par l\'admin';
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // The leave request has not been accepted by the chef, display an error or show a notification
      console.log('Cannot approve the leave request before it is accepted by the chef.');
    }
  }

  refuserDemande(idDemande: number) {
    // Check if the leave request has already been accepted by the chef
    const demande = this.demandesConges.find((demande) => demande.id === idDemande);
    if (demande && demande.statut === 'Approuvé par le chef') {
      this.congeService.rejectConge(idDemande).subscribe(
        () => {
          // Leave request rejected successfully, update the status in the local list
          const demandeIndex = this.demandesConges.findIndex((demande) => demande.id === idDemande);
          if (demandeIndex !== -1) {
            this.demandesConges[demandeIndex].statut = 'Refusé par l\'admin';
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // The leave request has not been accepted by the chef, display an error or show a notification
      console.log('Cannot reject the leave request before it is accepted by the chef.');
    }
  }
}
