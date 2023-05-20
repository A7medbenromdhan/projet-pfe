import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutorisationService } from '../../../core/services/autorisation.service';
import { Autorisation } from 'src/app/core/models/autorisation.module';
import { TokenStorage } from 'src/app/core/services/tokenservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-autorisations',
  templateUrl: './autorisations.component.html',
  styleUrls: ['./autorisations.component.scss']
})
export class AutorisationsComponent implements OnInit {

  userAutorisations: Autorisation[] = [];
  closeResult = '';
 
  viewAutorisationModal: any;
  autorisationForm!: FormGroup;
  isAdmin: boolean = false;
  isManager: boolean = false;
  formAutorisation: FormGroup;
  editAutorisationForm: FormGroup;
  demandeAutorisationForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private autorisationService: AutorisationService,
    private tokenStorage: TokenStorage
  ) {}

  ngOnInit(): void {
    
    this.loadUserAutorisations()
    


    this.formAutorisation = this.formBuilder.group({
      matriculea:[this.tokenStorage.getUser().matriculeP],
      heureSortie: ['', Validators.required],
      heureRetour: ['', Validators.required],
      motif: ['', Validators.required],
      duree: ['', Validators.required],
      statut: [{ value: 'En Attente', disabled: true }, Validators.required],
    });
    this.editAutorisationForm = this.formBuilder.group({
      heureSortie: ['', Validators.required],
      heureRetour: ['', Validators.required],
      motif: ['', Validators.required],
      duree: ['', Validators.required],
      statut: ['', Validators.required],
    });
    

   
    this.demandeAutorisationForm=this.formBuilder.group({
      matriculea:[this.tokenStorage.getUser().matriculeP],
      heureSortie: ['', Validators.required],
      heureRetour: ['', Validators.required],
      motif: ['', Validators.required],
      duree: ['', Validators.required],
      statut: [{ value: 'En Attente', disabled: true }, Validators.required],
    })
    };
  
  

    openModal(content: any) {
      this.modalService.open(content,{ size: 'lg', centered: true });
    }
    onEditAutorisation() {
      if (this.editAutorisationForm.valid) {
        const editedAutorisation = this.editAutorisationForm.value;
    
        // Update the Autorisation using the updateAutorisation() method from the AutorisationService
        this.autorisationService.updateAutorisation(editedAutorisation.matriculea, editedAutorisation).subscribe(
          () => {
            console.log('Autorisation updated successfully');
            // Perform any necessary actions after updating the Autorisation
          },
          (error) => {
            console.error('Error updating Autorisation:', error);
            // Handle the error appropriately (e.g., display an error message to the user)
          }
        );
    
        // Close the edit modal or perform any other necessary actions
      }
    }
    
    onDemandeAutorisation() {
      console.log(this.demandeAutorisationForm.value);
      if (this.demandeAutorisationForm.valid) {
        const autorisationData = this.demandeAutorisationForm.value;
    
        const heureSortie = new Date(); // Create a new Date object
        const sortieTime = autorisationData.heureSortie.split(':'); // Split the time string
        heureSortie.setHours(Number(sortieTime[0]), Number(sortieTime[1])); // Set the hours and minutes
    
        const heureRetour = new Date(); // Create a new Date object
        const retourTime = autorisationData.heureRetour.split(':'); // Split the time string
        heureRetour.setHours(Number(retourTime[0]), Number(retourTime[1])); // Set the hours and minutes
    
        const diffTime = Math.abs(heureRetour.getTime() - heureSortie.getTime());
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
        // Set the calculated duration and default status
        autorisationData.duree = diffHours;
        autorisationData.statut = 'En Attente';
    
        autorisationData.heureSortie = heureSortie; // Update heureSortie to Date object
        autorisationData.heureRetour = heureRetour; // Update heureRetour to Date object
    
        autorisationData.matriculea = this.tokenStorage.getUser().matriculeP;
    
        this.autorisationService.createAutorisation(autorisationData).subscribe(
          (response: Autorisation) => {
            console.log('Autorisation created:', response);
            this.loadUserAutorisations();
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
    this.autorisationService.createAutorisation(this.demandeAutorisationForm.value).subscribe(
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
  loadUserAutorisations() {
    const user = this.tokenStorage.getUser();
    const matricule = user.matriculeP;
  
    this.autorisationService.getAutorisationsByMatricule(matricule).subscribe(
      (data: Autorisation[]) => {
        this.userAutorisations = data.map((autorisation: Autorisation) => {
          // Format the duree property based on the numeric value
          autorisation.duree = autorisation.duree === '1' ? '1 hour' : autorisation.duree + ' hours';
          return autorisation;
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    );
  }
  
  deleteAutorisationById(id: number) {
    this.autorisationService.deleteAutorisationById(id).subscribe(
      () => {
        console.log('Autorisation deleted successfully');
        // Show a success message or perform any other necessary actions
      },
      (error) => {
        console.error('Error deleting Autorisation:', error);
        // Handle the error appropriately (e.g., display an error message)
      }
    );
  }
  onDeleteConge(id: number) {
    this.autorisationService.deleteAutorisationById(id).subscribe(
      () => {
        console.log('Autorisation deleted successfully');
        this.loadUserAutorisations();
        alert('Autorisation  deleted successfully');
      },
      (error) => {
        console.error('Error deleting Autorisation:', error);
        // Handle the error appropriately (e.g., display an error message)
        alert('An error occurred while deleting the Autorisation.');
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
  
 
