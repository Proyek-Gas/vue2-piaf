<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Add Sales Order</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil Sales Order">
                <b-form-group label-cols="3" horizontal label="Customer">
                    <vue-autosuggest
                        class="autosuggest suggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama customer'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        clearable
                        v-model="custNama"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    </vue-autosuggest>
                    <b-form-input type="text" v-model="$v.custNama.$model" :state="!$v.custNama.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                    <b-form-invalid-feedback v-if="!$v.custNama.required">Harap pilih customer</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Jangka Waktu Pembayaran" >
                    <b-form-input type="text" v-model="$v.payTerm.$model" :state="!$v.payTerm.$error" placeholder="Masukkan judul proyek"/>
                    <b-form-invalid-feedback v-if="!$v.payTerm.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.payTerm.minLength || !$v.payTerm.maxLength">Panjang nama 10-255 karakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Tanggal Transaksi">
                    <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('form-components.date')"
                        :clear-button="true"
                        @cleared="clear"
                        v-model="tglTrans"
                        format ="yyyy-MM-dd"
                    ></datepicker>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Tanggal Pengiriman">
                    <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('form-components.date')"
                        :clear-button="true"
                        @cleared="clear"
                        v-model="tglShip"
                        format ="yyyy-MM-dd"
                    ></datepicker>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Diskon">
                    <b-form-input type="number" step="0.01" v-model="$v.dc.$model" :state="!$v.dc.$error" placeholder="Masukkan jumlah diskon tunai" />
                    <b-form-invalid-feedback v-if="!$v.dc.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.dc.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group> 
                <b-form-group label-cols="3" horizontal label="Nomor PO">
                    <b-form-input type="text" v-model="$v.poNum.$model" :state="!$v.poNum.$error" placeholder="Masukkan nomor PO"/>
                    <b-form-invalid-feedback v-if="!$v.poNum.numeric">Nomor PO hanya angka</b-form-invalid-feedback>
                     <b-form-invalid-feedback v-else-if="!$v.poNum.minLength || !$v.poNum.maxLength">Panjang nomor po antara 10-13 katakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Alamat">
                    <b-textarea v-model="alamat" placeholder="Masukakan alamat lengkap"></b-textarea>
                </b-form-group>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
        <b-card class="mb-4">
            <b-card-title>Sales Order  Summary</b-card-title>
            <b-card v-if="customer != ''" class="mb-3 d-flex flex-row" no-body>
                <img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/>
                <div class="d-flex flex-grow-1 min-width-zero">
                    <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                        <div class="min-width-zero">
                            <h6 class="text-muted text-medium mb-1">
                                {{ customer.name }}
                            </h6>
                            <p class="text-muted text-small mb-2">
                                {{ customer.customerNo }}
                            </p>
                        </div>
                    </div>
                </div>
            </b-card>
            <p v-if="payTerm != ''" class="mb-3">{{ payTerm }}</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">Payment term name</p>
            <p v-if="dc != ''" class="mb-3">{{ dc }}%</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">Cash of discount</p>
            <p v-if="tglTrans != ''" class="mb-3">{{ dateFormat(tglTrans) }}</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">Transaction date</p>
            <p v-if="tglShip != ''" class="mb-3">{{ dateFormat(tglShip) }}</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">Shipment date</p>
            <p v-if="poNum != ''" class="mb-3">{{ poNum }}</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">PO number</p>
            <p v-if="alamat != ''" class="mb-3">{{ alamat }}</p>
            <p v-else class="text-muted mb-3" style="font-style: italic;">Address</p>
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
</div>
<div v-else>
    <div class="loading"></div>
</div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection, setThemeRadius } from "../../../../utils";
import Datepicker from "vuejs-datepicker";
import {mapGetters} from 'vuex';

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
        datepicker: Datepicker
    },
    data() {
        return {
            isLoad: false,
            submit: false,
            customer: "",
            custNama:"",
            payTerm: "",
            tglTrans: "",
            tglShip: "",
            dc: "",
            poNum: "",
            alamat: "",
            filteredOptions: [],
            selected: {},
            dataCust: [],
        };
    },
    mixins: [validationMixin],
    validations: {
        custNama:{
            required
        },
        payTerm: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(255)
        },
        dc: {
            numeric,
            minValue: minValue(1),
            maxValue: maxValue(100)
        },
        poNum: {
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(13)
        },
    },
    methods: {
        dateFormat(date){
            let d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return da + " "+ mo + " " +ye;
        },
        clear(){
            this.tglTrans = "";
            this.tglShip = "";
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid && !this.submit){
                this.submit = true;
                console.log("valid");
                let date;let date2;
                let str;let str2;
                if(this.tglTrans != '' && this.tglShip != ''){
                    date = new Date(this.tglTrans).toI;
                    date2 = new Date(this.tglShip);
                    str = `transDate:"${date}"`;
                    str2 = `shipDate:"${date2}"`;
                    console.log(str);
                    console.log(str2);
                }else{
                    date = null;date2 = null;
                    str = `transDate:${date}`;str2 = `shipDate:${date2}`;
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
                            addSalesOrder(params:{
                                customerNo:"${this.customer.customerNo}"
                                cashDiscount:${this.dc}
                                ${str}
                                ${str2}
                                paymentTermName:"${this.payTerm}"
                                poNumber:"${this.poNum}"
                                toAddress:"${this.alamat}"
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
                    console.log(text);
					return text.data.addSalesOrder;
				})
				.then(resp => {
					console.log(resp.message);
					if(resp.status.toLowerCase() == "success"){
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/salesorderTable";
                        }, 1000);
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
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
            this.customer="";this.tglPro = "";
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            this.customer = '';
        }
        const filteredData = this.dataCust.customers.filter(option => {
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
            return <b-card class="mb-0 d-flex flex-row" no-body><img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/><div class="d-flex flex-grow-1 min-width-zero"><div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"><div class="min-width-zero"><h6 class="text-muted text-medium mb-1">{character.name}</h6><p class="text-muted text-small mb-2">{character.workPhone}</p></div></div></div></b-card>
        },
        getSuggestionValue(suggestion) {
            this.customer = suggestion.item;
            this.custNama = suggestion.item.name;
            return suggestion.item.name;
        }
    },
    mounted(){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{ customers {
                    count
                    customers{
                        id
                        customerNo
                        name
                        workPhone
                    }}
                    }
				`,
			}),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
			return text.data.customers;
		})
		.then(resp => {
            this.isLoad = true;
            this.dataCust = resp;
		})
    },
    computed: {
        ...mapGetters({
          currentUser : "currentUser"
        })
    },

};
</script>


