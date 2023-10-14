import { Injectable } from "@angular/core";
import { Alignment, Workbook } from "exceljs";

//import { DataProductos, DtoAddCotizacionModelDetalle } from "./excel.interface";
import * as fs from "file-saver";

import { Fill, FillPattern } from 'exceljs';
import { BorderStyle } from 'exceljs';
import { DtoAddCotizacionModel } from "./dtoAddCotizacion";
@Injectable({ providedIn: 'root' })

export class ExcelService {
    private _workbook!: Workbook;

    dowloadExcel(dataExcel: DtoAddCotizacionModel): void {
        this._workbook = new Workbook();
        this._workbook.creator = 'DigiDev';
        console.log("DATAEXCEL :", dataExcel);
        this._createTable(dataExcel);
        //        this._workbook.addWorksheet('Cotizacion');
        this._workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data]);
            fs.saveAs(blob, 'Cotización.xlsx');
        })
    }
    private _createTable(Data: DtoAddCotizacionModel) {
        const sheet = this._workbook.addWorksheet('Suppliers');
        sheet.views = [
            {
                showGridLines: false//sin lineas 
            }
        ];
        //rellenar con cuadriculas una celda
        const bordeDelgado = {
            top: { style: 'thin' as BorderStyle },
            left: { style: 'thin' as BorderStyle },
            bottom: { style: 'thin' as BorderStyle },
            right: { style: 'thin' as BorderStyle }
        };
        //Color verde
        const estiloCelda = {
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '008000' }
            },
            font: {
                color: { argb: 'FFFFFF' }, //texto blanco
                bold: true // negrita
            }
        };
        //estilo negro
        const estilo_negro = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '000000' }//fondo negro
        }
        const alineacion = {
            horizontal: 'center',
            vertical: 'middle',
        };
        //font
        const estiloTexto = { bold: true, size: 10 };
        const estiloSin = { bold: false, size: 10 };
        //aqui se hace la plantilla, medio molestoso 
        sheet.getColumn('A').width = 2.11;
        sheet.getColumn('B').width = 11.44;
        sheet.getColumn('C').width = 19.56;
        sheet.getColumn('D').width = 12.33;
        sheet.getColumn('E').width = 33.44;
        sheet.getColumn('F').width = 11.11;
        sheet.getColumn('G').width = 11.44;
        sheet.getColumn('H').width = 11.44;
        //alinear columnas
        sheet.columns.forEach((column) => {
            column.alignment = alineacion as Alignment;
        })
        //tamaños de filas 
        const row = sheet.getRow(15); // Obtén la fila que deseas ajustar
        row.height = 15;
        const row1 = sheet.getRow(1);
        row1.height = 22.8;
        const row2 = sheet.getRow(2);
        row2.height = 22.8;
        const row4 = sheet.getRow(4);
        row4.height = 9.8;
        const row11 = sheet.getRow(11);
        row11.height = 9.8;
        const row10 = sheet.getRow(10);
        row10.height = 13.2;

        //DATOS ESTATICOS
        const headerRow = sheet.getRow(14);
        //tenemos 14, a b c d ..
        headerRow.values = [
            '',
            'CANTIDAD',
            'ENTREGA',
            'Codigo',
            'DESCRIPCION',
            'MARCA',
            'P.UNITARIO',
            'P.TOTAL'
        ];

        for (let columnIndex = 2; columnIndex <= 8; columnIndex++) {
            const cell_ = headerRow.getCell(columnIndex);
            const cell4 = row4.getCell(columnIndex);
            const cell11 = row11.getCell(columnIndex);
            cell_.fill = estiloCelda.fill as Fill;
            cell_.font = estiloCelda.font;
            cell4.fill = estilo_negro as Fill;
            cell11.fill = estilo_negro as Fill;

        }
        //combianr celdas en lugar de hacer el for// prefiero el for mas ordenado la verdad xD
        sheet.mergeCells('B10:H10');

        // obtener la celda combinada
        const celdaCombinada = sheet.getCell('B10');
        celdaCombinada.fill = estiloCelda.fill as Fill;
        celdaCombinada.font = estiloCelda.font;
        // al medio de todo
        celdaCombinada.value = 'RESPUESTOS AMERICANOS';
        celdaCombinada.alignment = alineacion as Alignment;
        sheet.mergeCells('B1:H2');
        const celdaCombinada2 = sheet.getCell('B1');
        celdaCombinada2.fill = estiloCelda.fill as Fill;
        celdaCombinada2.font = estiloCelda.font;
        // al medio de todo
        celdaCombinada2.value = 'REPRESENTACIONES AGRICOLAS SRL.';
        celdaCombinada2.alignment = alineacion as Alignment;
        //recu Direccion Telefono
        sheet.getCell('B3').value = 'RUC: 10318890225';
        sheet.getCell('B3').alignment = alineacion as Alignment;
        sheet.getCell('D3').value = 'DIRECCIÓN: AV. ELMER FAUCCET 285 - SAN MIGUEL';
        sheet.getCell('D3').alignment = alineacion as Alignment;
        sheet.getCell('G3').value = 'TELEFONO: 981004430';
        sheet.getCell('G3').alignment = alineacion as Alignment;
        sheet.mergeCells('B3:C3');
        sheet.mergeCells('D3:F3');
        sheet.mergeCells('G3:H3');



        //datos para poner sin mas problema
        sheet.getCell('B6').value = 'CLIENTE:';
        sheet.getCell('B6').style.font = estiloSin
        sheet.getCell('B7').value = 'RUC CLIENTE:';
        sheet.getCell('B7').style.font = estiloSin
        sheet.getCell('B8').value = 'VENDEDOR:';
        sheet.getCell('B8').style.font = estiloSin
        sheet.mergeCells('C6:E6');
        sheet.getCell('C6').style.font = estiloSin
        sheet.getCell('C6').value = Data.cliente;//'Pepsico Iberia Servicios Centrales'
        sheet.mergeCells('C7:E7');
        sheet.getCell('C7').style.font = estiloSin
        sheet.getCell('C7').value = Data.ruc;
        sheet.mergeCells('C8:E8');
        sheet.getCell('C8').value = Data.vendedor;
        sheet.getCell('C8').style.font = estiloSin
        sheet.getRow(6).height = 13.2;
        sheet.getRow(7).height = 13.2;
        sheet.getRow(8).height = 13.2;

        //part2
        sheet.getCell('G6').value = 'COTIZACIÓN:';
        sheet.getCell('G6').style.font = estiloTexto;
        sheet.getCell('G7').value = 'FECHA:';
        sheet.getCell('G7').style.font = estiloTexto;
        sheet.getCell('G8').value = 'SEDE:';
        sheet.getCell('G8').style.font = estiloTexto;
        sheet.getCell('H6').value = 'N° ' + Data.id;
        sheet.getCell('H7').value = Data.fecha_envio;
        sheet.getCell('H8').value = 'LIMA';















        //DATOS "FIJOS" como igv subtotal, etc
        let titleSubVALUE: any;
        let titleIgvVALUE: any;
        let titleTotalVALUE: any;
        let titleSub: any;
        let titleIgv: any;
        let titleTotal: any;
        let startRow = 15;
        let endRow = 24;
        let startColumn = 2; // Columna B
        let endColumn = 8;   // Columna H
        if (Data.productos.length <= 10) {
            titleSub = sheet.getCell('G25');
            titleSub.value = 'SUB-TOTAL';
            titleSub.style.font = estiloTexto;
            titleIgv = sheet.getCell('G26');
            titleIgv.value = 'IGV (18%)';
            titleIgv.style.font = estiloTexto;
            titleTotal = sheet.getCell('G27');
            titleTotal.value = 'TOTAL';
            titleTotal.style.font = estiloTexto;
            titleSubVALUE = sheet.getCell('H25');
            titleIgvVALUE = sheet.getCell('H26');
            titleTotalVALUE = sheet.getCell('H27');

        }
        else {
            const cantidadFaltantes: number = Math.max(0, parseInt(Data.productos.length.toString()) - 10);
            const filaSubtotal: number = 25 + cantidadFaltantes;
            const filaIGV: number = 26 + cantidadFaltantes;
            const filaTotal: number = 27 + cantidadFaltantes;
            endRow = filaSubtotal;
            titleSub = sheet.getCell(`G${filaSubtotal}`);
            titleSub.value = 'SUB-TOTAL';
            titleSub.style.font = estiloTexto;
            titleSubVALUE = sheet.getCell(`H${filaSubtotal}`);

            titleIgv = sheet.getCell(`G${filaIGV}`);
            titleIgv.value = 'IGV (18%)';
            titleIgv.style.font = estiloTexto;
            titleIgvVALUE = sheet.getCell(`H${filaIGV}`);

            titleTotal = sheet.getCell(`G${filaTotal}`);
            titleTotal.value = 'TOTAL';
            titleTotal.style.font = estiloTexto;
            titleTotalVALUE = sheet.getCell(`H${filaTotal}`);

        }



        //RELLENAR PRODUCTOS 
        console.log(Data.productos);
        const rowsToInsert = sheet.getRows(15, Data.productos.length)!;//si o si vienen datos?????  que boton aparezca solo si hay datos
        var total_cotizacion: any = 0;
        for (let index = 0; index < rowsToInsert.length; index++) {
            const itemData = Data.productos[index];//sacar elemetno segun INDEX
            const row = rowsToInsert[index];//obtenemos fila
            const cantidad: any = itemData.cantidad;
            const precioVenta: any = itemData.precio_venta;
            const total: any = cantidad * precioVenta;
            total_cotizacion = total_cotizacion + total;
            row.values = [
                '',//A
                itemData.cantidad,//B
                itemData.lead_time,//
                itemData.sku,
                itemData.descripcion,
                itemData.marca_alternativa,
                itemData.precio_venta,
                total
            ]
        }


        titleSub.fill = estiloCelda.fill as Fill;
        titleSub.font = estiloCelda.font;
        titleIgv.fill = estiloCelda.fill as Fill;
        titleIgv.font = estiloCelda.font;
        titleTotal.font = estiloCelda.font;
        titleTotal.fill = estiloCelda.fill as Fill;
        titleSubVALUE.value =  '$'+ total_cotizacion.toFixed(2);
        titleIgvVALUE.value =  '$'+ (total_cotizacion * (18 / 100)).toFixed(2);
        titleTotalVALUE.value =  '$'+(total_cotizacion + (total_cotizacion* (18 / 100))).toFixed(2);
        //meter celdas

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startColumn; col <= endColumn; col++) {
                const cell = sheet.getCell(row, col);
                cell.border = bordeDelgado;
            }
        }
        titleSubVALUE.border = bordeDelgado;
        titleIgvVALUE.border = bordeDelgado;
        titleTotalVALUE.border = bordeDelgado;
    }
}