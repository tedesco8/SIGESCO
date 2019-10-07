<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                    Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ingresar(){
            axios.post('usuario/login',{email: this.email, password: this.password})
            .then(function(response){
                console.log(response.data.user);
                console.log(response.data.tokenReturn);
            }).catch(function(error){
                console.log(error);
            });
        }
    }
}
</script>