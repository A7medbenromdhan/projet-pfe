import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autorisation } from '../models/autorisation.module';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  deleteAutorisation(id: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8082/api/autorisation';

  constructor(private http: HttpClient) { }

  // For Personnel

  getAutorisationsByMatricule(matricule: string): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(`${this.baseUrl}/getAutorisationsByMatricule/${matricule}`);
  } 

 
  createAutorisation(autorisation: Autorisation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createAutorisation`, autorisation);
  }
  updateAutorisation(matricule: string, autorisation: Autorisation): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateAutorisationsByMatricule/${matricule}`, autorisation);
  }
  
  
  

  // For Manager (Chef)

 

  approveAuthorization(authorizationId: number): Observable<any> {
    const url = `${this.baseUrl}/authorizations/${authorizationId}/approve`;
    return this.http.put<any>(url, {});
  }
  getAuthorizationsByChefId(chefId: string): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(`${this.baseUrl}/chef/${chefId}`);
  }
  rejectAuthorization(authorizationId: number): Observable<any> {
    const url = `${this.baseUrl}/authorizations/${authorizationId}/reject`;
    return this.http.put<any>(url, {});
  }

  // Shared Methods

  getAll(): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<Autorisation> {
    return this.http.get<Autorisation>(`${this.baseUrl}/${id}`);
  }

  

  deleteAutorisationById(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { observe: 'response' });
  }
  
}
