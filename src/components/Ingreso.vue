<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar text color="white">
                <v-toolbar-title>Ingresos</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-if="verNuevo==0" @click="mostrarNuevo()" dark class="mb-2">Nuevo</v-btn>
                <!--Modal agregar o editar artículo-->
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>            
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    
                                </v-layout>
                            </v-container>
                        </v-card-text>            
                        <v-card-actions>
                            <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!--Modal activar o desactivar-->
                <v-dialog v-model="adModal" max-width="290">
                    <v-card>
                        <v-card-title class="headline" v-if="adAccion==1">
                            Activar Item
                        </v-card-title>
                        <v-card-title class="headline" v-if="adAccion==2">
                            Desactivar Item
                        </v-card-title>
                        <v-card-text>
                            Estás a punto de <span v-if="adAccion==1">activar </span>
                            <span v-if="adAccion==2">desactivar </span> el item {{adNombre}}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="activarDesactivarCerrar()" color="green darken-1" text="text">
                                Cancelar
                            </v-btn>
                            <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-4" text="text">
                                Activar
                            </v-btn>
                            <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-4" text="text">
                                Desactivar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="ingresos"
                :search="search"
                class="elevation-1"
                v-if="verNuevo==0"
            >
            
                    <template v-slot:item.opciones="{item}">
                        <div v-if="item.estado">
                            <v-icon small @click="activarDesactivarMostrar(2,item)">block</v-icon>
                        </div>
                        <div v-else>
                            <v-icon small @click="activarDesactivarMostrar(1,item)">check</v-icon>
                        </div>
                    </template>
                    <template v-slot:items="props">
                        <td>{{ props.item.usuario.nombre }}</td>
                        <td>{{ props.item.persona.nombre }}</td>
                        <td>{{ props.item.tipo_comprobante }}</td>
                        <td>{{ props.item.serie_comprobante }}</td>
                        <td>{{ props.item.num_comprobante }}</td>
                        <td>{{ props.item.createdAT }}</td>
                        <td>{{ props.item.impuesto }}</td>
                        <td>{{ props.item.total }}</td>
                    </template>
                    <template v-slot:item.estado="{item}">
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
                    <v-flex xs12 sm4 md4 lg4 x14>
                        <v-select v-model="tipo_comprobante" :items="comprobantes" label="Tipo Comprobante">

                        </v-select>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 x14>
                        <v-text-field v-model="serie_comprobante" label="Serie Comprobante">

                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 x14>
                        <v-text-field v-model="num_comprobante" label="Número Comprobante">

                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm8 md8 lg8 x18>
                        <v-autocomplete v-model="persona" :items="personas" label="Proveedor">
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 x14>
                        <v-text-field type="number" v-model="impuesto" label="Impuesto">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm8 md8 lg8 x18>
                        <v-text-field v-model="codigo" label="Buscar por código de barra" @keyup.enter="buscarCodigo()">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm2 md2 lg2 x12>
                        <v-btn small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm2 md2 lg2 x12 v-show="errorArticulo">
                        <div class="red--text" v-text="errorArticulo">

                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <template>
                            <v-data-table 
                                :headers="cabeceraDetalles"
                                :items="detalles"
                                hide-actions
                                class="elevation-1"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>
                                        <v-icon
                                        small
                                        class="mr-2"
                                        @click="eliminarDetalle(detalles, props.item)"
                                        >
                                        delete
                                        </v-icon>
                                    </td>
                                    <td class="text-xs-center">{{ props.item.articulo }}</td>
                                    <td class="text-xs-center">{{ props.item.cantidad }}</td>
                                    <td class="text-xs-center">{{ props.item.precio }}</td>
                                    <td class="text-xs-center">{{ props.item.cantidad * props.item.precio}}</td>
                                </template>
                                <template slot="no-data">
                                    <h3>No hay artículos agregados al detalle.</h3>
                                </template>
                            </v-data-table>
                        </template>
                    </v-flex>
                    <v-flex xs12 sm12 md12 v-show="valida">
                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-btn color="blue darken-1" flat @click.native="ocultarNuevo()">Cancelar</v-btn>
                        <v-btn color="success" @click.native="guardar()">Guardar</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                dialog: false,
                search:'',
                ingresos:[],
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Usuario', value: 'usuario.nombre', sortable: true },
                    { text: 'Proveedor', value: 'persona.nombre', sortable: true },
                    { text: 'Tipo Comprobante', value: 'tipo_comprobante', sortable: true },
                    { text: 'Serie Comprobante', value: 'serie_comprobante', sortable: false },
                    { text: 'Número Comprobante', value: 'num_comprobante', sortable: false },
                    { text: 'Fecha', value: 'createdAt', sortable: false },
                    { text: 'Impuesto', value: 'impuesto', sortable: false },
                    { text: 'Total', value: 'total', sortable: false },
                    { text: 'Estado', value: 'estado', sortable: false },
                ],
                editedIndex: -1,
                _id:'',
                persona:'',
                personas:[],
                tipo_comprobante:'',
                comprobantes:['Boleta', 'Factura', 'Ticket', 'Guia'],
                serie_comprobante:'',
                num_comprobante:'',
                impuesto: 18,
                codigo:'',
                cabeceraDetalles:[
                    { text: 'Borrar', value: 'borrar', sortable: false },
                    { text: 'Artículo', value: 'articulo', sortable: false },
                    { text: 'Cantidad', value: 'cantidad', sortable: false },
                    { text: 'Precio', value: 'precio', sortable: false },
                    { text: 'Sub Total', value: 'subtotal', sortable: false }
                ],
                detalles:[],
                verNuevo:0,
                errorArticulo:null,
                valida:0,
                validaMensaje:[],
                adModal:0,
                adAccion:0,
                adNombre:'',
                adId:''
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            }
        },
        watch: {
            dialog (val) {
            val || this.close()
            }
        },
        created () {
            this.listar(),
            this.selectPersona();
        },
        methods: {
            selectPersona(){
                let me=this;
                let personaArray=[];
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};            
                axios.get('persona/listProveedores',configuracion).then(function (response){
                    personaArray=response.data;
                    personaArray.map(function(x){
                        me.personas.push({text:x.nombre, value:x._id})
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            buscarCodigo(){
                let me=this;
                me.errorArticulo=null;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};            
                axios.get('articulo/queryCodigo?codigo='+this.codigo,configuracion).then(function (response){
                    me.agregarDetalle(response.data)
                }).catch(function(error){
                    me.errorArticulo='No exíste el artículo';
                });

            },
            agregarDetalle(data){
                this.errorArticulo=null;
                if(this.encuentra(data._id)==true){
                    this.errorArticulo='El artículo ya ha sido agregado.';
                }
                else{
                    this.detalles.push(
                        {
                            _id:data._id,
                            articulo:data.nombre,
                            cantidad:1,
                            precio:data.precio_venta
                        }
                    );
                }
            },
            encuentra(id){
                let sw=0;
                for (var i=0;i<this.detalles.length; i++){
                    if(this.detalles[i]._id==id){
                        sw=true;
                    }
                }
                return sw;
            },
            eliminarDetalle(arr, item){
                let i=arr.indexOf(item);
                if (i!= -1){
                    arr.splice(i,1);
                }
            },
            listar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};            
                axios.get('ingreso/list',configuracion).then(function (response){
                    me.ingresos=response.data;
                }).catch(function(error){
                    console.log(error);
                });

            },
            limpiar(){
                this._id='';
                this.nombre='';
                this.codigo='',
                this.stock=0,
                this.precio_venta=0,
                this.descripcion='';
                this.valida=0;
                this.validaMensaje=[];
                this.editedIndex=-1;
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];
                if(!this.categoria){
                    this.validaMensaje.push('Seleccione una categoría');
                }
                if(this.codigo.length>64){
                    this.validaMensaje.push('El código no debe tener más de 64 caracteres');
                }
                if(this.nombre.length<1 || this.nombre.length>50){
                    this.validaMensaje.push('El nombre del artículo debe tener entre 1-50 caracteres.');
                }
                if(this.descripcion.length>255){
                    this.validaMensaje.push('La descripción del artículo no debe tener más de 255 caracteres.');
                }
                if(this.stock<0){
                    this.validaMensaje.push('Ingrese un stock valido');
                }
                if(this.precio_venta<0){
                    this.validaMensaje.push('Ingrese un precio de venta valido');
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            mostrarNuevo(){
                this.verNuevo=1;
            },
            ocultarNuevo(){
                this.verNuevo=0;
            },
            guardar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                if (this.validar()){
                    return;
                }
                if (this.editedIndex >-1){
                    //Código para editar
                    axios.put('articulo/update',{'_id':this._id,'categoria':this.categoria,'codigo':this.codigo,'nombre':this.nombre,'stock':this.stock,'precio_venta':this.precio_venta,'descripcion':this.descripcion
                    },configuracion)
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }else{
                    //Código para guardar
                    axios.post('articulo/add',{'categoria':this.categoria,'codigo':this.codigo,'nombre':this.nombre,'stock':this.stock,'precio_venta':this.precio_venta,'descripcion':this.descripcion
                    },configuracion)
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
            },
            editItem (item) {
                this._id=item._id;
                this.categoria=item.categoria._id;
                this.codigo=item.codigo;
                this.nombre=item.nombre;
                this.stock=item.stock;
                this.precio_venta=item.precio_venta;
                this.descripcion=item.descripcion;
                this.dialog = true;
                this.editedIndex=1;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item._id;
                if (accion==1){
                    this.adAccion=1;
                } else if(accion==2){
                    this.adAccion=2;
                } else{
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
            activar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('articulo/activate',{'_id':this.adId},configuracion)
                    .then(function(response){
                        me.adModal=0;
                        me.adAccion=0;
                        me.adNombre='';
                        me.adId='';
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            desactivar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('articulo/deactivate',{'_id':this.adId},configuracion)
                    .then(function(response){
                        me.adModal=0;
                        me.adAccion=0;
                        me.adNombre='';
                        me.adId='';
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            close () {
                this.dialog = false;
            }
        }
    }
</script>