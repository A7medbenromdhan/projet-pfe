import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../../app/core/services/conge.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {
  conges: any[];
  chefId: number;
  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.fetchConges();
  }

  approveConge(congeId: number) {
    this.congeService.approveConge(congeId).subscribe(
      () => {
        // Congé approved successfully, update the status in the local list
        const congeIndex = this.conges.findIndex((conge) => conge.id === congeId);
        if (congeIndex !== -1) {
          this.conges[congeIndex].status = 'Approved';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  rejectConge(congeId: number) {
    this.congeService.rejectConge(congeId).subscribe(
      () => {
        // Congé rejected successfully, update the status in the local list
        const congeIndex = this.conges.findIndex((conge) => conge.id === congeId);
        if (congeIndex !== -1) {
          this.conges[congeIndex].status = 'Rejected';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchConges() {
    
    this.congeService.getCongesByChefId(this.chefId).subscribe(
      (conges) => {
        this.conges = conges;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}