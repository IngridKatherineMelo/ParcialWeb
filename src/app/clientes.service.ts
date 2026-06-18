import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Persona {
  id: number;
  nombre: string;
  correo?: string;
  telefono?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly apiUrl = 'http://localhost:3000/api/personas';
  private readonly http = inject(HttpClient);

  list() {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  create(persona: Partial<Persona>) {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  update(id: number, persona: Partial<Persona>) {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}