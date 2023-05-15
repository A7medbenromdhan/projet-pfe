import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personneles',
  templateUrl: './personneles.component.html',
  styleUrls: ['./personneles.component.scss']
})
export class PersonnelesComponent implements OnInit {
  personnels: any[] = []; // Replace 'any' with the appropriate type for personnel

  addPersonnelForm: FormGroup;
  editPersonnelForm: FormGroup;

  editedPersonnel: any = {}; // Replace 'any' with the appropriate type for personnel
  newPersonnel: any = {}; // Replace 'any' with the appropriate type for personnel

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.addPersonnelForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.editPersonnelForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Call a service method to fetch the list of personnels and assign it to 'personnels' array
    // Example:
    // this.personnels = this.personnelService.getPersonnels();
  }

  openAddPersonnelModal(content: TemplateRef<any>): void {
    this.newPersonnel = {};
    this.modalService.open(content);
  }

  saveNewPersonnel(): void {
    if (this.addPersonnelForm.valid) {
      // Assign the form values to 'newPersonnel' object
      this.newPersonnel = this.addPersonnelForm.value;

      // Call a service method to save the new personnel
      // Example:
      // this.personnelService.addPersonnel(this.newPersonnel);

      // Reset the form and close the modal
      this.addPersonnelForm.reset();
      this.modalService.dismissAll();
    }
  }

  editPersonnel(personnel: any): void {
    this.editedPersonnel = { ...personnel };
    // Perform the necessary logic for editing personnel
  }
  

  saveEditedPersonnel(): void {
    if (this.editPersonnelForm.valid) {
      // Assign the form values to 'editedPersonnel' object
      this.editedPersonnel = this.editPersonnelForm.value;

      // Call a service method to update the edited personnel
      // Example:
      // this.personnelService.updatePersonnel(this.editedPersonnel);

      // Reset the form and close the modal
      this.editPersonnelForm.reset();
      this.modalService.dismissAll();
    }
  }

  deletePersonnel(personnel: any): void {
    // Call a service method to delete the personnel
    // Example:
    // this.personnelService.deletePersonnel(personnel.id);

    // Remove the personnel from the 'personnels' array
    const index = this.personnels.indexOf(personnel);
    if (index !== -1) {
      this.personnels.splice(index, 1);
    }
  }
}
