using System;
using System.Collections.Generic;

namespace Examen2doParcial.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public double Precio { get; set; }

    public string Imagen { get; set; } = null!;

    public string Categoria { get; set; } = null!;
}
