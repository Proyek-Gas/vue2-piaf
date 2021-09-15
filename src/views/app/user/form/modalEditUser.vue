<template>
    <b-modal :id="reference" :ref="reference" title="Edit User" modal-class="modal-right">
        <div v-if="isLoad">
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
        </b-form>
        </div>
        <div v-else>
            <div class="loading"></div>  
        </div>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit('modalright3');" class="av-tooltip">
                    <b-button type="submit" variant="primary" style="width: 100%">Edit</b-button>
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
            reference: ""
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
    },
    watch:{
    },
    methods: {
        loadField(params){
            console.log(params);
            this.fetchUser(params.id);
            this.reference = "modalrightEdit-"+params.id;
            console.log(this.reference);
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(this.currentUser.role == 2){
                if(!this.$v.$invalid && !this.submit){
                    this.submit = true;
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
                                    updateUser(param:{
                                        name:"${this.nama}"
                                        email:"${this.email}"
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
            this.nama = this.detail[0].name;
            this.email = this.detail[0].email;
            this.$v.$reset();
        },
        fetchUser(val){
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
                console.log(this.detail);
                this.nama = this.detail[0].name;
                this.email = this.detail[0].email;
                this.isLoad = true;
            })
        }
    },
    async mounted(){
        console.log(this.currentUser);
        
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",

        }),
        hasImage() {
            return !!this.image;
        }
        
    }
};
</script>