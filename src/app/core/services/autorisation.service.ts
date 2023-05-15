import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autorisation } from '../models/autorisation.module';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private baseUrl = 'http://localhost:8082/api/autorisation';

  constructor(private http: HttpClient) { }

  // For Personnel

  getAutorisations(): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(`${this.baseUrl}/list`);
  }

  createAutorisation(autorisation: Autorisation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/DemandeAutorisation`, autorisation);
  }

  // For Manager (Chef)

  getAuthorizationsByChefId(chefId: number): Observable<any[]> {
    const url = `${this.baseUrl}/authorizations?chefId=${chefId}`;
    return this.http.get<any[]>(url);
  }

  approveAuthorization(authorizationId: number): Observable<any> {
    const url = `${this.baseUrl}/authorizations/${authorizationId}/approve`;
    return this.http.put<any>(url, {});
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

  update(id: number, autorisation: Autorisation): Observable<Autorisation> {
    return this.http.put<Autorisation>(`${this.baseUrl}/update/${id}`, autorisation);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { observe: 'response' });
  }
  
}
