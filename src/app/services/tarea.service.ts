
import { Injectable } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import { environment } from '../../environments/environment.development'; 
import { Observable } from 'rxjs'; 
import { ITarea } from '../interfaces/tarea'; 
 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class TareaService { 
 
  private endpoint: string =  environment.endPoint; 
  private apiUrl: string = this.endpoint + "Tareas/"; 
 
  constructor(private http: HttpClient) { } 
 
  //Método para invocar al endpoint de ListaTareas 
  getList(): Observable<ITarea[]>{ 
    return this.http.get<ITarea[]>(`${this.apiUrl}ListaTareas`); 
  } 
 
  //Método para invocar al endpoint de AgregarTarea 
  add(request: ITarea): Observable<ITarea>{ 
    return this.http.post<ITarea>(`${this.apiUrl}AgregarTarea`, request); 
  } 
 
  //Método para invocar al endpoint de ModificarTarea 
  update(request: ITarea): Observable<void>{ 
    return this.http.put<void>(`${this.apiUrl}ModificarTarea/${request.idTarea}`, request); 
  } 
 
  //Método para invocar al endpoint de EliminarTarea 
  delete(idTarea: number): Observable<void>{ 
    return this.http.delete<void>(`${this.apiUrl}EliminarTarea/${idTarea}`); 
  } 
} 