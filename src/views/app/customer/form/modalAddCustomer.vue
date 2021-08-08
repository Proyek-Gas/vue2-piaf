<template>
    <b-modal id="modalright" ref="modalright" title="Add Customer" modal-class="modal-right">
        <b-form @submit.prevent="onValitadeFormSubmit2" class="av-tooltip tooltip-label-right">
            <b-form-group label-cols="3" horizontal label="Kode">
                <b-form-input type="text" v-model="$v.kode.$model" :state="!$v.kode.$error" placeholder="Masukkan kode" />
                <b-form-invalid-feedback v-if="!$v.kode.required">Harap isi kode</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.kode.maxLength">Panjang maksimal 10 karakter</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label-cols="3" horizontal label="Nama">
                <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" placeholder="Masukkan nama" />
                <b-form-invalid-feedback v-if="!$v.name.required">Harap isi nama</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.name.minLength || !$v.name.maxLength">Panjang nama 3-50 karakter</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label-cols="3" horizontal label="Kategori">
                <v-select v-model="kategori" :options="kategoriOption" :reduce="kategoriOption => kategoriOption.name" label="name" placeholder="Pilih kategori"/>
            </b-form-group>

            <b-form-group label-cols="3" horizontal label="Kategori Harga">
                <v-select v-model="katHarga" :options="katHargaOption" :reduce="katHargaOption => katHargaOption.name" label="name" placeholder="Pilih kategori harga"/>
            </b-form-group>

            <b-form-group label-cols="3" horizontal label="Limit Piutang" >
                <b-form-input type="text" v-model="$v.limit.$model" :state="!$v.limit.$error" placeholder="Rp"/>
                <b-form-invalid-feedback v-if="!$v.limit.numeric">Limit berupa angka</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.limit.minLength || !$v.limit.maxLength">Panjang nama 6-12 karakter</b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit2('modalright');" class="av-tooltip">
                    <b-button @click="passingData();$emit('answers', dataReturn);" type="submit" variant="primary" style="width: 100%">Add</b-button>
                </b-form>
            </b-colxx>
            <b-colxx xxs="6" class="text-center">
                <b-button @click="$emit('answers',null);onFormReset2()" type="submit" variant="danger" style="width: 100%">Reset</b-button>
            </b-colxx>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection, setThemeRadius } from "../../../../utils";
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
        "v-select": vSelect,
    },
    computed : {
      ...mapGetters({
        currentUser : 'currentUser'
      })
    },
    data() {
        return {
            isLoad: false,
            isLoad2: false,
            isLoad3: false,

            dataReturn:{
                tmpId: "",
                tmpNama: ""
            },
            id:"",
            name: "",
            kode: "",
            kategori: "",
            katHarga: "",
            limit: "",

            kategoriOption: [],
            katHargaOption: []
        };
    },
    mixins: [validationMixin],
    validations: {
        kode: {
            required,
            maxLength: maxLength(10),
        },
        name: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },
        limit: {
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(12),
        }
    },
    methods: {
        passingData(){
            if(!this.$v.kode.$invalid && !this.$v.name.$invalid && !this.$v.limit.$invalid){
                this.dataReturn.tmpNama = this.name;
                this.dataReturn.tmpId = this.id;
            }
        },
        onValitadeFormSubmit2(refname) {
            this.$v.kode.$touch();
            this.$v.name.$touch();
            this.$v.limit.$touch();
            if(!this.$v.kode.$invalid && !this.$v.name.$invalid && !this.$v.limit.$invalid){
                console.log("valid");
                let floatLimit = 0;
                if(this.limit != ''){
                    floatLimit = parseFloat(this.limit);
                }else{
                    floatLimit = 0;
                }
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                     'Authorization' :'Bearer '+this.currentUser.jwt
                    },
                    body: JSON.stringify({
                        query: `
                            mutation{
                                addCustomerDB(params:{
                                    customerNo:"${this.kode}"
                                    name: "${this.name}"
                                    customerLimitAmountValue:${floatLimit}
                                    priceCategoryName:"${this.katHarga}"
                                    categoryName:"${this.kategori}"
                                }){
                                    id
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
                    console.log(text.data);
                    return text.data.addCustomerDB;

                })
                .then(resp => {
                    if(resp.status.toLowerCase() == "success"){
                        this.tmpId = resp.id;
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        this.$refs[refname].hide();
                        this.onFormReset2();
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
        onFormReset2(){
            this.kode="";this.name="";this.kategori="";;this.limit="";
            this.katHarga = this.katHargaOption[10].name;
            this.$v.kode.$reset();this.$v.name.$reset();this.$v.limit.$reset();
        },
    },
    async mounted(){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{ customerCategory {
						name
					}}
				`,
			}),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
			return text.data.customerCategory;
		})
		.then(resp => {
            this.kategoriOption = resp;
            this.isLoad2 = true;
		})
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{ priceCategory {
						name
					}}
				`,
			}),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
			return text.data.priceCategory;
		})
		.then(resp => {
            this.katHargaOption = resp
            this.katHarga = this.katHargaOption[10].name;
            this.isLoad3 = true;
		})
    }

};
</script>
