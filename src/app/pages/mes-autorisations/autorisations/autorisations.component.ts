import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutorisationService } from '../../../core/services/autorisation.service';

@Component({
  selector: 'app-autorisations',
  templateUrl: './autorisations.component.html',
  styleUrls: ['./autorisations.component.scss']
})
export class AutorisationsComponent implements OnInit {

  autorisations: any[] = [];
  closeResult = '';
  motifs: any[] = [];
  viewAutorisationModal: any;
  autorisationForm!: FormGroup;
  isAdmin: boolean = false;
  isManager: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private autorisationService: AutorisationService
  ) {}

  ngOnInit(): void {
    this.autorisationForm = this.fb.group({
      heureSortie: ['', Validators.required],
      heureRetour: ['', Validators.required],
      motif: ['', Validators.required],
      duree: ['', Validators.required],
      statut: ['', Validators.required],
    });

    this.autorisationService.getAutorisations().subscribe((data: any[]) => {
      this.autorisations = data;
    });
  }

  onSubmitAutorisation(): void {
    if (this.autorisationForm.invalid) {
      return;
    }

    const autorisationData = this.autorisationForm.value;

    this.autorisationService.createAutorisation(autorisationData).subscribe((data: any) => {
      console.log(data);
      this.modalService.dismissAll();
      this.autorisationForm.reset();
      this.autorisations.push(data);
    });
  }

  openModal(content: any, autorisation: any): void {
    this.viewAutorisationModal = autorisation;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteAutorisation(autorisation: any): void {
    this.autorisationService.delete(autorisation.id).subscribe(() => {
      console.log('Autorisation deleted:', autorisation.id);
      // Remove the deleted autorisation from the autorisations array
      this.autorisations = this.autorisations.filter(a => a.id !== autorisation.id);
    }, (error) => {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    });
  }
  

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onDemandeAutorisation(): void {
    if (this.autorisationForm.invalid) {
      return;
    }
  
    const autorisationData = this.autorisationForm.value;
  
    this.autorisationService.createAutorisation(autorisationData).subscribe(
      (data: any) => {
        console.log(data);
        this.modalService.dismissAll();
        this.autorisationForm.reset();
        this.autorisations.push(data);
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    );
  }
  }
  
 
