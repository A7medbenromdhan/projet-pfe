export interface Autorisation {
    role: string;
    idAutorisation?: number;
    heureSortie: Date;
    heureRetour: Date;
    motif: string;
    duree: string;
    personnel?: any;
  }
  