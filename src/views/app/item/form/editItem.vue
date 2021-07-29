<template>
<b-row>
    <b-colxx xxs="12">
        <h1>Edit Item</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Detail Item">
                <b-form-group label-cols="3" horizontal label="VS">
                    <b-form-input type="number" step="0.01" v-model="$v.vs.$model" :state="!$v.vs.$error" placeholder="Masukkan volume solid" />
                    <b-form-invalid-feedback v-if="!$v.vs.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.vs.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group>  
                <b-form-group label-cols="3" horizontal label="Warna">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik id_ral atau nama warna'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        clearable
                        v-model="warna" 
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    </vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Kemasan">
                    <v-select v-model="kemas" :clear-button="true" :options="dataKemas" :reduce="dataKemas => dataKemas.id" label="name" placeholder="Pilih kemasan"/>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Liter">
                    <b-form-input type="number" step="0.1" v-model="$v.liter.$model" :state="!$v.liter.$error" placeholder="Masukkan isi liter" />
                    <b-form-invalid-feedback v-if="!$v.liter.required">Harap isi liter</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.liter.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.liter.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Tipe Item">
                    <v-select v-model="tipe" :clear-button="true" :options="dataTipe" :reduce="dataTipe => dataTipe.id" label="name" placeholder="Pilih tipe item"/>
                </b-form-group>
            </b-card>
            <b-card class="mb-4" title="Agent Item">
                <b-form-group label-cols="3" horizontal label="Agent">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input2', class:'form-control', placeholder:'Ketik nama agent'}"
                        :suggestions="filteredOptions2"
                        :render-suggestion="renderSuggestion2"
                        :get-suggestion-value="getSuggestionValue2"
                        :limit="6"
                        clearable
                        v-model="agent" 
                        @selected="onAutosuggestSelected2"
                        @input="onAutoSuggestInputChange2"
                    >
                    </vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Ratio">
                    <b-form-input type="number" step="0.1" v-model="$v.rAgent.$model" :state="!$v.rAgent.$error" :disabled="select1 === 0" placeholder="Harap pilih agent" />
                    <b-form-invalid-feedback v-if="!$v.rAgent.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.rAgent.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group>  
            </b-card>
            <b-card class="mb-4" title="Thinner Item">
                <b-form-group label-cols="3" horizontal label="Thinner">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input3', class:'form-control', placeholder:'Ketik nama thinner'}"
                        :suggestions="filteredOptions3"
                        :render-suggestion="renderSuggestion3"
                        :get-suggestion-value="getSuggestionValue3"
                        :limit="6"
                        clearable
                        v-model="thin" 
                        @selected="onAutosuggestSelected3"
                        @input="onAutoSuggestInputChange3"
                    >
                    </vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Ratio">
                    <b-form-input type="number" step="0.1" v-model="$v.rThin.$model" :state="!$v.rThin.$error" :disabled="select2 === 0" placeholder="Harap pilih thinner" />
                    <b-form-invalid-feedback v-if="!$v.rThin.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.rThin.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group>  
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Summary</b-card-title>
                <b-card v-if="warna != ''" class="mb-3 d-flex flex-row" no-body>
                    <div src="/assets/img/profiles/l-1.jpg" 
                        alt="Card image cap" 
                        class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                        :style="returnColor(hex)">
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero">
                        <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div class="min-width-zero">
                                <h6 class="text-muted text-medium mb-1">
                                    {{ itemCode }}
                                </h6>
                                <p class="text-muted text-small mb-2">
                                    {{ itemName }}
                                </p>
                                <p class="text-muted text-small mb-2">
                                    {{ itemCate }}
                                </p>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card v-else class="mb-3 d-flex flex-row" no-body>
                    <p class="text-muted m-3" style="font-style: italic;">No color and item selected</p>
                </b-card>
                <p class="text text-medium mb-2">Daftar Harga</p>
                <b-row>
                    <b-colxx xxs="6" class="text-left">
                    <p class="text text-medium mb-2">Kategori</p>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-left">
                        <p class="text text-medium mb-2">Rupiah</p>
                    </b-colxx>
                </b-row>
                <div v-if="dataHarga.length > 0">
                    <b-row>
                        <b-colxx xxs="6" class="text-left">
                            <div v-for="item in dataHarga" :key="item.priceCategory.id">
                                <p class="text text-medium mb-2">{{ item.priceCategory.name }}</p>
                            </div>
                        </b-colxx>
                        <b-colxx xxs="6" class="text-left">
                            <div v-for="item in dataHarga" :key="item.priceCategory.id">
                                <p class="text text-medium mb-2">{{ item.price | currency}}</p>
                            </div>
                        </b-colxx>
                    </b-row>
                </div>
                <div v-else>
                    <p class="text-muted m-3" style="font-style: italic;">No list</p>
                </div>
                <b-row>
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
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";

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
            select1: 0,
            select2: 0,
            itemId: 0,
            itemCode: "",
            itemName: "",
            itemCate: "",
            vs: "",
            liter: "",
            warna:"",
            hex: "",
            kemas: "",
            tipe: "",
            agent: "",
            rAgent: "",
            thin: "",
            rThin:"",
            
            detail: [],
            dataKemas: [],
            dataTipe: [],
            tmp:[],
            dataHarga:{},


            filteredOptions: [],
            selected: {},
            dataWarna: [],

            filteredOptions2: [],
            selected2: {},
            dataAgent: [],

            filteredOptions3: [],
            selected3: {},
            dataThin: []
            
        };
    },
    mixins: [validationMixin],
    validations: {
        vs: {
            minValue: minValue(1),
            maxValue: maxValue(100),
        },
        liter: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(1000),
        },
        warna:{
            required
        },
        rAgent: {
            minValue: minValue(1),
            maxValue: maxValue(100),
        },
        rThin: {
            minValue: minValue(1),
            maxValue: maxValue(100),
        },
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                console.log("valid");
                let floatvs = 0;let floatAg = 0;
                let floatltr = 0;let floatThin = 0;
                if(this.vs != '' || this.liter != '' || this.rAgent != '' || this.rThin != ''){
                    floatvs = parseFloat(this.vs);
                    floatltr = parseFloat(this.liter);
                    floatAg = parseFloat(this.rAgent);
                    floatThin = parseFloat(this.rThun);
                }
                console.log(parseFloat(this.vs));
                console.log(this.kemas);
                console.log(parseFloat(this.liter));
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            mutation{
                                updateItem(item_id:${this.itemId}
                                    params:{
                                    vs_volume_solid:${floatvs}
                                    color:"${this.warna}",
                                    packaging:${this.kemas}
                                    liter:${floatltr}
                                    agent_item_id:0
                                    ratio_agent:${floatAg}
                                    recommended_thinner_id:0
                                    ratio_recommended_thinner_id:${floatThin}
                                    }
                                ){
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
					return text.data.updateItem;
				})
				.then(resp => {
					console.log(resp.message);
					if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/itemTable";
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
            this.kode="";this.name="";this.kategori="";this.katHarga="";this.limit="";
            this.email="";this.hp="";this.tlp="";this.npwp="";this.alamat="";
            this.kota="";this.provinsi="";this.negara="";
            this.$v.$reset();
        },
        //autoSuggest warna
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            this.rAgent = "";
            this.select1  = 0;
            return;
        }
        const filteredData = this.dataWarna.filter(option => {
            return option.ind_name.toLowerCase().indexOf(text.toLowerCase()) > -1 || option.eng_name.toLowerCase().indexOf(text.toLowerCase()) > -1 || option.id_ral.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
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
            return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                        <div src="/assets/img/profiles/l-1.jpg" 
                            alt="Card image cap" 
                            class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                            style={{ background: `#${character.hex_code}` }}>
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mt-2">
                                            {character.ind_name}
                                        </h6>
                                    <p class="text-muted text-small mb-2">
                                        {character.eng_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h6 class="ml-1 text-muted text-medium mt-3">
                            {character.id_ral}
                        </h6>                      
                    </b-card>;
        },
        getSuggestionValue(suggestion) {
            this.warna = suggestion.item.ind_name;
            this.hex = suggestion.item.hex_code;
            this.select1 = 1;
            return suggestion.item.ind_name;
        },

        //autoSuggest Agent
        onAutoSuggestInputChange2(text, oldText) {
        if (text === "") {
            this.rAgent = "";
            this.select1  = 0;
            return;
        }
        const filteredData = this.dataAgent.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
        this.filteredOptions2 = [
            {
            data: filteredData
            }
        ];
        
        },
        onAutosuggestSelected2(item) {
            this.selected2 = item;
        },
        renderSuggestion2(suggestion) {
            const character = suggestion.item;
            console.log(character);
            return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                        <div src="/assets/img/profiles/l-1.jpg" 
                            alt="Card image cap" 
                            class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                            style={{ background: "white", color: 'black', border: "5px solid black" }}>Ag
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mt-2">
                                            {character.name}
                                        </h6>
                                    <p class="text-muted text-small mb-2">
                                        {character.no} - {character.itemCategory.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div class="min-width-zero">
                                    <h6 class="text-muted text-medium mt-2">
                                        {character.color.ind_name}
                                    </h6>
                                <p class="text-muted text-small mb-2">
                                    {character.color.eng_name}
                                </p>
                            </div>
                        </div>
                    </b-card>;
        },
        getSuggestionValue2(suggestion) {
            this.agent = String(suggestion.item.id);
            this.select1 = 1;
            return suggestion.item.name;
        },

        //autoSuggest Thinner
        onAutoSuggestInputChange3(text, oldText) {
        if (text === "") {
            this.rThin = "";
            this.select2  = 0;
            return;
        }
        const filteredData = this.dataThin.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
        this.filteredOptions3 = [
            {
            data: filteredData
            }
        ];
        },
        onAutosuggestSelected3(item) {
            this.selected = item;
        },
        renderSuggestion3(suggestion) {
            const character = suggestion.item;
            console.log(character);
            return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                        <div src="/assets/img/profiles/l-1.jpg" 
                            alt="Card image cap" 
                            class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                            style={{ background: "white", color: 'black', border: "5px solid black" }}>Th
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mt-2">
                                            {character.name}
                                        </h6>
                                    <p class="text-muted text-small mb-2">
                                        {character.no} - {character.itemCategory.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div class="min-width-zero">
                                    <h6 class="text-muted text-medium mt-2">
                                        {character.color.ind_name}
                                    </h6>
                                <p class="text-muted text-small mb-2">
                                    {character.color.eng_name}
                                </p>
                            </div>
                        </div>
                    </b-card>;
        },
        getSuggestionValue3(suggestion) {
            this.thin = String(suggestion.item.name);
            this.select2 = 1;
            this.rThin = String(4);
            return suggestion.item.name;
        },
        returnColor(a){
            const style = {
                background: "#"+a,
            }
            return style
        },
    },
    async mounted(){
        this.itemId = this.$route.query.id;
        console.log(this.itemId);
        if(this.itemId){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        itemDetail(item_id:${this.itemId}){
                            no
                            name
                            balance
                            itemCategory{
                                id
                                name
                            }
                            vs_volume_solid
                            color{
                                id_ral
                                hex_code
                                ind_name
                                eng_name
                            }
                            packaging_name
                            liter
                            agent_item_id
                            ratio_agent
                            recommended_thinner_id
                            ratio_recommended_thinner_id
                            unit2Name
                            ratio2
                            unit3Name
                            ratio3
                            type{
                                id
                                name
                            }
                            detailSellingPrice{
                                priceCategory{
                                    id
                                    name
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
            console.log(text.data.itemDetail);
            return text.data.itemDetail;
        })
        .then(resp => {
            this.detail = resp;
            console.log(this.detail);
            if(this.detail == null){
				window.location = window.location.origin +"/error?id=404&name=item";
			}else{
                if(this.detail.packaging_name && this.detail.type){
                    console.log("aman");
                    this.warna = this.detail.color.ind_name;
                    this.hex = this.detail.color.hex_code;
                    this.itemCode = this.detail.no;
                    this.itemName = this.detail.name;
                    this.itemCate = this.detail.itemCategory.name;
                    this.dataHarga = this.detail.detailSellingPrice;
                    if(!this.detail.agent_id || !this.detail.ratio_agent || this.detail.ratio_agent != 0){
                        this.agent = this.detail.agent_id;
                        this.rAgent = this.detail.ratio_agent;
                    }
                    if(!this.detail.recommended_thinner_id || !this.detail.ratio_recommended_thinner_id){
                        this.thin = this.detail.recommended_thinner_id;
                        this.rThin = this.detail.ratio_recommended_thinner_id;
                    }
                    if(this.detail.ratio2){
                        this.liter = this.detail.ratio2;
                    }
                    if(this.detail.ratio2 && this.detail.ratio3){
                        this.rAgent = this.detail.ratio3 - this.detail.ratio2;
                    }
                    if(this.detail.unit2Name == "GLN"){
                        this.kemas = 1;
                    }else{
                        this.kemas = 2;
                    }
                    console.log(this.dataHarga);
                }else{
                    this.$toast("Item ini tidak ada dalam DB", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                    console.log("masuk");
                    setTimeout(() => {
                        window.location = window.location.origin+"/app/datatable/itemTable/add?id="+this.itemId;
                    }, 2000);
                }
            }
        })
        }else{
            window.location = window.location.origin +"/error?id=404&name=item";
        }
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        ralColors{
                            id_ral
                            hex_code
                            ind_name
                            eng_name
                        }
                    }
                `,
            }),
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(text) {
            return text.data.ralColors;
        })
        .then(resp => {
            this.dataWarna = resp;
        })
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        packagings{
                            id
                            name
                        }
                    }
                `,
            }),
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(text) {
            return text.data.packagings;
        })
        .then(resp => {
            this.dataKemas = resp;
            this.kemas = this.dataKemas[0].id;
        })
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        itemTypes{
                            id
                            name
                        }
                    }
                `,
            }),
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(text) {
            return text.data.itemTypes;
        })
        .then(resp => {
            this.dataTipe = resp;
            this.tipe = this.dataTipe[0].id;
        })
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        items{
                            count
                            items{
                                id
                                no
                                name
                                itemCategory{
                                    id
                                    name
                                }
                                color{
                                    id_ral
                                    hex_code
                                    ind_name
                                    eng_name
                                }
                                type{
                                    id
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
            return text.data.items.items;
        })
        .then(resp => {
            this.tmp = resp;
            for (let i = 0; i < this.tmp.length; i++) {
                if(this.tmp[i].type.id == 2){
                    this.dataAgent.push(this.tmp[i]);
                }else if(this.tmp[i].type.id == 3){
                    this.dataThin = this.tmp[i];
                }
            }
        })
    }
};
</script>
