export class DtoAddCotizacionModel {
    ruc: string
    cliente: string
    vendedor: string
    fecha_envio: string
    fecha_solicitud: string
    estado: string
    notas: string
    productos: DtoProductsAdded[] = []
}

export class DtoProductsAdded {
    sku: string
    descripcion: string
    solphed_cliente: string
    cantidad: Number
    precio_venta: Number
    precio_compra: Number
    precio_original: Number
    marca_original: Number
    marca_alternativa: string
    ruc_proveedor: string
    proveedor: string
    lead_time: string
    estado :  string
}
