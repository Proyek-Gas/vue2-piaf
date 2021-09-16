<template>
<b-row>
    <b-colxx xxs="12">
        <h1>Add Customer</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil Customer">
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
            </b-card>
            <b-card class="mb-4" title="Informasi Tambahan">
                <b-form-group label-cols="3" horizontal label="Email">
                    <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" placeholder="Masukkan email"/>
                    <b-form-invalid-feedback v-if="!$v.email.email">Struktur email tidak valid</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Workphone">
                    <b-form-input type="text" v-model="$v.tlp.$model" :state="!$v.tlp.$error" placeholder="Masukkan nomor"/>
                    <b-form-invalid-feedback v-if="!$v.tlp.numeric">Nomor telepon hanya angka</b-form-invalid-feedback>
                     <b-form-invalid-feedback v-else-if="!$v.tlp.minLength || !$v.tlp.maxLength">Panjang nomor telepon antara 10-13 katakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Handphone">
                    <b-form-input type="text" v-model="$v.hp.$model" :state="!$v.hp.$error" placeholder="Masukkan nomor"/>
                    <b-form-invalid-feedback v-if="!$v.hp.numeric">Nomor handphone hanya angka</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.hp.minLength || !$v.hp.maxLength">Panjang nomor handphone antara 10-13 katakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="NPWP">
                    <b-form-input type="text" v-model="$v.npwp.$model" :state="!$v.npwp.$error" v-mask="'##.###.###.#-###.###'" placeholder="Masukakan nomor NPWP"/>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Alamat">
                    <b-textarea v-model="alamat" placeholder="Masukakan alamat lengkap"></b-textarea>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Kota">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama kota'}"
                        v-model="kota"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    ></vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Provinsi">
                    <label class="text text-medium mt-1" for="">{{ provinsi }}</label>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Negara">
                    <label class="text text-medium mt-1" for="">{{ negara }}</label>
                </b-form-group>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Summary</b-card-title>
                <p v-if="name != ''" class="mb-3">{{ name }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your name</p>
                
                <p v-if="email != ''" class="mb-3">{{ email }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your email</p>

                <p v-if="hp != ''" class="mb-3">{{ hp }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your handphone</p>

                <b-row>
                    <b-colxx xxs="8">
                        <p v-if="kategori != ''" class="mb-3">{{ kategori }}</p>
                        <p v-else class="text-muted mb-3" style="font-style: italic;">Kategori</p>
                    </b-colxx>
                    <b-colxx xxs="4">
                        <b-badge pill variant="warning">Kategori</b-badge>
                    </b-colxx>
                </b-row>
                <b-row>
                    <b-colxx xxs="8">
                        <p v-if="katHarga != ''" class="mb-3">{{ katHarga }}</p>
                        <p v-else class="text-muted mb-3" style="font-style: italic;">Kategori Harga</p>
                    </b-colxx>
                    <b-colxx xxs="4" >
                        <b-badge pill variant="info">Kategori Harga</b-badge>
                    </b-colxx>
                </b-row>
                    <p v-if="alamat != ''" class="mb-3">{{ alamat }}</p>
                    <p v-else class="text-muted mb-3" style="font-style: italic;">Your address</p>
                    <p v-if="kota != ''" class="mb-3">{{ kota }}</p>
                    <p v-else class="text-muted mb-3" style="font-style: italic;">Your city</p>
                <b-row>
                    <b-colxx xxs="6" class="text-center">
                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                        <b-button type="submit" variant="primary" style="width: 100%">Add</b-button>
                    </b-form>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-center">
                    <b-button @click="onFormReset" type="submit" variant="danger" style="width: 100%">Reset</b-button>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
</b-row>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import jsonCity from './json/cities.json'
import jsonProvince from './json/provinces.json';
import jsonCountry from './json/countries.json';
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
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)
const phone = helpers.regex('numeric', /^(09)[0-9]{9}/);

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory
    },
    data() {
        return {
            submit: false,
            name: "",
            kode: "",
            kategori: "",
            katHarga: "",
            limit: "",
            email: "",
            hp: "",
            tlp: "",
            npwp: "",
            alamat: "",
            kota: "",
            provinsi: "",
            negara: "",
            direction: getDirection().direction,
            kategoriOption: [],
            katHargaOption: [],

            filteredOptions: [],
            selected: {},
            arrKota: []
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
        },
        email: {
            email
        },
        hp:{
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(13),
        },
        tlp:{
            numeric,
            minLength: minLength(7),
            maxLength: maxLength(13),
        },
        npwp:{
            numeric
        }
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid && !this.submit){
                this.submit = true;
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
                                    mobilePhone:"${this.hp}"
                                    workPhone:"${this.tlp}"
                                    npwpNo:"${this.npwp}"
                                    customerLimitAmountValue:${floatLimit}
                                    email:"${this.email}"
                                    billStreet:"${this.alamat}"
                                    billCity:"${this.kota}"
                                    billProvince:"${this.provinsi}"
                                    billCountry:"${this.negara}"
                                    priceCategoryName:"${this.katHarga}"
                                    categoryName:"${this.kategori}"
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
                    console.log(text.data);
                    return text.data.addCustomerDB;
                    
                })
                .then(resp => {
                    if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/customerTable";
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
        },
        onFormReset(){
            this.kode="";this.name="";this.kategori="";this.limit="";
            this.katHarga = this.katHargaOption[10].name;
            this.email="";this.hp="";this.tlp="";this.npwp="";this.alamat="";
            this.kota="";this.provinsi="";this.negara="";
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === null) {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            return;
        }

        const filteredData = this.arrKota.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });

        // Store data in one property, and filtered in another
        this.filteredOptions = [
            {
            data: filteredData
            }
        ];
        },
        onAutosuggestSelected(item) {
            this.selected = item;
        },
        renderSuggestion(suggestion) {
            const character = suggestion.item;
            return character.name; /* renderSuggestion will override the default suggestion template slot. */
        },
        getSuggestionValue(suggestion) {
            this.kota = suggestion.item.name;
            if(this.kota != null){
                const tmpIdprov = suggestion.item.province_id;
                const tmpIdneg = suggestion.item.country_id;
                const nameProv = this.arrProv.find(element => element.id == tmpIdprov);
                const nameNeg = this.arrNegara.find(element => element.id == tmpIdneg);
                this.provinsi = nameProv.name;
                this.negara = nameNeg.name;				
			}
            return suggestion.item.name;
        }
    },
    async mounted(){
        this.arrKota = jsonCity;
        this.arrProv = jsonProvince;
        this.arrNegara = jsonCountry;
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
		})
    },
    computed:{
    ...mapGetters({
      currentUser: "currentUser",

    })
    }
  
};
</script>
