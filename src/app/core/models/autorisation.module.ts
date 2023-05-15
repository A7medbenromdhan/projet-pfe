export interface Autorisation {
    role: string;
    idAutorisation?: number;
    heureSortie: Date;
    heureRetour: Date;
    motif: number;
    duree: string;
    personnel?: any;
  }
  