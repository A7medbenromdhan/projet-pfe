import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CongeService } from '../../../../app/core/services/conge.service';
import { EtypeConge } from './etype-conge.enum';
import { TokenStorage } from 'src/app/core/services/tokenservice.service';
import { Conge } from 'src/app/core/models/conge.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss'],
})
export class CongesComponent implements OnInit {
  EtypeConge = Object.values(EtypeConge);
  breadCrumbItems: Array<{}>;
  isAdmin: boolean = false;
  isManager: boolean = false;
  userConges: Conge[] = [];

  formConge: FormGroup;
  editCongeForm: FormGroup;
  demandeCongeForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private congeService: CongeService,
    private tokenStorage: TokenStorage
  ) {}

  ngOnInit(): void {

    this.loadUserConges()
    this.breadCrumbItems = [
      { label: 'Congé' },
      { label: 'Gestion des congés', active: true },
    ];

    this.formConge = this.formBuilder.group({
      matriculec: [this.tokenStorage.getUser().matriculeP],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      duree: ['', Validators.required],
      cause: ['', Validators.required],
      statut: [{ value: 'En Attente', disabled: true }, Validators.required],
    });

    this.editCongeForm = this.formBuilder.group({
      // Define the form controls for Edit Congé modal here
    });

    this.demandeCongeForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      duree: ['', Validators.required],
      statut: ['En Attente', Validators.required],
      cause: ['', Validators.required],
      matriculec: [this.tokenStorage.getUser().matriculeP],
      datedemande: ['', Validators.required],
      typeConge: ['']
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  onEditConge() {
    // Implement the logic for editing a Congé
  }

  onDemandeConge() {
    console.log(this.demandeCongeForm.value);
    if (this.demandeCongeForm.valid) {
      const congeData = this.demandeCongeForm.value;
      const dateDebut = new Date(congeData.dateDebut);
      const dateFin = new Date(congeData.dateFin);
      const diffTime = Math.abs(dateFin.getTime() - dateDebut.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      congeData.duree = diffDays + 1; // add 1 to include the start date in the duration
      congeData.statut = 'En Attente'; // set default status to 'En Attente'
  
      // Get the matriculec from the personnel
      congeData.matriculec = this.tokenStorage.getUser().matriculeP;
  
      this.congeService.createConge(congeData).subscribe(
        (response: Conge) => {
          console.log('Congé created:', response);
          this.loadUserConges();
          this.modalService.dismissAll();
          alert('Demande envoyée');
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error appropriately (e.g., display an error message to the user)
        }
      );
    }
  }
  
  
  
  

  createDem() {
    this.congeService.createConge(this.demandeCongeForm.value).subscribe(
      (data) => {
        if (data) {
          console.log('ok');
        } else {
          console.log('non');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
 
  loadUserConges() {
    
    const user = this.tokenStorage.getUser();
    const matricule = user.matriculeP;
    console.log('user',matricule )
    this.congeService.getCongesByMatricule(matricule).subscribe(
      (data: Conge[]) => {
        this.userConges = data;
      },
      (error: HttpErrorResponse) => {
       
        console.error('Error:', error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    );
  }
  
  onDeleteConges(matricule: string) {
    this.congeService.deleteCongesByMatricule(matricule)
      .subscribe(
        () => {
          console.log('Congés deleted successfully');
          // Refresh the list of Congés or perform any other necessary actions
        },
        (error) => {
          console.error('Error deleting Congés:', error);
          // Handle the error appropriately (e.g., display an error message)
        }
      );
  }
  


  initialize(): void {
    const user = this.tokenStorage.getUser(); // Make sure to import and inject the 'tokenStorage' service

    if (user.roles && user.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      this.isManager = false;
    } else if (user.roles && user.roles.includes('ROLE_CHEF')) {
      this.isAdmin = false;
      this.isManager = true;
    } else {
      this.isAdmin = false;
      this.isManager = false;
    }
  }
}