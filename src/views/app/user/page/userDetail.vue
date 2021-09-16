<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>User Detail</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xxs="12" xl="8" class="col-left">
            <b-row>
                <b-colxx md="6" sm="12" lg="4" xxs="12">
                <b-card class="mb-4 text-center" style="height: 265px;">
                    <img
                        src="/assets/img/profiles/l-1.jpg"
                        alt="Card image cap"
                        style="width: 150px; height: 150px;"
                        class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4 mt-4"
                    />
                </b-card>
                </b-colxx>
                <b-colxx xxs="12" sm="12" md="6" lg="8" class="mb-3">
                    <b-card class="mb-4" no-body>
                    <div class="m-3">
                    <b-nav pills class="justify-content-center">
                        <b-nav-item active>Liter</b-nav-item>
                        <b-nav-item>Rupiah</b-nav-item>
                    </b-nav>
                    </div>
                    </b-card>
                    <b-row class="icon-cards-row mb-0">
                        <b-colxx xxs="12" sm="12" md="12" lg="12">
                        <b-card class="mb-0 text-center" style="height: 185px;">
                            
                        </b-card>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>
            <b-card class="mb-4" no-body>
                <b-tabs card no-fade>
                    <b-tab :title="$t('menu.quoteTable')" active>
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                    
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                    <b-tab :title="`${$t('pages.comments-title')} (19)`">

                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                    <b-tab :title="`${$t('pages.questions-title')} (6)`">
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-colxx>
        <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4">
                <b-card-title>Details
                <div class="top-right-button-container">
                    <b-button
                        class="glyph-icon simple-icon-pencil"
                        v-b-modal.modalright
                        variant="warning"
                        size="sm"
                        @click="update"
                        >
                    </b-button>
                </div>
                </b-card-title>
                <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <p class="text text-medium mb-2">Nama</p>
                <b-form-group>
                    <b-form-input class="mb-2" type="text" v-model="$v.nama.$model" :state="!$v.nama.$error" placeholder="Masukkan nama" :disabled="edit == 0"/>  
                    <b-form-invalid-feedback v-if="!$v.nama.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.nama.minLength || !$v.nama.maxLength">Panjang nama antara 3-50 katakter</b-form-invalid-feedback>
                </b-form-group>
                <p class="text text-medium mb-2">Email</p>
                <b-form-group>
                    <b-form-input class="mb-2" type="text" v-model="$v.email.$model" :state="!$v.nama.$error" placeholder="Masukkan email" :disabled="edit == 0"/>  
                    <b-form-invalid-feedback v-if="!$v.email.email">Struktur email tidak valid</b-form-invalid-feedback>
                </b-form-group>
                <p class="text text-medium mb-2">Phone</p> 
                <p class="mb-3">{{ phone }}</p>
                <p class="text text-medium mb-2">Role</p> 
                <p class="mb-3">{{ role }}</p>
                </b-form>
                <b-row v-if="edit == 1">
                    <b-colxx xxs="6" class="text-center">
                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                        <b-button type="submit" variant="primary" style="width: 100%">Edit</b-button>
                    </b-form>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-center">
                    <b-button @click="onFormReset" type="submit" variant="danger" style="width: 100%">Reset</b-button>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
    </b-row>
    
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import {mapGetters} from 'vuex'

import {
    validationMixin
} from "vuelidate";

const {
    required,
    maxLength,
    minLength,
    alpha,
    email,
    numeric,
    maxValue,
    minValue,
    helpers
} = require("vuelidate/lib/validators");

export default {
    components: {
        'icon-card': IconCard,
    },
    computed :{
      ...mapGetters({
        currentUser: "currentUser",
      })
    },
    data() {
        return {
            isLoad: false,
            submit: false,
            userId: "",
            edit: 0,
            nama: "",
            email: "",
            phone: "",
            role: ""
        }
    },
    mixins: [validationMixin],
    validations: {
        nama: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },
        email: {
            email
        },
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid && !this.submit){
                this.submit = true;
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+this.currentUser.jwt
                    },
                    body: JSON.stringify({
                        query: `
                            mutation{
                                updateUser(param:{
                                    name:"${this.nama}"
                                    email: "${this.email}"
                                }){
                                    status
                                    message
                                }
                            }
                        `,
                    }),
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(text) {
                    return text.data.updateUser;
                    
                })
                .then(resp => {
                    if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        this.edit = 0;
                        //this.$root.$emit('userDetail');
                    }else{
                        this.$toast(resp.message, {
                            type: "error",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                    }
                });
            }else{
                console.log("error");
            }
        },
        update(){
            this.edit = 1;
        },
        onFormReset(){
            this.nama = this.detail[0].name;
            this.email = this.detail[0].email;
            this.$v.$reset();
        },
        fetchDetail(val, a){
            this.isLoad = false;
            let bearer;
            if(a != ""){
                bearer = 'Bearer '+a;

            }else{
                bearer = 'Bearer '+this.currentUser.jwt;
            }
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                            users(filter:{
                                id: ${val}
                            }){
                                count
                                users{
                                    id
                                    name
                                    email
                                    phone
                                    role{
                                        name
                                    }
                                }
                            }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.users.users;
            })
            .then(resp => {
                this.detail = resp
                this.nama = this.detail[0].name;
                this.email = this.detail[0].email;
                this.phone = this.detail[0].phone;
                this.role = this.detail[0].role.name;
                this.isLoad = true;
            })
        }
    },
    async mounted() {
        this.userId = this.$route.query.id;
        this.fetchDetail(this.userId, "");
        // this.$root.$on('userDetail', () => {
        //     this.fetchDetail(this.userId, "");
        // });
    }
}
</script>
