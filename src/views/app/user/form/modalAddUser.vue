<template>
<b-modal id="modalrightAdd" ref="modalrightAdd" title="Add User" modal-class="modal-right">
    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
        <b-form-group label-cols="3" horizontal label="Nama">
            <b-form-input type="text" v-model="$v.nama.$model" :state="!$v.nama.$error" placeholder="Masukkan nama" />
            <b-form-invalid-feedback v-if="!$v.nama.required">Harap isi nama</b-form-invalid-feedback>
            <b-form-invalid-feedback v-else-if="!$v.nama.minLength || !$v.nama.maxLength">Panjang nama 3-50 karakter</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-cols="3" horizontal label="Email">
            <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" placeholder="Masukkan email"/>
            <b-form-invalid-feedback v-if="!$v.email.email">Struktur email tidak valid</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-cols="3" horizontal label="Password">
            <b-form-input type="password" v-model="$v.password.$model" :state="!$v.password.$error" placeholder="Masukkan password"/>
            <password v-if="$v.password.$model != ''" v-model="$v.password.$model" :strength-meter-only="true"/>
            <b-form-invalid-feedback v-if="!$v.password.required">Harap isi password</b-form-invalid-feedback>
            <b-form-invalid-feedback v-else-if="!$v.password.minLength || !$v.password.maxLength">Panjang nama 8-20 karakter</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-cols="3" horizontal label="Handphone">
            <b-form-input type="text" v-model="$v.hp.$model" :state="!$v.hp.$error" placeholder="Masukkan nomor handphone aktif"/>
                <b-form-invalid-feedback v-if="!$v.hp.required">Harap isi nomor handphone</b-form-invalid-feedback>
            <b-form-invalid-feedback v-else-if="!$v.hp.numeric">Nomor handphone hanya angka</b-form-invalid-feedback>
            <b-form-invalid-feedback v-else-if="!$v.hp.minLength || !$v.hp.maxLength">Panjang nomor handphone antara 10-13 katakter</b-form-invalid-feedback>
        </b-form-group>
    </b-form>   
    <template slot="modal-footer">
    <b-row>
        <b-colxx xxs="6" class="text-center">
            <b-form @submit.prevent="onValitadeFormSubmit('modalright');" class="av-tooltip">
                <b-button type="submit" variant="primary" style="width: 100%">Add</b-button>
            </b-form>
        </b-colxx>
        <b-colxx xxs="6" class="text-center">
            <b-button @click="onFormReset()" type="submit" variant="danger" style="width: 100%">Reset</b-button>
        </b-colxx>
        </b-row>
    </template>
</b-modal>
</template>

<script>
import Password from 'vue-password-strength-meter'
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import { mapGetters } from "vuex";


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
    helpers,
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)
const phone = helpers.regex('numeric', /^(09)[0-9]{9}/);

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        Password
    },
    data() {
        return {
            isLoad: false,
            detail: [],
            submit: false,
            nama: "",
            email: "",
            password: "",
            hp: "",
        };
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
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20),
        },
        hp:{
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(13),
        },
    },
    watch:{
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(this.currentUser.role == 2){
                if(!this.$v.$invalid){
                    console.log("valid");
                    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+this.currentUser.jwt
                        },
                        body: JSON.stringify({
                            query: `
                                mutation{
                                    register(params:{
                                        name:"${this.nama}"
                                        email:"${this.email}"
                                        phone:"${this.hp}"
                                        password:"${this.password}"
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
                        return text.data.register;
                    })
                    .then(resp => {
                        if(resp.status.toLowerCase() == "success"){
                            this.$toast(resp.message, {
                                type: "success",
                                hideProgressBar: true,
                                timeout: 2000
                            });
                            setTimeout(() => {
                                window.location = window.location.origin+"/app/datatable/userTable";
                            }, 1000);
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
            }else{
                this.$toast("Harap login sebagai manager", {
                    type: "error",
                    hideProgressBar: true,
                    timeout: 2000
                });
            }
        },
        onFormReset(){
            this.nama= "";this.email= "";this.password= "";this.hp= "";
            this.$v.$reset();
        },
    },
    async mounted(){
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",

        })       
    }
};
</script>