<template>
  <div class="row">
      <div class="col-12">
             <vuetable
                          ref="vuetable"
                          style="display:block; overflow-x:auto;width:auto"
                          :api-mode="false"
                          :fields="fields"
                          :data="dataComponent"

              >
                <template slot="name" slot-scope="props">
                  <div v-if="props.rowData.isItem == true">
                      <p style="font-size:5 pt" >{{props.rowData.id}}</p>
                         <p style="font-size:10pt" ><strong>{{props.rowData.name}}</strong></p>
                  </div>
                   <div v-else>
                       <p style="font-size:5 pt">{{props.rowData.id}}</p>
                       <p style="font-size:10pt"><strong>{{props.rowData.name_s}}</strong></p>
                   </div>
                </template>
                <template slot="coat" slot-scope="props" v-if="props.rowData.isItem == false">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.coat"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="vol" slot-scope="props" v-if="props.rowData.isItem == false">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.vol"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="dft" slot-scope="props" v-if="props.rowData.isItem == false">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.dft"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="loss" slot-scope="props" v-if="props.rowData.isItem == false">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.loss"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="theory" slot-scope="props">
                   {{theory (props.rowData)}}
                </template>
                <template slot="wft" slot-scope = "props">
                    {{Math.round((props.rowData.dft/props.rowData.coat)*100)/100}}
                </template>
                <template slot="harga" slot-scope="props">
                    {{props.rowData.price.price | currency}}
                </template>
                <template slot="practical" slot-scope = "props">
                  {{Math.round(props.rowData.theory * (1- props.rowData.loss/100)*100)/100}}
                </template>
                <template slot="btndel" slot-scope="props">
                    <b-button class=" btn mb-1" variant="danger default" @click="deleteItem(props.rowData.id)" v-if="props.rowData.isItem == true">Delete <i class="simple-icon-close"></i></b-button>
                    <b-button class=" btn mb-1" variant="danger default" @click="deleteItem(props.rowData.item_id)" v-else>Delete <i class="simple-icon-close"></i></b-button>
                </template>
             </vuetable>
      </div>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
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

export default{
  components : {
      vuetable :Vuetable
    },
  props : ["dataComponent"],
  methods : {
       deleteItem(id){
          let data = this.dataComponent;
          let index = -1;
          for(let i=0; i<data.length; i++){
            if(data[i].isItem){
              if(data[i].id == id){
                index = i;
              }
            }else{
              if(data[i].item_id == id){
                index = i;
              }
            }
          }
          if(index != -1){
            data.splice (index,1)
          }
          this.dataComponent = data
          console.log(this.dataComponent.length)
      },
      theory(data){
        return data.theory= Math.round((data.coat *10 /data.dft)*100)/100
      }
  },
  data(){
    return {
        fields : [
             {
             name : "__slot:name",
             title : "Nama",
             titleClass: "",
              dataClass: "text-muted",
              width : "15%"
           },
          //  {
          //    name: "__slot:warna",
          //    title: "Warna",
          //    dataClass:"text-muted",
          //    width: "10%"
          //  },
           {
             name: "__slot:coat",
             title : "Coat",
             dataClass : "text-muted",
             width:"5%"
           },

           {
             name : "__slot:dft",
             title : "DFT",
             dataClass : "text-muted",
             width : "5%"
           },
            {
              name : "__slot:wft",
              title : "WFT",
              dataClass : "text-muted",
              width : "5%"
            },
            {
              name : "__slot:theory",
              title : "Theory",
              dataClass : "text-muted",
              width : "5%"
            },
           {
             name : "__slot:loss",
             title : "LOSS",
             dataClass : "text-muted",
             width : "5%"
           },
           {
             name : "__slot:vol",
             title : "VOL",
             dataClass :"text-muted",
             width : "5%"
           },
           {
             name : "__slot:practical",
             title : "Practical",
             dataClass : "text-muted",
             width  : "5%"
           },
           {
             name : "__slot:harga",
             title : "Harga",
             dataClass : "text-muted",
             width : "10%"
           },

           {
             name : "__slot:btndel",
             title : "",
             dataClass : "text-muted",
             width : "10%"
           }
        ]
    }
  }
  

}
</script>
