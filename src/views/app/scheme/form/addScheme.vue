<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Add Scheme</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Detail Scheme">
                <b-form-group label-cols="3" horizontal label="Nama" >
                    <b-form-input type="text" v-model="$v.namaSch.$model" :state="!$v.namaSch.$error" placeholder="Masukkan judul proyek"/>
                    <b-form-invalid-feedback v-if="!$v.namaSch.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.namaSch.minLength || !$v.namaSch.maxLength">Panjang nama 10-255 karakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Item">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama item'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        clearable
                        v-model="item"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    <template slot="before-section-default"> section header content for specific section goes here </template>

                    </vue-autosuggest>
                </b-form-group>
            </b-card>
            <b-card class="mb-4" >
              <div class="row">
                <div class="col-6">
                  <h3>Item</h3>
                </div>
                  <div class="col-6" style="text-align:right">
                     <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteItemGroup"> delete
                       <!-- ({{itemDelCount}}) -->
                    </b-button>
                  </div>
              </div>
                <div v-if="dataSelected1.length > 0" class="row">
                      <table-item :dataComponent="dataSelected1" :counter="itemDelCount" v-on:btnDel="removeBigData"></table-item>
                </div>
            </b-card>
            <b-card class="mb-4" >
               <div class="row">
                  <div class="col-6"><h3>Agent Item</h3></div>
                  <div class="col-6"></div>
               </div>
                <div v-if="dataSelected1.length > 0" class="row">
                    <table-agent :dataComponent="dataSelected1"></table-agent>
                </div>
            </b-card>
            <b-card class="mb-4" >
                <div class="row">
                  <div class="col-6"><h3>Thinner Item</h3></div>
                  <div class="col-6"></div>
               </div>
                <div v-if="dataSelected1.length > 0" class="row">
                    <table-agent :dataComponent="dataSelected1"></table-agent>
                </div>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Summary</b-card-title>
                <b-card v-if="namaSch != ''" class="mb-3 d-flex flex-row p-2" no-body>
                    <div src="/assets/img/profiles/l-1.jpg"
                        alt="Card image cap"
                        class="align-self-center list-thumbnail-letters small"
                        :style="returnColor(hex)">
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero ml-2">
                        <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div class="min-width-zero">
                                <h6 class="text-muted text-medium mb-1">
                                    {{ namaSch }}
                                </h6>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card v-else class="mb-3 d-flex flex-row" no-body>
                    <p class="text-muted m-3" style="font-style: italic;">Scheme name</p>
                </b-card>
                <div class="separator mb-3"></div>
                <p class="text text-medium mb-2">Daftar Item</p>
                    <div v-for="item in bigData" :key="item.no">
                        <b-card class="mb-3 d-flex flex-row p-2" no-body>
                            <div src="/assets/img/profiles/l-1.jpg"
                                alt="Card image cap"
                                class="align-self-center list-thumbnail-letters rounded-circle small"
                                :style="returnColor(item.warna.hex_code)">
                            </div>
                            <div class="d-flex flex-grow-1 min-width-zero ml-2">
                                <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                    <div class="min-width-zero">
                                        <p class="text-muted text-small mb-1">
                                            {{ item.name }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </b-card>
                    </div>
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
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import tableItem from "./tableAddItemScheme.vue";
import tableAgent from "./tableAddItemAgentScheme.vue";
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
        vuetable: Vuetable,
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        "table-item" : tableItem,
        "table-agent" : tableAgent
    },
    data() {
        return {
            isLoad: false,
            namaSch: "",
            item: "",
            dataItem:[],
            bigData:[],
            dataSelected1: [],
            dataSelected2: [],
            dataSelected3: [],

            filteredOptions: [],
            selected: {},
            dataWarna: [],

            itemDelCount : 0,
        };
    },
    mixins: [validationMixin],
    validations: {
        namaSch: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(255)
        },
    },
    methods: {
      deleteItemGroup(){
          let newArrSelected = [];
          let newArrBigData = [];
          for(let j=0; j<this.dataSelected1.length; j++ ){
            if(!this.dataSelected1[j].action){
                newArrSelected.push(this.dataSelected1[j])
            }
          }

           for(let j=0; j<this.bigData.length; j++ ){
            if(!this.bigData[j].action){
                newArrBigData.push(this.bigData[j])
            }
          }
          this.bigData = newArrBigData
          this.dataSelected1 = newArrSelected
      },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            mutation{
                                addScheme(params:{
                                    name:"${this.namaSch}"
                                    notes:""
                                    items:{
                                        item_id:0
                                        coat:0
                                        dry_film_thickness:0
                                        loss:0
                                    }
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
					return text.data.addItem;
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
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            return;
        }

        const filteredData = this.dataItem.items.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
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
        removeBigData : function (item){
          let newArr = this.bigData
          let index = -1;
            for(let i=0; i< newArr.length; i++){
             if(newArr[i].no == item.no){
               index = i
             }
            }

            if(index != -1){
              newArr.splice(index,1)
            }
            this.bigData = newArr
        },
        renderSuggestion(suggestion) {
            const character = suggestion.item;
            if(character.type.id == 1){
                return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                            <div src="/assets/img/profiles/l-1.jpg"
                                alt="Card image cap"
                                class="align-self-center list-thumbnail-letters rounded-circle small mr-2"
                                style={{ background: `#${character.color.hex_code}`, color: 'black'}}><center>{character.color.id_ral}</center>
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
                        </b-card>;
            }else{
                return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                            <div v-if={character.type.id == 2} src="/assets/img/profiles/l-1.jpg"
                                alt="Card image cap"
                                class="align-self-center list-thumbnail-letters rounded-circle small mr-2"
                                style={{ background: "white", color: 'black', border: "5px solid black" }}>Ag
                            </div>
                            <div v-if={character.type.id == 3} src="/assets/img/profiles/l-1.jpg"
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
                        </b-card>;
            }
        },
        getSuggestionValue(suggestion) {
            this.item = suggestion.item.name;
            console.log(suggestion.item.type.id);
            let ada = this.check(suggestion.item.no);
            if(!ada){
                let data = {
                    no: suggestion.item.no,
                    name: suggestion.item.name,
                    warna: suggestion.item.color,
                    vs: suggestion.item.vs,
                    balance: suggestion.item.balance

                }
                this.bigData.push(data);
                if(suggestion.item.type.id == 1)this.dataSelected1.push(data);
                else if(suggestion.item.type.id == 1)this.dataSelected2.push(data);
                else this.dataSelected3.push(data);
            }
                console.log(this.bigData);
            return suggestion.item.name;
        },
        returnColor(a){
            const style = {
                background: "#"+a,
            }
            return style
        },
        check(a){
            let kembar = false;
            this.bigData.forEach(element => {
                console.log(element.no);
                console.log(a);
                if(element.no == a){
                    kembar = true;
                }
            });
            return kembar;
        }
    },
    async mounted(){
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
            console.log(text.data.items);
            return text.data.items;
        })
        .then(resp => {
            this.isLoad = true;
            this.dataItem = resp;
            console.log(this.dataItem);

        })
    }
};
</script>
