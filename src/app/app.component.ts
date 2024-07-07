 
import { Component} from '@angular/core'; 
import { RouterOutlet } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { NgFor, NgIf } from '@angular/common'; 
import { ITarea } from './interfaces/tarea'; 
import { TareaService } from './services/tarea.service'; 
import { FormsModule } from '@angular/forms'; 
 
 
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet,HttpClientModule,FormsModule,NgFor,NgIf], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css' 
}) 
export class AppComponent { 
  listaTareas: ITarea[] = []; 
  isResultLoaded = false; 
  isUpdateFormActive = false; 
 
  nombreTarea: string =""; 
  
  IDTareaActual: number = 0; 
 
  constructor(private _tareaService: TareaService )  
  { 
    this.obtenerTareas(); 
  } 
 
  obtenerTareas() 
  { 
    this._tareaService.getList().subscribe({ 
      next:(data) => { 
        this.listaTareas = data; 
        this.isResultLoaded = true; 
      }, error:(e) => {console.log(e)} 
    }); 
  } 
 
  agregarTarea() 
  { 
    const request: ITarea = { 
      idTarea: 0, 
      nombre: this.nombreTarea 
    } 
 
    this._tareaService.add(request).subscribe({ 
      next:(data) => { 
        //this.listaTareas.push(data); 
        this.nombreTarea = ""; 
        this.obtenerTareas(); 
      }, error: (e) => {console.log(e)} 
    }) 
  } 
 
  obtenerTarea(data: ITarea)  
  { 
   this.nombreTarea = data.nombre; 
    
   this.IDTareaActual = data.idTarea; 
  } 
 
  modificarTarea() 
  { 
    const request: ITarea = { 
      idTarea: this.IDTareaActual, 
      nombre: this.nombreTarea 
    } 
 
    this._tareaService.update(request).subscribe({ 
      next:(data) => { 
        //this.listaTareas.push(data); 
        this.nombreTarea = ""; 
        this.IDTareaActual = 0; 
        this.obtenerTareas(); 
      }, error: (e) => {console.log(e)} 
    }) 
  } 
  
  guardar() 
  { 
    if(this.IDTareaActual == 0) 
    { 
        this.agregarTarea(); 
    } 
      else 
      { 
       this.modificarTarea(); 
      } 
  } 
 
 
  eliminarTarea(tarea: ITarea) 
  { 
    this._tareaService.delete(tarea.idTarea).subscribe({ 
      next:(data) => { 
        //const nuevaLista = this.listaTareas.filter(item => item.idTarea != tarea.idTarea) 
        //this.listaTareas = nuevaLista; 
        this.obtenerTareas(); 
      }, error:(e) => {} 
    }); 
  } 
}  