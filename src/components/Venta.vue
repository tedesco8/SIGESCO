<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ventas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-if="verNuevo==0"
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-if="verNuevo==0" @click="mostrarNuevo()" dark class="mb-2">Nuevo</v-btn>
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione un artículo</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field
                      v-model="texto"
                      @keyup.enter="listarArticulos()"
                      class="text-xs-center"
                      append-icon="search"
                      label="Búsqueda"
                    ></v-text-field>
                    <template>
                      <v-data-table
                        :headers="cabeceraArticulos"
                        :items="articulos"
                        class="elevation-1"
                      >
                        <template v-slot:item.seleccionar="{ item }">
                          <v-icon small class="mr-2" @click="agregarDetalle(item)">add</v-icon>
                        </template>
                        <template v-slot:item.estado="{ item }">
                          <div v-if="item.estado">
                            <span class="blue--text">Activo</span>
                          </div>
                          <div v-else>
                            <span class="red--text">Inactivo</span>
                          </div>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion==1">Activar Item</v-card-title>
            <v-card-title class="headline" v-if="adAccion==2">Desactivar Item</v-card-title>
            <v-card-text>
              Estás a punto de
              <span v-if="adAccion==1">activar</span>
              <span v-if="adAccion==2">desactivar</span>
              el item {{adNombre}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="activarDesactivarCerrar()" color="green darken-1" flat="flat">Cancelar</v-btn>
              <v-btn
                v-if="adAccion==1"
                @click="activar()"
                color="orange darken-4"
                flat="flat"
              >Activar</v-btn>
              <v-btn
                v-if="adAccion==2"
                @click="desactivar()"
                color="orange darken-4"
                flat="flat"
              >Desactivar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="comprobanteModal" max-width="1000px">
          <v-card>
            <v-card-title class="headline">
              <v-btn @click="crearPDF()">
                <v-icon>print</v-icon>
              </v-btn>Reporte de venta
            </v-card-title>

            <v-card-text>
              <div id="factura">
                <header>
                  <div id="logo">
                    <img
                      src="datos: imagen / png; base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAEsCAYAAAAM1WX / AAAABmJLR0QA / wD / AP + gvaeTAAAACXBIWXMAAC2XAAAtlwFK + aFtAAAAB3RJTUUH4woOABgCmn5VawAAHqhJREFUeNrtnUl2JEmSnj9VG3wAEFGVVcXqx + a2j8JTsFfNU3DLFfd8XPQxeAFuuOaKN + CSzKyKCMDdzHQSLszM4REZEwB3wIf / sxcvIhMOH9TtVxEVFRF1 / 8w / 28B4lekSP4FzmANz47 / H / wfmHObc + O / p / 82PZf4Z8 + 8xPXZ + vJsez / Tcjz / 7 / PnZPQ / 7zzu / zt5j8dPz7j22fPnaAH563vl3d + / Fffa6u + f2j7 + 7 + 7zTz8fXdbuhMv / 7z73 / mc1Nr883frY3nvNj50Gxavyl3c / C4 / u2vc / FZZ + fX8vtfQ + PP3v8DNN72L2v / fe5953C + Fj3OEBffqbH + 8RNYzeNNWD + y9feu78Y38f4cb99H / 3u87ovxrPymPewXmO // AJ3t / + 5bmhoabnlljBdiUSeLtu9RSHE2eA9VB4WC2gXcHcDd3fjf09zVA3sBL6Yrln4iUQkkkgUym4ycDgNrhCngk0Guq6hrWG5hOUK1itYLWGxHCcC7PGxzo3i3z3HNAn46WpoWLDYCX + eCOZr9Co0EQjxJoI3g7qC1QqWK9zNehR720LTjIKf3f9SHpcA7Fn + 73oP01VT09Lu4gKJRCDsYgWaCIR4JcE7YH2Le3cH6 / Vo6Zsa8xVUe7GaPSv / NeqnvLbDUU1XQ8OSJYVCJDIHDW26NBEIcSiX3o1r + LbF3b6Dd + 9wi8Vo9b3bC / g + 7anrl7yv / clgjhXMQcPZO1DAUIjniMtBXePaBdyscLd3sFphdfVssR9U / F9OBPV0rVnvYgTzpYlAiO8rCOegqXGrNaxWuPUaFito60k7h / Wm62N9lH2PYA4YBgKRSCZTKJoMxHW7885BVeGaely739zglitoG6xuHvMt5nX + gamp / Rn3lwYtLYbtthD3cwoUJxAXrvbHrB5f45YLWCxwNze49Q3UDcU7nB8f5sweE62ORP3aQ + BwtNO1YrWbCOalwTwRaDIQF2HdYUq4qXHL1WjZ19OWXNOO63e / c / w5gnd / OuIfP5 / tJoJmugz7LLEoEpVYJM5X8FWNa8eA3byGp11A02BTwo3N3oDxze24ixP / tzyCOWD4rSzDRNIkIE5W9M45WK1xyyUsb0bXvm3AV7taCNut99 / + LdenOI77E8EcJ5jzCebEIgULxcncr4sF / uYO1jdjdl1dj67 + XpHNKVKf / MBOl8dTUbFiRaEQCPT0ROIuRiDEa9yReAd1g7 + 5xb97D80S6i + QBC / gk9TnNezjDOrxrFixZLnbQuzpd6nHmgzEQcXuHK6uoG1w7RJ / e4dbr7GqGj3 + 2fm / s09Wn + tXMou7omLNerdzsB8jUD6BeOpdNQbfPK6qoK7x7XLckluuxrV80zzeT6V8VoePxP92E8F + wHBOL96 / 5slAQUPx + Q007T7VLbQLXLvCLRe4toW6nXLo En general, enM8C + fHt9 / q6J + urviyndeI4TzMuC / UpETQZnKHbn8U2La1vcYoVfrXDNctdUU9 + OXP / oDU4pxAsWtLS / yzCc8wnU3fj0vjkM8GOE3jUtfrEco / TNAT + 2Y4eb6Tt + q1Raif9MJgHgsxjBHCz8vI9hJpGnOgzdTG8ieOdw1QLfLMYsu3YFTYOr6zGldtfhW3Ze4n / mRPD1hqaFwcVpgRD3PAJNBMcVPKPgF + vJwi9wTbsn9jlgJysv8R8hRjDvHTQsyK6Q3OgRDC5M3oCRKZoIDiF4xvW7qyuqdo1frkaXvq5x3o8FM7LtEv9bMHoEFY1rWbk1yU0NTV0kEUlkDdKTNW843 + CaMZ22WqxGC + / rUezzCUC2N0EIif + tvYKamso1tG7sTxBdIrlIsLg760B8Y / ycxy9WVO1qDNw1izHhxn9x7JiQ + E / aI3Aeh6d2LeaM7Meg4TC1OR + blJRrVzvOVfh2SbVYUy1WY059VYHzj2chCon / XNetuziBr2lYsvZ3Y4Kx9dPCYAwhXot1d1WNqxvq5ZpqsYaq2aXSPlp4ufMS / 0VNA6MlczgWbsnCLynOxh0DCySXSRYp7hL6GNr4Yb3DeU9Vtbhm3Jbz7XJMwPGOYk5JVBL / tU0EtosUtG5JUy3I2JQ9kEkWiC6RbaxPPI98AhtT570fA3ZVQ9W2 + GaJq1tctbf / bmAm0Uv8mgrGOAEe71oaB8UvyTbmE0QCyeLoFeyWByc0EZhhDqop4cY3S / wkduer8Wz4 / f33U3v / Er84qbUxnspXVM7RuDGfwMzGbcTSEWw4gXXxuCXXtDfUi8m6 ++ qxYeWkcdl3iV + 8YCqoqMBD5VoWzS2ZQshbhrIlWXrV94KDpr2hWbyjmoplcCjhRuIXr2FxvfOs6jtW1R2pJIbSEy1QbD745HBiHwN2Na5qaRYrqmaNqyoKDpzCdRK / eIMpYMxf975mVd2xdI5kj / GBZIlCotjPliVPYUVXjYKvW7xvqZoF1ZxwM23D2QV2tpH4xZlOBCOVX1C5Ba0rU8Awkco4GWRLFEvTFiKPQgY8Fb5qqKoGXy / wVYOva5x / bHoxHhUvOy / xi5OeBhyOyjd431Cxop1TiSwRy0DIPYVM7Rc0zRpft1RVM54a6z2G3wvWKeFG4hdniXNjjqFzNZVrWdV / pFncUVUNIXcMaUNhdOPNOQld4hcXIXzA + ZqqamibW9r2dmx + 4RzmHUv3RwpGyD1DfCCUHrM0lSQLiV + cldwdUFUtVbWkbpY0zYqqWoIftwvLZ5bd4Z1j0d7SLm4pZELuCbkjlYGcB7JpIpD4xUmu8R1 + rI6rGpp6RVMvqeoFvmrxVUVxftqS + 8Ha3YFzNcvqjtbfUSwRSyTmgZS3hBwwm6sRFQeQ + MUbyH1KB3YNddXS1EvqZk1djQ0vqDwwNrx4DNg98fnN4X1L27TUdoO5P5AskXJPSFtyDqQSKZanOUATgcQvjiL2sQ + lw / uKtlrSVEuaekVdL / FVPQp9qn9 / 3JJzL39lc2MbPFdRVzV1u2LhfiGVQEw9KXfT31O68W7 / X5OBxC9eYN3Hw8lbX1FXS9pqFnuD8zXOOcpULDNv8B3 / jU3djasFVbOkuHfkksglkFJPiFtyCRTLFGxKC9BEIPGLn5J85Spat6CuF9TViqZa4P1YIWd + 6nCzN0G89fRUVS1V01It72gtj0lFuSPGbgwY5kGddCV + 8S08nsYvaOsVTbWk8gt8VY / trPy8 / 37aOOdwvqapG2p / w4JCKoGcAzFuiWFDzlFftsR / 3Ywbco7GNayqO5p6PWXkje2obW5rdc6f0XnqekXVrqnX71laGZcGwz1huAeKGnpI / Ncid4d3NZWrWVYrlvUdjV9iDoqfm1VepmvsnMd5T9O8o7l5z9oZoX8g9B + JqcdKxmzeQhQS / 5mv3h1jB9 / K1dR + QV21tH5cwztXYTCd9ON2E8TlD8xUEYijXY8TQSqRHKcYQRooaaDYNBmYKVYg8Z + H4MHRUFPRUPuWxi + p3VQt5 + vd3ruNsXCuORJuNlUU + ga / bql5P1Ye5kBKAzl2pBgoJVBKnF0I3WgS / + kI3mA8vMstxyi9b8dutW7MvGMn + FfckjuzUZx3A3zV4JqWipuxCjFnShlIsSMPHSlsKSWD95oIJP63s / HguOWWpbuhcS3ejYdN4KYMO61gXxIkGKsQq5rKL6l4h1mmlEQMW8L2I3l4mHqhaxKQ + F8Bj2fBkhtuWbr1ZNXdnnV3Evwx5gLvwVV417JY3dD + 4d9QSiBsPhA3Hyg5qv + / xH / AG2666ulaTZdnyq6TZX / bibhqaX / 5B9pf / oEUOlL3iRQ6LAVNBhL / 8yy7w9HQ0O5dDQ0OtztJR2v3U1mBjbsB1fKGanVLQybFnhI6cujJsaekgJUMVlR3IPF / vnL3eGpqGhoWLGhpx9N2qXbWf1 / y4jQnAcNw3lOvbrH1HVVJlJIosSeHjjxsx4kgxWki8Fc9EdTXKniAlpYlSxYsaGioqHaW / 1U / I87EGwCcr6iaBr9YUfMHMpkcw + + gV9Bty90BJAefmoKGT C9R8LMFb2hYsWLJcid4Jzfw4pcFOIfzDXWzwG7uqErGciSHLWl7T + 7uKXOG4ZUUIdWX / wFH933BghUrGpqvWndxPb4fOFxV4Zoat1pRvf + FkhO535C291joxgKkki46RnCR4p / F3tJ + 5tIL8VV8hasq6uUS / 8dfsBjJw5Y8bCh9Rw4dlCLxn + R3N12LvauaLiGegsPj2gWslng3TgQlDWOMYHOPhf5iCpDOTvxz8K2ioqbeBe2WLOXOi4OuDpxzsFjil0v83XvqvxRyCJTtJ / L2nhL6aefgPOME9TmIfQ7WzVtyszu / ZEk9fQRF5MVxbsDpvnIOnMevb3C3t1Rm5GHcMbBuSwkdFsO4hbjrUeAk / uda932x7yfb1NTaexdvNxmUcQfBr2 / xt ++ wnMZS5KGn9FtKt8VSgBzGWMGJFiHVpyb6ee2 + n2E3r9 / 3XXqJXpzGRFDAV / jVDW59i7dMyXlcEgxbSrfB + g4LA1DAVRL / lyKe3fj96Pzs7gtxNvgKX9W45QLjPb5kLEXKsKVs7smfPkDJj0uJaxT / eHRkxZo1N9zQ0Hz2MyHOfyLwUHlc2 + Jvb3B / + gveCmXzify3X7HN / RQfsMsW / xywm / fg16xZsMDj5cKLq8A5B77G / / Jn3J / + Guva + fiR8vFvlBAgx8krsPMV / 7x2n637 / vp9wYKaeq86TsIXVxgrwKBu8X / 5K + 6vf8X3 / ZhH0G0gdNgwQM5jTOFIfQzrQwp + Fvt + hdwcnd9PuCk6 / lmIx4Ah4JZL / HoFVsZ + BMOA9VvKdoOFHsIAMe3qFN5c / LPlrqhYsdqJfc6fV9KNEE + YCIyxzHi5wq / WmL2HkrEUxh2D7RY292OsoDAeyPqCiaB + juDnNfyKFTfc7Nbu87peCPHSZcE4EbimgkULN7fwJ8PlPMUKPmC // QrddpwAnpFL8CTxezwtLWvWLFnu6t + FEEfGOZzzWF3h3AJ3e4f7t / + I9R3lb7 / Bx79DymMl4iHEP0fn5 / X7XBIrhHj7yQBfw + 0d / v17rGTK5gH7 + AHXbcaAYQw / L / 79 / PL5 / T5H57V2F + KElwm + wr3 / A / zxj1iO0HWw3cDmATYbSNM24t7OQb3fnXYuh / 1a / zohxJnECpp2LEv + w3ss51H42w083MN2C0MPKTV1Q / Nfbrllxeqzgpnd80n4PyST3oH79576n874zuG1qtAcT09jMcAs9yWn / + na1f / 67ARjt / cHN52d4HahaXMO3HzM Rc + / + 9pzOHZHqRluPEDVjX / b9DefPce0 / faV5zAef3f82 + 2E4 / H98LiF5xiPZd + D + 91uN5EF8 / vv5bPn3IsTtA22bOH2Fv7851H8v / 5f + PDhf9T / año / + J8n3GZTpD / Af3L / 8UZ + 1F / rHtbv7J68GIkezaiWGfvPr // // nv u // sf / pgF5OQrVH4DKav9gG5eI8pOOKP60 / YSlQfesxH9aJAZ669EZPkfSfsnEzQcNhMR / mmxtoxjJseIq3T0l9hoIif9UrX9gQDfoEew + w / 2v8qok / tPmwe41CIeeVIcNZdhqICT + 06a3nkjQQByQ8Om3qzhBR + K / ABf1vnzSMBxqrR97Yv + ggZD4z4PBOqJFDcQhXP7NXs87IfGfvLWi0JnWqC + l5EjsHhTnk / jPyfE3OtuSkcV60STaP1Cy4icS / 7m5qyQGGzQQz51ASyb1D1hOGgyJ / 8xcVjKDdRT5rM + z + rEna3tP4j9XQhlIJrf1GWafPHTkpLGT + M + USCQwKOX3qdrPidh92jvwUkj853YTY / SlU + DvSYNmk8u / 0VhI / OfNYD1Zpb5P85g2H2X1Jf5LsP7a838KJSfS9qMGQuK / DLZlg + mUop8iPPxGMY2VxH8p1swym6I17A + 9pJIJm79pICT + y2JTPinq / yOr331SUo / Ef3kkC / S500B8y + pbIW7 + roGQ + C / U + pus / 7fIw5asNl0S / 6USLRCV8fdtl78o0CfxXyiFQq8mn78flzSQh057 + xL / Ba9rMfrSk01Brf1RScOGklQBKfFfOInIYFrb7qSfE2nYYKYUaIn / 0l1cKwylJ + tmx8zIaSApj1 / ivxaG0pPU4288gmvYUrLGQuK / EjKJYMPVp / xaScTtB / Xok / ivi75sKVcu / hQ7clSgT + K / Ntff + qvf8w8PyuOX + K + UTb7ewz1S7EmDDuOQ + K / W9e / IVxn4c / T3 / 083gMR / zRgP + foaV + QUiL2ONJP4r5wuP1xZxp8RtmrTJfGLMd // ihp9lJJl9SV + MbMtD1fTuir1D2NSjwy / xK9VPyRLV5Hvb1aIwwNWVNgk8YvRFbbMULYXX + qbY08OKt2V + MVnxDJcdtKPFVLYkpXHL / GLL9bCFomlhwtN + S05E4cNqC23xC ++ EAdzqe8FisOMknpSUOmuxC ++ ylA64kVm / Bmhvwf16JP4xTesv5WLDPxZyUQdwSXxi + / Tlc3FlfoO / SeKOhdJ / OL7ZAsM + XIO9jQrOoJL4hc / pxbHQ / p4Ma5 / HB7I6swr8YufI5WBcAlHezkYNr / qC5X4xVPYpHvOPQE + Dp2O4JL4xVMJZUsq55zxZ4T + A6akHolfPFU6RnfGpb4lBfKwVfWexC + eI / 8hb8mcZ9JPHDbK45f4xfOkD9kiQz6 / NXMpiRg2WNHevsQvnkW2wpC7s0r6MRiP4IqdvkCJX7zIfbZ + Cvydx + LZrJCijuCS + MWLSSUScn82ST + WM7G / 1xcn8YtDMJTteeTGm5FTR9LevsQvDkPIHcniWdj + ofukNl0SvziYQQW26fRdaUtRbbklfnFwi5q3J3 + 4R9 / 9hrJ6JH5x8OV0psuna / 1zSQydGnZI / OIobOLHkw38xU4NOyR + cUTrn + jz6R1rbRhd93d9QRK / OCZdusdOLJoeh3udwiPxi6MLrQTiCTX6MCuE4UGluxK / OL7YjC5vOJXDPXIOYx6 / 9vYlfnH8FXYsPanE03gvQXn8Er94NVIJJ1HqW3IcS3fl8kv84rXsrRFyT37LrTUzchrIcasvROIXr0ksW + Ib9vgbA30bihp2SPzidcmWiW94tJdZIQaV7kr84k3o4 + bNXP8YHtSjT + IXb0UqA + lNAn / K6JP4xRvj2MbXL6aJsSMnNeyQ + MWbEnL36ta / 2 / 6mgZf4xdtjbMKH11tqpJ4YNhp2iV + cAn16IL / Stt / QfwKU1CPxi5Ox / n06fqmvlUgI92rWI / GLk7L + 8YFy5DZfITzoFB6JX5yW3Z / aaOXjpdoWS4Rhq249Er84NQqZIW2PVmST00BKnVx + iV + cIrEMxDIc3rOwMu7tZ3XrkfjFSZJzIOYeO2g03sglEeMGmX2JX5wwIW0PW2lno8sfdequxC9O3PXPHbEMB7TRRhju1aZL4henTjEjpMO56LlEQnjQwEr84hwY0sPBXP + h / 4hpe0 / iF2di / UtmOEDGn1mm7z9oQCV + cU5s40eMl1nsfrhXmy6JX5wbOQ8M6fkRejNjGNSwQ + IXZ0k3/ P3ZUfqYtqQcNIgSvzhHYh6I + XkZf / 3wUf34JX5xrpgZffzEU7f9Uh5IcVBCn8Qvzlj + hNSRn3S0lxHChlLUmVfiF2dNsciQfr7Ut5RESp1cfolfnL / 4CzF1P1mHb6Q0ENWZV + IXl0FM / U9F7sfS3a1cfolfXArZIiF33z3ayxgzA0NUZ16JX1wUQ3yYLLp9y + wTY0fKgwZL4heXRErjnv / 3du + G4aMGSuIXl8e85 / + NpUEeiEkNOyR + cZGEuCV99XAPx7b / 25sd9y0kfnF041 / ohg + / W / enEsbDOITELy6XfvhEKeV3a31ZfYlfXIH1H / aO9S6WGKLadEn84nqs / 5S + G + L2ibn / QuIXZ0vOkZi2WDGGcK88 / iul1hBcH4VCHx7A + zHt1wCncZH4xVUQU0cZivL4JX5xbaS8JaQtrm5wTmZfa35xJRgpB / r4CSs6fFPiF9cjfTNS6ompI5vEL / GLq6GUTEg9ZoWUDn2qr5D4xQmv9ztssvgxdTqYQ + IX17HaL59l9JWSyFltuyR + cfHE1JO / CPINOoVX4heXT / eVmv6cIympg4 / ELy54rR ++ mdTTD08 / 3ENI / OIs1vrGkDffmRh6FfhI / OISKZbG5pz27ekhhq0GSuIXl0ZM / Q8P7hi3 / ZT0I / GLy3H5LY9Wv3w / maeUTNJpPRK / uBxSDuTyEyf2UEip + 12bLyHxi7O0 + oWUh5 / O4ks5UH7iaC8h8YuzcPl / 3pUvJU2He8j6S / zifIWPEUt48hZeSj2mfH + JX5y12SfE7ZNTd3IephiBkn4kfnGWZEuk8py0XSPETr38JX5xrgxp82zrndJWe / 4SvzhHCoWQNs9fMRQjhI0GUuIX50ZIW8xe5rYP4QHU01 / iF + eDYfSHOIKrFGJUvr / EL87I6veYHWarbhjutecv8YtzWe3HtD1YpD6XSFajD4lfnD4pR1KJh9uiNyOELdrzl / jFiRPL8MPS3Sdb / zyQs7b9JH5xsuS5YceBrXTJiZRk / SV + caLY5PKH4zx3Ckr6kfjFSUrfjFSGo6XkljxQcpT1l / jFqVEsE0t3vOcvmZQG5ftL / OLEzD4x90c / divFLZZV6ivxi5MipONn4uUSSFnWX + IXJ0MsA8leo + e + I4R7DbjEL07C4wf69Hpn7eU4kNXjT + IXb08uifjKp + WO / ScNvMQv3prvHcF1LFLcTtt + QuIXb2P1yQz5DUpuzQhRjT4kfvFmxNyBvU3kPQ0bdfiV + MVbYJaJucfeqNNOKZmkRh8Sv3gDq1 / CWLr7VpMPhRi7N5t8hMR / PVA / jMdq2du63TlHbftJ / OL1LO6cx // 23XWsRFLsX9woVEj84ifln0og22lsteXUYyr1lfjFa7j8YxHPqeTXlxTIKSjfX + IXRxebpZNw + R8no0JKPajDr8QvjkvIW8qJCW3M + NOev8Qvjmpl + 3x6e + tWMil2 + oIkfnEshtKf7AEacbh / s2xDIfFfttXHXrV096mUnEg62FPiF0ewrGUg22lvqQ2dSn0lfnF4YeXTz6MveSDpaC + JXxyOVALJAufQNjsOavMl8YsDuvw9pZz + ProBOfbK95f4xSHIlojlPKz + 6Ppncuh0tofEL17u8sdX6sx7MPmTUq + jvSR + 8SI32grRhpPd2 / + m / FOgyPWX + MWLbOhJ5fH / 9PsuiRz7s5u0JH5xKnafWOLJ7 + 1 / c7mSeizL9Zf4xTNcfmPI55svr1JfiV8813JaJNo5r5uNNGxQ2F / if0 + kz + cvnBQ7LOlwD4lf / LzLbJmhXEKJrBGU8Sfxi5 + nK5fTDz / QCA + JX / wcmcxwQeKnFOLwoC9W4hc / tJSlx7gsSxn7eyja85f4xXdWyIVg / cXFxy0nHe0l8YvvkUoglXRxu2OGEYctRdt + Er / 4ikDMCDa8 + RFcR1v6p4BFNfqQ + MXvxWHpTQ / ePPrkViIp9GryKfGLL93iZOnMSnef + hnHo71U6ivxiy9c / liGi8 + DL3EgR5X6SvxiRyYTrL + CSa6QY4dp20 / iF4AZofQndwTX0Sa6sJXrL / GLeb1 / URl9P3L9SyKFTqW + Er + INpC5rtz3NDyo0lfiF5tyfVVvJQ3k2OvLl / ivl2CBZNe5 / k3dB + 35S / zXS2 / Xm ++ eQkfOavQh8V / jzU + cDuO4XmKnRh8S / ZW6 / KW / 2DZ + nyWHrTr8SvxXdtOXuR // da95rSRS2OiGkPivyOW3eLWBvs / Vb + OevynjT + K / ivu9EBmuJqPvh + ORgrb9JP4rcfnJBFNxy0zJiRI7TNt + Ev + F2zmSne8RXEdbBsVB / f0l / kt3 + Y3B5OL + zvrHgZwCyvmV + C / a5Y9y + b82K5LChqLAn8R / qfRF1WzfnBhDB8r4k / gv0rWlMFingfim9S / TwZ5C4r8wOuu0vfcDQvdJe / 4S / 4UZNQrbIqv2Y / eojLX + Quk / FAYbMFn9nyJuP + poL4n / Utb6prX + U8YrKuNP4r8QkkUiCe1hP2HM + nuNl8R // gRT6e5TyXGgJOVDSPznfBNbIqK966diOU3bfrL + Ev853sAYEZXuPnf0ShjU6EPiP9Pbdzp1V1H + 51HSQNGpvhL / Wbr8JCK6eZ89eZZMCr2O9pL4z89tDSWQla32MuuvHn8S / ZM6 / D3a23 + 56x / JsdfSSeI / HyKRjCzWQZZP / YO6 / Ej850PHVoNwKPGHnhK15y / xn8PNSiKYAn0HXESRth81DBL / 6bO1rVJTDu76byhq9CHxn7bVz / Tq0XcU0vaTBkHiP116G2T1jyb + ByyrRkLiP0mrXwgMoG2p46z8Sx7z / Z3TYEj8p4PDMZRB / fiPK39yt8GCIv + HotYQvJwtf6djoJABWaZjUWJPf / + rBuJA / H + jKTMTSljzGAAAAABJRU5ErkJggg =="
                      id="imagen"
                    />
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
                      {{tipo_comprobante}}
                      <br />
                      {{serie_comprobante}}-{{num_comprobante}}
                      <br />
                      {{fecha}}
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
                            <strong>Sr(a). {{persona.nombre}}</strong>
                            <br />
                            <strong>Documento:</strong>
                            {{persona.num_documento}}
                            <br />
                            <strong>Dirección:</strong>
                            {{persona.direccion}}
                            <br />
                            <strong>Teléfono:</strong>
                            {{persona.telefono}}
                            <br />
                            <strong>Email:</strong>
                            {{persona.email}}
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
                          <td style="text-align:center;">{{det.cantidad}}</td>
                          <td>{{det.articulo}}</td>
                          <td style="text-align:right;">{{det.precio}}</td>
                          <td style="text-align:right;">{{det.descuento}}</td>
                          <td style="text-align:right;">{{(det.cantidad*det.precio)-det.descuento}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th style="text-align:right;">SUBTOTAL</th>
                          <th
                            style="text-align:right;"
                          >$ {{totalParcial=(total-totalImpuesto).toFixed(2)}}</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th style="text-align:right;">IVA({{impuesto}}%)</th>
                          <th
                            style="text-align:right;"
                          >$ {{totalImpuesto=((total*impuesto)/(1+impuesto)).toFixed(2)}}</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th style="text-align:right;">TOTAL</th>
                          <th style="text-align:right;">$ {{total=calcularTotal}}</th>
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
              <v-btn @click="ocultarComprobante()" color="blue darken-1" flat>Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="ventas"
        :search="search"
        class="elevation-1"
        v-if="verNuevo==0"
      >
        <template v-slot:item.opciones="{ item }">
          <v-icon small class="mr-2" @click="verIngreso(item)">tab</v-icon>
          <v-icon small class="mr-2" @click="mostrarComprobante(item)">print</v-icon>
          <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2,item)">block</v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1,item)">check</v-icon>
          </template>
        </template>
        <template v-slot:item.estado="{ item }">
          <div v-if="item.estado">
            <span class="blue--text">Aceptado</span>
          </div>
          <div v-else>
            <span class="red--text">Anulado</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-select v-model="tipo_comprobante" :items="comprobantes" label="Tipo Comprobante"></v-select>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="serie_comprobante" label="Serie Comprobante"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="num_comprobante" label="Número Comprobante"></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-autocomplete :items="personas" v-model="persona" label="Cliente"></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field type="number" v-model="impuesto" label="Impuesto"></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 md8 lg8 x8>
            <v-text-field v-model="codigo" label="Código" @keyup.enter="buscarCodigo()"></v-text-field>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="teal" @click="mostrarModalArticulos()">
              <v-icon dark>list</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2 v-show="errorArticulo">
            <div class="red--text" v-text="errorArticulo"></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <template>
              <v-data-table
                :headers="cabeceraDetalles"
                :items="detalles"
                hide-actions
                class="elevation-1"
              >
                <template v-slot:item.borrar="{ item }">
                  <v-icon small class="mr-2" @click="eliminarDetalle(detalles,item)">delete</v-icon>
                </template>
                <template v-slot:item.articulo="{ item }">
                  <div class="text-xs-center">{{ item.articulo }}</div>
                </template>
                <template v-slot:item.cantidad="{ item }">
                  <div class="text-xs-center">
                    <v-text-field v-model="item.cantidad" type="number"></v-text-field>
                  </div>
                </template>
                <template v-slot:item.precio="{ item }">
                  <div class="text-xs-center">
                    <v-text-field v-model="item.precio" type="number"></v-text-field>
                  </div>
                </template>
                <template v-slot:item.descuento="{ item }">
                  <div class="text-xs-center">
                    <v-text-field v-model="item.descuento" type="number"></v-text-field>
                  </div>
                </template>
                <template v-slot:item.subtotal="{ item }">
                  <div
                    class="text-xs-right"
                  >$ {{ (item.cantidad * item.precio)-item.descuento}}</div>
                </template>
                <template slot="no-data">
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
              <v-flex class="text-xs-right">
                <strong>Total Parcial:</strong>
                $
                {{totalParcial=(total-totalImpuesto).toFixed(2)}}
              </v-flex>
              <v-flex class="text-xs-right">
                <strong>Total Impuesto:</strong>
                $
                {{totalImpuesto=((total*impuesto)/(1+impuesto)).toFixed(2)}}
              </v-flex>
              <v-flex class="text-xs-right">
                <strong>Total Neto:</strong>
                $ {{total=calcularTotal}}
              </v-flex>
            </template>
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="blue darken-1" flat @click.native="ocultarNuevo()">Cancelar</v-btn>
            <v-btn color="success" v-if="verDetalle==0" @click.native="guardar()">Guardar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      dialog: false,
      search: "",
      ventas: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Usuario", value: "usuario.nombre", sortable: true },
        { text: "Cliente", value: "persona.nombre", sortable: true },
        { text: "Tipo Comprobante", value: "tipo_comprobante", sortable: true },
        {
          text: "Serie comprobante",
          value: "serie_comprobante",
          sortable: false
        },
        {
          text: "Número comprobante",
          value: "num_comprobante",
          sortable: false
        },
        { text: "Fecha", value: "createdAt", sortable: false },
        { text: "Impuesto", value: "impuesto", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: false }
      ],
      _id: "",
      persona: "",
      personas: [],
      tipo_comprobante: "",
      comprobantes: ["BOLETA", "FACTURA", "TICKET", "GUIA"],
      serie_comprobante: "",
      num_comprobante: "",
      impuesto: 0.18,
      codigo: "",
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "articulo", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false }
      ],
      detalles: [],
      verNuevo: 0,
      errorArticulo: null,
      total: 0,
      totalParcial: 0,
      totalImpuesto: 0,
      articulos: [],
      texto: "",
      cabeceraArticulos: [
        { text: "Seleccionar", value: "seleccionar", sortable: false },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: true },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Precio Venta", value: "precio_venta", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false }
      ],
      verDetalle: 0,
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
      comprobanteModal: 0,
      fecha: null
    };
  },
  computed: {
    calcularTotal: function() {
      let resultado = 0.0;
      for (var i = 0; i < this.detalles.length; i++) {
        resultado =
          resultado +
          (this.detalles[i].cantidad * this.detalles[i].precio -
            this.detalles[i].descuento);
      }
      return resultado;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.listar();
    this.selectPersona();
  },
  methods: {
    crearPDF() {
      var quotes = document.getElementById("factura");
      html2canvas(quotes).then(function(canvas) {
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
    mostrarComprobante(item) {
      this.limpiar();
      this.tipo_comprobante = item.tipo_comprobante;
      this.serie_comprobante = item.serie_comprobante;
      this.num_comprobante = item.num_comprobante;
      this.fecha = item.createdAt;
      this.persona = item.persona;
      this.impuesto = item.impuesto;
      this.listarDetalles(item._id);
      this.comprobanteModal = 1;
    },
    ocultarComprobante() {
      this.comprobanteModal = 0;
    },
    selectPersona() {
      let me = this;
      let personaArray = [];
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("persona/listClientes", configuracion)
        .then(function(response) {
          personaArray = response.data;
          personaArray.map(function(x) {
            me.personas.push({ text: x.nombre, value: x._id });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buscarCodigo() {
      let me = this;
      me.errorArticulo = null;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/queryCodigo?codigo=" + this.codigo, configuracion)
        .then(function(response) {
          me.agregarDetalle(response.data);
        })
        .catch(function(error) {
          me.errorArticulo = "No existe el artículo.";
        });
    },
    agregarDetalle(data) {
      this.errorArticulo = null;
      if (this.encuentra(data._id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
      } else {
        this.detalles.push({
          _id: data._id,
          articulo: data.nombre,
          cantidad: 1,
          precio: data.precio_venta,
          descuento: 0
        });
        this.codigo = "";
      }
    },
    encuentra(id) {
      let sw = 0;
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.detalles[i]._id == id) {
          sw = true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr, item) {
      let i = arr.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
    },
    listarArticulos() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/list?valor=" + this.texto, configuracion)
        .then(function(response) {
          me.articulos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    mostrarModalArticulos() {
      this.dialog = 1;
    },
    listarDetalles(id) {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("venta/query?_id=" + id, configuracion)
        .then(function(response) {
          me.detalles = response.data.detalles;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    verIngreso(item) {
      this.limpiar();
      this.tipo_comprobante = item.tipo_comprobante;
      this.serie_comprobante = item.serie_comprobante;
      this.num_comprobante = item.num_comprobante;
      this.persona = item.persona._id;
      this.impuesto = item.impuesto;
      this.listarDetalles(item._id);
      this.verNuevo = 1;
      this.verDetalle = 1;
    },
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("venta/list", configuracion)
        .then(function(response) {
          me.ventas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this._id = "";
      this.tipo_comprobante = "";
      this.serie_comprobante = "";
      this.num_comprobante = "";
      this.impuesto = 0.18;
      this.codigo = "";
      this.total = 0;
      this.totalParcial = 0;
      this.totalImpuesto = 0;
      this.detalles = [];
      this.verNuevo = 0;
      this.valida = 0;
      this.validaMensaje = [];
      this.verDetalle = 0;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.persona) {
        this.validaMensaje.push("Seleccione un cliente.");
      }
      if (!this.tipo_comprobante) {
        this.validaMensaje.push("Seleccione un tipo de comprobante.");
      }
      if (!this.num_comprobante) {
        this.validaMensaje.push("Ingrese el número del comprobante.");
      }
      if (!this.impuesto || this.impuesto < 0 || this.impuesto > 1) {
        this.validaMensaje.push("Ingrese un impuesto válido.");
      }
      if (this.detalles.length <= 0) {
        this.validaMensaje.push("Ingrese al menos un artículo al detalle");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    mostrarNuevo() {
      this.verNuevo = 1;
    },
    ocultarNuevo() {
      this.verNuevo = 0;
      this.limpiar();
    },
    guardar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      //Código para guardar
      axios
        .post(
          "venta/add",
          {
            persona: this.persona,
            usuario: this.$store.state.usuario._id,
            tipo_comprobante: this.tipo_comprobante,
            serie_comprobante: this.serie_comprobante,
            num_comprobante: this.num_comprobante,
            impuesto: this.impuesto,
            total: this.total,
            detalles: this.detalles
          },
          configuracion
        )
        .then(function(response) {
          swal({
              title: "Buen trabajo!",
              text: "Venta agregada exitosamente",
              icon: "success"
            });
          me.limpiar();
          me.close();
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.num_comprobante;
      this.adId = item._id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/activate", { _id: this.adId }, configuracion)
        .then(function(response) {
          swal({
              title: "Buen trabajo!",
              text: "Venta activada exitosamente",
              icon: "success"
            });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/deactivate", { _id: this.adId }, configuracion)
        .then(function(response) {
          swal({
              title: "Buen trabajo!",
              text: "Venta desactivada exitosamente",
              icon: "success"
            });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    }
  }
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