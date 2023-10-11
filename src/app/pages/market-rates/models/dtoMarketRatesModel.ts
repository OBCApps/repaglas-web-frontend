export class DtoMarketRatesModel {
    solped_cliente: string
    ruc: string
    vendedor: string
    fecha_envio: Date
    estado: string
    detalleProducto: DtoMarketRatesModelDetalle[]
}

export class DtoMarketRatesModelDetalle {
    id_cotización: string
    solped_cliente: string
    sku: string
    descripcion: string
    cantidad: string
    precio_venta: string
    lead_time: string
    precio_compra: string
    precio_original: string
    marca_alternativa: string
    proveedor: string
    vendedor: string
}
