export enum EtypeConge {
  Maladie = 1,
  Annuel = 2,
  Maternité = 3,
  Paternité = 4,
  Sans_solde = 5,
  Autre = 6
}
export namespace EtypeConge {
  export const EtypeCongeLabels: { [key: number]: string } = {
    [EtypeConge.Maladie]: 'Maladie',
    [EtypeConge.Annuel]: 'Annuel',
    [EtypeConge.Maternité]: 'Maternité',
    [EtypeConge.Paternité]: 'Paternité',
    [EtypeConge.Sans_solde]: 'Sans solde',
    [EtypeConge.Autre]: 'Autre'
  };
}
