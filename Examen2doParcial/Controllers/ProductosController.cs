using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Examen2doParcial.Models;
using System.Threading;

namespace Examen2doParcial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : Controller
    {
        //Creando la variable de contexto de BD-
        private readonly Examen2doPContext _baseDatos;

        public ProductosController(Examen2doPContext baseDatos)
        {
            _baseDatos = baseDatos;
        }

        //Metodo GET ListaTareas que devuelve la lista de todas las tareas en la BD.
        [HttpGet]
        [Route("ListaProductos")]
        public async Task<IActionResult> Lista()
        {
            var listaProductos = await
            _baseDatos.Productos.ToListAsync();
            return Ok(listaProductos);
        }

        //Metodo POST ListaTareas que devuelve la lista de todas las tareas en la BD.
        [HttpPost]
        [Route("AgregarProducto")]
        public async Task<IActionResult> Agregar([FromBody] Producto request)
        {
            await _baseDatos.Productos.AddAsync(request);
            await _baseDatos.SaveChangesAsync();
            return Ok(request);
        }

        //Metodo Put ModificarTareas que permite modificar una tarea de la bd
        [HttpPut]
        [Route("ModificarProducto/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] Producto request)
        {
            var productoModificar = await
            _baseDatos.Productos.FindAsync(id);
            if (productoModificar == null)
            {
                return BadRequest("No existe el producto");
            }

            productoModificar.Nombre = request.Nombre;
            productoModificar.Descripcion = request.Descripcion;
            productoModificar.Precio = request.Precio;
            productoModificar.Imagen = request.Imagen;
            productoModificar.Precio = request.Precio;

            try
            {
                await _baseDatos.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();
        }

        //Metodo DELETE EliminarTarea que permite eliminar una tarea de la bd
        [HttpDelete]
        [Route("EliminarProducto/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var productoEliminar = await
            _baseDatos.Productos.FindAsync(id);
            if (productoEliminar == null)
            {
                return BadRequest("No existe el producto");
            }

            _baseDatos.Productos.Remove(productoEliminar);
            await _baseDatos.SaveChangesAsync();


            return Ok();
        }

    }
}
