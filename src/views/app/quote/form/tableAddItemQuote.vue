<template>
<div>
  <div class="row">
      <div class="col-12">
             <vuetable
                          ref="vuetable"
                          style="display:block; overflow-x:auto;width:auto"
                          :api-mode="false"
                          :fields="fields"
                          :data="dataComponent.selectedItem"
                          @vuetable:row-changed="countAll"

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
                <template slot="coat" slot-scope="props" v-if="props.rowData.type.id == 1">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.coat"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="vol" slot-scope="props" >
                      <b-form-input
                          type="number"
                          v-model="props.rowData.vol"
                          @change="countAll"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="dft" slot-scope="props" v-if="props.rowData.type.id == 1">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.dft"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="loss" slot-scope="props" v-if="props.rowData.type.id == 1">
                      <b-form-input
                          type="number"
                          v-model="props.rowData.loss"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        />
                </template>
                <template slot="theory" slot-scope="props" v-if="props.rowData.type.id == 1">
                   {{
                     theory (props.rowData)


                   }}
                </template>
                <template slot="wft" slot-scope = "props" v-if="props.rowData.type.id == 1">
                    {{Math.round((props.rowData.dft/props.rowData.coat)*100)/100}}
                </template>
                <template slot="harga" slot-scope="props" >
                    {{props.rowData.price.price | currency}}
                </template>
                <template slot="subtotal" slot-scope = "props">
                    {{subtotal(props.rowData)|currency}}
                </template>
                <template slot="practical" slot-scope = "props" v-if="props.rowData.type.id == 1">
                  {{practical(props.rowData)

                  }}
                </template>
                <template slot="btndel" slot-scope="props">
                    <b-button class=" btn mb-1" variant="danger default" @click="deleteItem(props.rowData.id)" v-if="props.rowData.isItem == true">Delete <i class="simple-icon-close"></i></b-button>
                    <b-button class=" btn mb-1" variant="danger default" @click="deleteItem(props.rowData.item_id)" v-else>Delete <i class="simple-icon-close"></i></b-button>
                </template>
            </vuetable>
      </div>

  </div>
   <b-row>
          <b-colxx xxs = "4" xl="4">
              Total Area : {{dataComponent.luas}}
          </b-colxx>
            <b-colxx xxs = "4" xl="4">
              Total Volume : {{totalVol}}
          </b-colxx>
            <b-colxx xxs = "4" xl="4">
              Total : {{totalHarga | currency}}
          </b-colxx>
  </b-row>
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
      vuetable :Vuetable,
    },
  props : ["dataComponent"],
  methods : {
      subtotal(props){
        props.subtotal = props.price[0].price * props.vol
        return props.subtotal
      },
      countAll(value){
        let dttotal = this.dataComponent.selectedItem
        let totalhrg = 0;
        let total = 0
        for(let i=0; i<dttotal.length; i++){
          totalhrg = totalhrg+ parseInt(dttotal[i].vol )* parseInt(dttotal[i].price[0].price);
           total = total+ parseInt(dttotal[i].vol);
        }
        this.dataComponent.total_harga = totalhrg;
        this.dataComponent.volume_total = total
        this.totalVol = total
        this.totalHarga = totalhrg

      },
      practical(data){
       return data.practical =   Math.round(data.theory * (1- data.loss/100)*100)/100
      },
       deleteItem(id){
          let data = this.dataComponent.selectedItem;
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
          this.dataComponent.selectedItem = data
          console.log(this.dataComponent.selectedItem.length)
      },
      calculate_vol(props,rowData){
          let kemasan = Math.round((props.luas / rowData.selectedItem)*100)/100
          let multiplier  = 0;
          if(rowData.agent_item_id){

          }else{
              multiplier = rowData.liter;
          }
      },

      dataPrice(val){
        return JSON.parse(JSON.stringify( val))
      },
      theory(data){
        return data.theory= Math.round((data.coat *10 /data.dft)*100)/100
      },


      //  countTotal(){
      //       let data = this.dataComponent.selectedItem;
      //       let total = 0
      //       let volume = 0
      //       console.log("dataTableItem" + data.length)
      //       for(let i=0; i< data.length; i++){
      //         console.log("ah")
      //         total = total + parseInt(data[i].subtotal);
      //         volume = volume + parseInt(data[i].vol);
      //       }

      //       this.dataComponent.total_harga = total;
      //       this.dataComponent.volume_total = volume
      //         console.log(this.dataComponent.volume_total)
      //       return [this.dataComponent.total_harga,  this.dataComponent.volume_total]
      //   },
  },
  data(){
    return {
      totalVol : 0,
      totalHarga : 0,
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
          //   {
          //     name : "__slot:theory",
          //     title : "Theory",
          //     dataClass : "text-muted",
          //     width : "5%"
          //   },
          //   {
          //    name : "vsl",
          //    title : "VS Volume",
          //    dataClass : "text-muted",
          //    width : "5%"
          //  },
          //  {
          //    name : "__slot:loss",
          //    title : "LOSS",
          //    dataClass : "text-muted",
          //    width : "5%"
          //  },
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
             name : "__slot:subtotal",
             title : "Subtotal",
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
