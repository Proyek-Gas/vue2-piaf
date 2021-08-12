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
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    </vue-autosuggest>
                </b-form-group>
            </b-card>
            <b-card class="mb-4" >
              <div class="row">
                <div class="col-6">
                  <h3>Item</h3>
                  <!-- {{dataSelected1}} -->
                </div>
                  <div class="col-6" style="text-align:right">
                     <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteItemGroup(1)">Delete
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
                  <div class="col-6" style="text-align:right">
                      <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteItemGroup(2)">Delete
                       <!-- ({{itemDelCount}}) -->
                    </b-button>
                  </div>
               </div>
                <div v-if="dataSelected2.length > 0" class="row">
                    <table-agent :dataComponent="dataSelected2" v-on:btnDel="removeBigData"></table-agent>
                </div>
            </b-card>
            <b-card class="mb-4" >
                <div class="row">
                  <div class="col-6"><h3>Thinner Item</h3></div>
                  <div class="col-6" style="text-align:right">
                      <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteItemGroup(3)">Delete
                       <!-- ({{itemDelCount}}) -->
                    </b-button>
                  </div>
               </div>
                <div v-if="dataSelected3.length > 0" class="row">
                    <table-agent :dataComponent="dataSelected3" v-on:btnDel="removeBigData"></table-agent>
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
                        >
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
<div v-else>
    <div class="loading"></div>
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
        vuetable: Vuetable,
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        "table-item" : tableItem,
        "table-agent" : tableAgent
    },
    data() {
        return {
            submit: false,
            isLoad: false,
            namaSch: "",
         //   item: "",
            dataItem:[],
            bigData:[],
            dataSelected1: [],
            dataSelected2: [],
            dataSelected3: [],
            itemToAdd: [],
            coat:"",

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
        }
    },
    methods: {
        deleteItemGroup(type){
            let cek = false;
            let arrOld = []
            if(type == 1){
                arrOld = this.dataSelected1
            }else if(type == 2){
                arrOld = this.dataSelected2
            }else{
                arrOld = this.dataSelected3
            }
            let newArrSelected = [];
            let newArrBigData = [];
            for(let j=0; j<arrOld.length; j++ ){
                if(!arrOld[j].action){
                    newArrSelected.push(arrOld[j])
                } else{
                     cek = true
                     this.removeDataAgentChild(arrOld[j].recommended_thinner_id)
                     this.removeDataAgentChild(arrOld[j].agent_item_id);

                }
            }

            for(let j=0; j<this.bigData.length; j++ ){
                if(!this.bigData[j].action){
                    newArrBigData.push(this.bigData[j])
                }
            }
            if(cek){
                this.bigData = newArrBigData
            }

            if(type == 1){
                this.dataSelected1 = newArrSelected
            }else if(type==2){
                this.dataSelected2 = newArrSelected
            }else{
                this.dataSelected3 = newArrSelected
            }

        },
        checkIsian(value, type,item){
            let cek = true;
            let cek2 = true;

                if(!value){
                    cek = false;
                     this.$toast(item+" tidak boleh kosong", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else{
                    if(type == 1){
                        if(value < 0 || value > 100){
                            cek2 = false;
                        }
                    }
                    else{
                        if(value < 0 || value > 1000){
                            cek2 = false;
                        }
                    }
                }

            return [cek, cek2];
        },

        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid && !this.submit){
                this.submit = true;
                let data = {};
                let sukses = true;
                let sukses2 = true;
                let sukses3 = true;
                let ctr = 0;
                let ctr2 = 0;
                let ctr3 = 0;
                for (let i = 0; i < this.bigData.length; i++) {
                    let arr = this.checkIsian(this.bigData[i].coat,1,"Coat");
                    let arr2 = this.checkIsian(this.bigData[i].dft,2,"DFT");
                    let arr3 = this.checkIsian(this.bigData[i].loss,1,"Loss");
                    if(arr[0] == true && arr[1] == true){
                        ctr = ctr + 1;
                    }
                    if(arr2[0] == true && arr2[1] == true){
                        ctr2 = ctr2 + 1;
                    }
                    if(arr3[0] == true && arr3[1] == true){
                        ctr3 = ctr3 + 1;
                    }
                }
                if(ctr < this.bigData.length){
                    sukses = false;
                   this.$toast("Range Coat tidak valid! (1-100)", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else if (ctr2 < this.bigData.length){
                    sukses2 = false;
                    this.$toast("Range DFT tidak valid! (1-1000)", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else if (ctr3 < this.bigData.length){
                    sukses3 = false;
                    this.$toast("Range Loss tidak valid! (1-100)", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }
                if(sukses && sukses2 && sukses3){
                for (let i = 0; i < this.bigData.length; i++) {
                    data = `{
                        item_id:${this.bigData[i].id},
                        coat:${this.bigData[i].coat},
                        dry_film_thickness:${this.bigData[i].dft},
                        loss:${this.bigData[i].loss}
                    }`
                       this.itemToAdd.push(data);
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
                                addScheme(params:{
                                    name:"${this.namaSch}"
                                    notes:""
                                    color_id_ral:"RAL 1000"
                                    items:[${this.itemToAdd}]
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
					return text.data.addScheme;
				})
				.then(resp => {
					if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/schemeTable";
                        }, 1000);
                    }else{
                        this.$toast(resp.message, {
                            type: "error",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                    }
				});
                }
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


            if(item.agent_item_id != null){
              this.removeDataAgentChild(item.agent_item_id)
            }
            if(item.recommended_thinner_id != null){
              this.removeDataAgentChild(item.recommended_thinner_id)
            }

            if(index != -1){
              newArr.splice(index,1)
            }
            this.bigData = newArr
        },
        removeDataAgentChild(id){
            let newArr = this.bigData
            let newArr2 = this.dataSelected2
            let newArr3 = this.dataSelected3
            let index= -1;
            let index2 = -1;
            let index3 = -1;
            for (let i = 0; i < newArr.length; i++) {
              if(newArr[i].id == id){
               index = i
             }
            }

             for (let i = 0; i < newArr2.length; i++) {
              if(newArr2[i].id == id){
               index2 = i
             }
            }

             for (let i = 0; i < newArr3.length; i++) {
              if(newArr3[i].id == id){
               index3= i
             }
            }



            if(index != -1){
              newArr.splice(index,1)
            }
            if(index2 != -1){
              newArr2.splice(index2,1)
            }
            if(index3 != -1){
              newArr3.splice(index3,1)
            }
            this.bigData = newArr
            this.dataSelected2 = newArr2
            this.dataSelected3 = newArr3
        },
        renderSuggestion(suggestion) {
            const character = suggestion.item;
              if( character.type.id == 1 ){
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
                  }else if(character.type.id == 2){
                      return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                                  <div  src="/assets/img/profiles/l-1.jpg"
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
                              </b-card>;
                  }else if(character.type.id == 3){
                      return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                                  <div  src="/assets/img/profiles/l-1.jpg"
                                      alt="Card image cap"
                                      class="align-self-center list-thumbnail-letters rounded-circle small mr-2"
                                      style={{ background: "white", color: 'black', border: "5px solid black" }}>TH
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
                                  <div  src="/assets/img/profiles/l-1.jpg"
                                      alt="Card image cap"
                                      class="align-self-center list-thumbnail-letters rounded-circle small mr-2"
                                      style={{ background: "white", color: 'black', border: "5px solid black" }}>???
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
            let ada = this.check(suggestion.item.no);
            if(!ada){
                let data = {
                    no: suggestion.item.no,
                    name: suggestion.item.name,
                    warna: suggestion.item.color,
                    vs: suggestion.item.vs,
                    balance: suggestion.item.balance,
                    id : suggestion.item.id

                }

                //data = this.fetchAgain(data)
                // if(suggestion.item.type.id == 1)this.dataSelected1.push(data);
                // else if(suggestion.item.type.id == 1)this.dataSelected2.push(data); //nanti ganti 2 ya
                // else this.dataSelected3.push(data);
                this.fetchAgain(data,false)
            }
            return suggestion.item.name;
        },
        returnColor(a){
            const style = {
                background: "#"+a,
            }
            return style
        },
        fetchAgain(data, cek){
          let id = null;
          if(cek) {
            id = data
          }else{
            id = data.id
          }
          let queryString = `
            query{
                itemDetail(item_id:${id}){
                  name
                  no
                  id
                    type{
                      name
                      id
                    }
                     color{
                      id_ral
                      hex_code
                      ind_name
                      eng_name
                    }
                    balance
                    vs_volume_solid
                    agent_item_id
                    recommended_thinner_id
                  detailSellingPrice{
                    priceCategory{
                      id
                      name
                    }
                    price
                  }
                }
              }
          `
          fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: queryString,
            }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.itemDetail;
            })
            .then(resp => {
              if(cek){
                  data = resp
                  data.warna= resp.color;
                  data.no = resp.no;
                  data.name = resp.name;
                  data.vs= resp.vs_volume_Solid;
                  data.balance = resp.balance;
                 // this.bigData.push(data)
              }
                data.price = resp.detailSellingPrice
                data.agent_item_id = resp.agent_item_id;
                data.recommended_thinner_id = resp.recommended_thinner_id;
                if(resp.agent_item_id != null && resp.agent_item_id!=0){
                  this.fetchAgain(resp.agent_item_id, true)
                }

                 if(resp.recommended_thinner_id != null && resp.recommended_thinner_id != 0){
                  this.fetchAgain(resp.recommended_thinner_id, true)
                }

                if(resp.type.id != null){
                  if(resp.type.id == 1)this.dataSelected1.push(data);
                  else if(resp.type.id == 2)this.dataSelected2.push(data); //nanti ganti 2 ya
                  else this.dataSelected3.push(data);
                }
                   this.bigData.push(data);
            })
         // return data
        },
        check(a){
            let kembar = false;
            this.bigData.forEach(element => {
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
            'Authorization' :'Bearer '+this.currentUser.jwt
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
            return text.data.items;
        })
        .then(resp => {
            this.isLoad = true;
            this.dataItem = resp;
        })
    },
    computed:{
        ...mapGetters({
          currentUser: "currentUser",

        })
    }
};
</script>
