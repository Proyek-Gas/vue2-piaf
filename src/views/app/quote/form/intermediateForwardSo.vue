<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Forward to SO Form</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
    <b-row>
        <b-colxx xxs="12" xl="12">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-card class="mb-4" title="Customer">
                    <b-form-group horizontal>
                        <vue-autosuggest
                            class="autosuggest suggest"
                            :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama customer'}"
                            :suggestions="filteredOptions"
                            :render-suggestion="renderSuggestion"
                            :get-suggestion-value="getSuggestionValue"
                            :limit="6"
                            v-model="custNama"
                            @selected="onAutosuggestSelected"
                            @input="onAutoSuggestInputChange"
                        >
                        </vue-autosuggest>
                    </b-form-group>
                    <b-card class="mb-0" title="Data Customer">
                        <h6 class="text-muted text-medium mb-1">
                            {{ custNama }}
                        </h6>
                        <p class="text-muted text-small mb-2">
                            {{ custEmail }}
                        </p>
                        <p class="text-muted text-small mb-2">
                            {{ custCate }}
                        </p>
                    </b-card>
                </b-card>
            </b-form>
        </b-colxx>
        <b-colxx xxs="12" xl="12">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-card class="mb-4" title="Project">
                    <b-form-group horizontal>
                        <vue-autosuggest
                            class="autosuggest suggest"
                            :input-props="{id:'autosuggest__input2', class:'form-control', placeholder:'Ketik nama project'}"
                            :suggestions="filteredOptions2"
                            :render-suggestion="renderSuggestion2"
                            :get-suggestion-value="getSuggestionValue2"
                            :limit="6"
                            v-model="proNama"
                            @selected="onAutosuggestSelected2"
                            @input="onAutoSuggestInputChange2"
                        >
                        </vue-autosuggest>
                        <b-form-input type="text" v-model="$v.proNama.$model" :state="!$v.proNama.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                        <b-form-invalid-feedback v-if="!$v.proNama.required">Harap pilih project</b-form-invalid-feedback>
                    </b-form-group>
                    <b-card class="mb-0" title="Data Project">
                        <h6 class="text-muted text-medium mb-1">
                            {{ proNama }}
                        </h6>
                        <p class="text-muted text-small mb-2">
                            {{ proKat.name }}
                        </p>
                    </b-card>
                </b-card>
            </b-form>
        </b-colxx>
    </b-row>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
        <b-card class="mb-4">
            <b-card-title>Sales Order  Summary</b-card-title>
            
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
            customer: [],
            project: [],
            custEmail: "",
            custId: "",
            custNama: "",
            custCate: "",
            proId:"",
            proNama: "",
            proKat: "",

            filteredOptions: [],
            selected: {},
            dataCust: [],
            filteredOptions2: [],
            selected2: {},
            dataPro: [],
        };
    },
    mixins: [validationMixin],
    validations: {
        proNama:{
            required
        },
    },
    methods: {
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
        //autoSuggest customer
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            this.custEmail = '';
            this.custCate = '';this.custId = '';
            this.proNama = '';this.proKat = '';
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
            this.custId = suggestion.item.id;
            this.custNama = suggestion.item.name;
            this.custEmail = suggestion.item.email;
            this.dataChild = suggestion.item;
            this.proKat = ''; this.proNama = '';this.proId = '';
            this.dataPro = [];
            this.filteredOptions2 = [];
            this.custCate = suggestion.item.category.name +" - "+ suggestion.item.priceCategory.name;
            this.dataPassing = suggestion.item;
            return suggestion.item.name;
        },

        //autoSuggest project
        onAutoSuggestInputChange2(text, oldText) {
        if (text === "") {
            this.proKat = '';
            this.dataPro = [];
            this.filteredOptions2 = [];
        }
        if(this.custId == ""){
            if(text !== "" && text.length >= 2){
                this.fetchProject("",text);
                setTimeout(() => {
                    const filteredData = this.dataPro.projects.filter(option => {
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
                });
                this.filteredOptions2 = [
                    {
                        data: filteredData
                    }
                ];
                }, 500);
            }
        // Store data in one property, and filtered in another
        }else{
            if(text !== "" && text.length >= 2){
                this.fetchProject(this.custId,text);
                setTimeout(() => {
                    const filteredData = this.dataPro.projects.filter(option => {
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
                });
                this.filteredOptions2 = [
                    {
                        data: filteredData
                    }
                ];
                }, 500);
            }
        }
        },

        onAutosuggestSelected2(item) {
            this.selected2 = item;
        },
        renderSuggestion2(suggestion) {
            const character = suggestion.item;
            return <b-card class="mb-0 d-flex flex-row" no-body><img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/><div class="d-flex flex-grow-1 min-width-zero"><div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"><div class="min-width-zero"><h6 class="text-muted text-medium mb-1">{character.name}</h6><p class="text-muted text-small mb-2">{character.name}</p></div></div></div></b-card>
        },
        getSuggestionValue2(suggestion) {
            console.log(suggestion.item);
            this.proId = suggestion.item.id;
            this.proNama = suggestion.item.name;
            this.proKat = suggestion.item.category;
            this.fetchCustomer(suggestion.item.customer.id);
            return suggestion.item.name;
        },
        fetchCustomer(val){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{ customerDetail(customer_id:"${val}") {
                            name
                            email
                            category{
                                name
                            }
                            priceCategory{
                                name
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
                console.log(text.data.customerDetail);
                return text.data.customerDetail;
            })
            .then(resp => {
                console.log(resp)
                if(resp != null){
                    this.custNama = resp.name;
                    this.custEmail = resp.email;
                    this.custCate = resp.category.name +" - "+ resp.priceCategory.name;
                }
            })
        },
        fetchProject(custId,proName){
            let str = "";
            let filter = "";
            let search = "";
            if(custId != "" || proName != ""){
                if(custId != ""){
                    filter = `customer_id: "${custId}"`;
                }
                if(proName != ""){
                    search = `search:"${proName}"`;
                }
                str = "(filter: {"+filter+" "+search+"})";
                console.log(str);
            }
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                 'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query {projects ${str}{
                        count
                        projects{
                            name
                            id
                            status
                            customer_id
                            category {
                                id
                                name
                            }
                        }
                        }
                        }
                    `,

                    //  `
                    //     query {projects ${str}{
                    //     count
                    //     projects{
                    //         name
                    //         id
                    //         status
                    //         customer{
                    //             id
                    //         }
                    //         category {
                    //             id
                    //             name
                    //         }
                    //     }
                    //     }
                    //     }
                    // `
                }),
            })
            .then(function(response) {
              console.log(response)
                return response.json()
            })
            .then(function(text) {
              console.log(text)
                return text.data.projects;
            })
            .then(resp => {
                console.log(resp)
                this.dataPro = resp;
            })
        },
    },
    mounted(){
        this.qId = this.$route.query.id;
        if(this.qId){
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
                        name
                        email
                        workPhone
                        category
                        priceCategory
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
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{
                    quoteDetailSalesOrder(quote_id:${this.qId}){
                        project{
                        name
                        customer{
                            name
                            customerNo
                            email
                            category{
                                name
                            }
                            priceCategory{
                                name
                            }
                        }
                        category{
                            name
                        }
                        }
                        items{
                        item_name
                        total_liter
                        packagings{
                        item_id
                            item_code
                        }
                        price
                        }
                        free_items{
                            item_name
                        total_liter
                        packagings{
                            item_id
                            item_code
                        }
                        price
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
			return text.data.quoteDetailSalesOrder;
		})
		.then(resp => {
            this.isLoad = true;
            this.customer = resp.project.customer;
            this.project = resp.project;
            this.custNama = this.customer.name;
            this.custEmail = this.customer.email;
            this.custCate = this.customer.category.name + " - " + this.customer.priceCategory.name;
            this.proNama = this.project.name;
            this.proKat = this.project.category.name;
		})
        }else{
            window.location = window.location.origin +"/error?id=404&name=quote";
        }
    },
    computed: {
        ...mapGetters({
          currentUser : "currentUser"
        })
    },

};
</script>


