<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-title class="headline">
        <v-btn @click="crearPDF()"> <v-icon>print</v-icon> </v-btn>Reporte de
        venta
      </v-card-title>

      <v-card-text>
        <div id="factura">
          <header>
            <div id="logo">
              <img src="" id="imagen" />
            </div>
            <div id="datos">
              <p id="encabezado">
                <b>TedescoDev</b>
                <br />Amezaga 1923 - Montevideo, Uruguay
                <br />Telefono:(+598)98751130
                <br />Email:contacto@tedesco.es.com
              </p>
            </div>
            <div id="fact">
              <p>
                {{ tipo_comprobante }}
                <br />
                {{ serie_comprobante }}-{{ num_comprobante }}
                <br />
                {{ fecha }}
              </p>
            </div>
          </header>
          <br />
          <section>
            <div>
              <table id="facliente">
                <tbody>
                  <tr>
                    <td id="cliente">
                      <strong>Sr(a). {{ persona.nombre }}</strong>
                      <br />
                      <strong>Documento:</strong>
                      {{ persona.num_documento }}
                      <br />
                      <strong>Dirección:</strong>
                      {{ persona.direccion }}
                      <br />
                      <strong>Teléfono:</strong>
                      {{ persona.telefono }}
                      <br />
                      <strong>Email:</strong>
                      {{ persona.email }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <br />
          <section>
            <div>
              <table id="facarticulo">
                <thead>
                  <tr id="fa">
                    <th>CANT</th>
                    <th>DESCRIPCION</th>
                    <th>PRECIO UNIT</th>
                    <th>DESC.</th>
                    <th>PRECIO TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="det in detalles" :key="det._id">
                    <td style="text-align: center">{{ det.cantidad }}</td>
                    <td>{{ det.articulo }}</td>
                    <td style="text-align: right">{{ det.precio }}</td>
                    <td style="text-align: right">{{ det.descuento }}</td>
                    <td style="text-align: right">
                      {{ det.cantidad * det.precio - det.descuento }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="text-align: right">SUBTOTAL</th>
                    <th style="text-align: right">
                      $
                      {{ (totalParcial = (total - totalImpuesto).toFixed(2)) }}
                    </th>
                  </tr>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="text-align: right">IVA({{ impuesto }}%)</th>
                    <th style="text-align: right">
                      $
                      {{
                        (totalImpuesto = (
                          (total * impuesto) /
                          (1 + impuesto)
                        ).toFixed(2))
                      }}
                    </th>
                  </tr>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="text-align: right">TOTAL</th>
                    <th style="text-align: right">
                      $ {{ (total = calcularTotal) }}
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
          <br />
          <br />
          <footer>
            <div id="gracias">
              <p>
                <b>Gracias por su compra!</b>
              </p>
            </div>
          </footer>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="ocultarComprobante()" color="blue darken-1" text
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  props: {
    imprimir: Array,
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    crearPDF() {
      var quotes = document.getElementById("factura");
      html2canvas(quotes).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png");
        var imgWidth = 210;
        var pageHeight = 295;

        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF("p", "mm", "a4");
        var position = 0;

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save("ComprobanteVenta.pdf");
      });
    },
  },
};
</script>
<style>
#factura {
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

#logo {
  float: left;
  margin-left: 2%;
  margin-right: 2%;
}
#imagen {
  width: 100px;
}

#fact {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

#datos {
  float: left;
  margin-top: 0%;
  margin-left: 2%;
  margin-right: 2%;
  /*text-align: justify;*/
}

#encabezado {
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
}

section {
  clear: left;
}

#cliente {
  text-align: left;
}

#facliente {
  width: 40%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 15px;
}

#fa {
  color: #ffffff;
  font-size: 14px;
}

#facarticulo {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  padding: 20px;
  margin-bottom: 15px;
}

#facarticulo thead {
  padding: 20px;
  background: #2183e3;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}

#gracias {
  text-align: center;
}
</style>