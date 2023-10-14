import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { ProductsService } from 'src/app/pages/products/products.service';
import { ClientsService } from 'src/app/pages/clients/clients.service';
import Swal from 'sweetalert2';
import { DtoAddCotizacionModel } from '../../models/dtoAddCotizacion';
import { SuppliersService } from 'src/app/pages/suppliers/suppliers.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-market',
  templateUrl: './add-market.component.html',
  styleUrls: ['./add-market.component.scss']
})
export class AddMarketComponent extends GeneralFunctions {
  register: FormGroup;
  addDetailProduct: FormGroup;
  ProductoAgregados: any[] = []
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%]  disabled:bg-transparent border-blue-100 ";

  cotizazion: DtoAddCotizacionModel = new DtoAddCotizacionModel()
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private clientsService: ClientsService,
    private suppliersService: SuppliersService,
  ) {
    super();
    this.register = this.fb.group({
      ruc: [{ value: '', disabled: false }],
      cliente: [{ value: '', disabled: false }],
      vendedor: [{ value: '', disabled: false }],
      fecha_envio: [{ value: '', disabled: false }],
      fecha_solicitud: [{ value: '', disabled: false }],
      estado: [{ value: '', disabled: false }],
      notas: [{ value: '', disabled: false }],
    });

    this.addDetailProduct = this.fb.group({
      sku: [{ value: '', disabled: false }],
      descripcion: [{ value: '', disabled: false }],
      solphed_cliente: [{ value: '', disabled: false }],
      cantidad: [{ value: '', disabled: false }],
      precio_venta: [{ value: '', disabled: false }],
      precio_compra: [{ value: '', disabled: false }],
      precio_original: [{ value: '', disabled: false }],
      marca_original: [{ value: '', disabled: false }],
      marca_alternativa: [{ value: '', disabled: false }],
      ruc_proveedor: [{ value: '', disabled: false }],
      proveedor: [{ value: '', disabled: false }],
      lead_time: [{ value: '', disabled: false }],

    });

  }

  ngOnInit() {
    this.loadProducts()
  }

  registerMarket(register: any) {
    this.loadingService.show();
    this.marketRatesService.createMarketRates(register).subscribe(
      data => {
        this.loadingService.hide();
        this.succes_function(data.detail.message);

      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }

  addProductBoolean: boolean = false;
  addCSVProduct: boolean = false;
  addProduct(value: any) {
    this.cotizazion.productos.push(value)
    this.addProductBoolean = false
    this.addDetailProduct.reset()
  }

  deleteProduct(product: any) {
    const indexAEliminar = this.cotizazion.productos.findIndex(item => item.solphed_cliente === product.solphed_cliente);
    this.cotizazion.productos.splice(indexAEliminar, 1);
  }

  updateProduct(product: any) {
    const indexAModificar = this.cotizazion.productos.findIndex(item => item.solphed_cliente === product.solphed_cliente);
    console.log("indexAModificar", indexAModificar);

    if (indexAModificar !== -1) {
      this.cotizazion.productos[indexAModificar] = product;  // Reemplaza 'nuevoValor' con el nuevo valor que desees asignar
      this.succes_function("Modificación Existosa")
      this.addProductBoolean = false
      this.addDetailProduct.reset()
    }


  }
  updateBool: boolean = false
  editProduct(product: any) {
    this.updateBool = true;
    this.addDetailProduct.patchValue(product)
    this.addProductBoolean = true
  }
  ListProductBoolean: boolean = false;
  ListProducts(value: any) {
    this.ListProductBoolean = value;
    if (value) {
      this.loadProducts()
    }
  }

  Products: any = []
  loadProducts() {
    this.loadingService.show();
    this.productsService.getProducts().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.Products = data.detail
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function(err.error.detail.message)
      }
    )
  }



  selectProduct(item: any) {
    this.addDetailProduct.patchValue({
      id_cotización: item.id_cotización,
      solped_cliente: item.solped_cliente,
      sku: item.SKU,
      descripcion: item.Descripcion,
      cantidad: item.cantidad,
      precio_venta: null,
      lead_time: item.lead_time,
      precio_compra: null,
      precio_original: item.PrecioOriginal,
      marca_original: item.Marca,
      proveedor: item.proveedor,
      vendedor: "Marco Wanly Obregón Casique", // Logeado
    });
    this.addProductBoolean = true;
    this.ListProductBoolean = false
  }

  registrarCotizacion() {
    this.cotizazion.ruc = this.register.value.ruc
    this.cotizazion.cliente = this.register.value.cliente
    this.cotizazion.vendedor = this.register.value.vendedor
    this.cotizazion.fecha_envio = this.register.value.fecha_envio
    this.cotizazion.fecha_solicitud = this.register.value.fecha_solicitud
    this.cotizazion.estado = "PENDIENTE"
    this.cotizazion.notas = this.register.value.notas

    this.loadingService.show();
    console.log(this.cotizazion);

    this.marketRatesService.createMarketRates(this.cotizazion).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        this.cotizazion = new DtoAddCotizacionModel();
        this.succes_function("Cotizacion registrada");
        this.register.reset()
        this.addDetailProduct.reset()

      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }
  /* 
  Estado : Inicialmente tiene que ser PENDIENTE (El cliente genero pero no se envio )
  RUC: Verificar que el RUC existe en nuestra base de datos (Caso contrario registrarlo?)  

  En agregar la cotizacion detalle te puedo mandar una lista quienes pertenecen a ese producto
  La idea de crear la cotización es generar automáticamente los detalles de la cotización y que de esa manera este linkeado ya con el detale


  Necesitamos buscar la forma de como extraer los precios originales

  Crear tabla proveedores detalle donde tendremos registrado los precioes de compra, marca, (en procesos, traido) y nombre proveedor
  */
  searchRUC() {
    this.loadingService.show();
    this.clientsService.getClientByRUC(this.register.value.ruc).subscribe(
      data => {
        this.loadingService.hide();

        this.register.get('cliente').setValue(data.detail.RazonSocial)
        this.register.get('vendedor').setValue("Marco Wanly Obregón Casique")

      }, err => {
        console.log("ERROR", err);

        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )

  }
  searchSKU() {
    this.loadingService.show();
    this.productsService.getProductBySku(this.addDetailProduct.value.sku).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        this.selectProduct(data.detail)
      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )


  }
  searchProveedorByRUC() {
    this.loadingService.show();
    this.suppliersService.getSupplierByRUC(this.addDetailProduct.value.ruc_proveedor).subscribe(
      data => {
        this.loadingService.hide();

        this.addDetailProduct.get('proveedor').setValue(data.detail.RazonSocial)
      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }
  ShowaddProducto() {
    if (this.cotizazion.productos.length == 0) {
      Swal.fire({
        title: '¿Cómo desea agregar sus productos?',
        showCancelButton: true,
        showDenyButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Manualmente',
        denyButtonText: `Importar CSV`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.addProductBoolean = true
        } else if (result.isDenied) {
          this.addCSVProduct = true
        }
      })
    } else {
      this.addProductBoolean = true
    }


  }

  cancelAdd() {
    this.addProductBoolean = false;
    this.addCSVProduct = false;
    this.addDetailProduct.reset()
  }

  // CARGAR ARCHIVO
  verDetalleArchivo: boolean = false;
  selecteddocumento: any = {
    archivodocumento: '',
    fechaadjuntomostrar: '',
    tamanorealarchivo: '',
    tipoarchivo: '',
  };

  change() {
    this.verDetalleArchivo = false
  }
  
  labelCV: any;
  cvSource: any;
  acceptextensions: any = "AFASDF"
  cargarCV(event: any) {
    this.loadingService.show()
    console.log("caRGAR CV", event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.labelCV = event.target.files[0].name;
      this.cvSource = file;
      if (event.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        this.showerrorAlert("El formato debe ser Xslx")
        this.loadingService.hide()
      } else {
        this.verDetalleArchivo = true;
        console.log("Archivo: ", event.target.files[0]);

        this.selecteddocumento.archivodocumento = event.target.files[0].name;
        this.selecteddocumento.fechaadjuntomostrar = event.target.files[0].lastModifiedDate;
        this.selecteddocumento.tamanorealarchivo = event.target.files[0].size / (1024 * 1024);
        this.selecteddocumento.tipoarchivo = event.target.files[0].type;

        if (file) {
          this.readFile(file);
        }

        
      }
    }
  }
  readFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      // Parse the data and use it as needed
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log("jsonData", jsonData);
      this.loadingService.hide()
      this.cotizazion.productos = jsonData
      this.addCSVProduct = false
      // You can now use the jsonData array as needed, for example, send it to a service or display it in your component
    };

    reader.readAsBinaryString(file);
  }
}
