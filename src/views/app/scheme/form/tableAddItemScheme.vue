<template>
      <div class="col-12">
            <div class="row">
                    <vuetable
                          ref="vuetable"
                          style="display:block; overflow-x:auto;width:auto"
                          :api-mode="false"
                          :fields="fields"
                          :data="dataComponent"
                           :detail-row-component="detailRow"
                            detail-row-transition="expand"

                      >
                          <template slot="cek" slot-scope="props">
                              <b-form-group>
                                <b-form-checkbox v-model="props.rowData.action"

                                  @change="check($event,props.rowData)"
                                 ></b-form-checkbox>
                              </b-form-group>
                          </template>
                          <template slot="name" slot-scope ="props">
                            <div  @click="cellClicked($event, props.rowData)">
                              <p style="font-size:5 pt">{{props.rowData.no}}</p>
                              <p style="font-size:10pt"><strong>{{props.rowData.name}}</strong></p>
                            </div>
                          </template>
                          <template slot="loss" slot-scope="props">

                                  <b-form-input
                                    type="number"
                                    v-model="props.rowData.loss"
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                  />

                          </template>
                          <template slot="dft" slot-scope="props">

                                  <b-form-input
                                    type="number"
                                    v-model="props.rowData.dft"
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                  />

                          </template>
                          <template slot="coat" slot-scope="props">

                                  <b-form-input
                                    type="number"
                                    v-model="props.rowData.coat"
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                  />
                                  
                          </template>
                           <template slot="harga" slot-scope="props">
                            <div v-if="props.rowData.price.length " style="text-align:right">
                                <p style="font-size:5 pt;">{{props.rowData.price[0].priceCategory.name}}</p>
                                <p style="font-size:10pt;margin-top:-10px"><strong>{{props.rowData.price[0].price | currency}}</strong></p>
                            </div>
                        </template>
                          <template slot="btndel" slot-scope="props">
                              <b-button class=" btn mb-1" variant="danger default" @click="$emit('btnDel',props.rowData);deleteItem(props.rowData.no)">Delete <i class="simple-icon-close"></i></b-button>
                          </template>
                          <!-- <template slot="warna" slot-scope ="props">
                            <div class="btn btn-sm" v-bind:style="returnColor(props.rowData.warna.hex_code)">
                              <p style="font-size:5 pt">{{props.rowData.warna.eng_name}}</p>
                              <p style="font-size:10pt"><strong>{{props.rowData.warna.ind_name}}</strong></p>
                            </div>
                          </template> -->
                      </vuetable>
                      
            </div>
      </div>

</template>
<script>

import Vuetable from "vuetable-2/src/components/Vuetable";
import DetailRow from "./detailRowTableAddItem.vue";

export default{
    props : ["dataComponent","counter"],
    components : {
      vuetable :Vuetable,
    },

    methods : {
        returnColor(a){
          const style = {
              "background-color": "#"+a,
              "color" : "white"
          }
          return style
      },
      deleteItem(id){
          let data = this.dataComponent;
          let index = -1;
          for(let i=0; i<data.length; i++){
            if(data[i].no == id){
              index = i;
            }
          }
          if(index != -1){
            data.splice (index,1)
          }
          this.dataComponent = data
          console.log(this.dataComponent.length)
      },
         cellClicked ($event, data) {
          // console.log('cellClicked: ', $event)
          this.$refs.vuetable.toggleDetailRow(data.id)
        },
      //ini belum dipake karena tidak bisa
       check:function(e,data){
          console.log(e)
          console.log(data)
          if(e == true){
            this.counter = this.counter+1;
          }
          else{
            if(this.counter>0){
              this.counter = this.counter-1;
            }
          }
        },

    },
    data(){
      return {
        detailRow : DetailRow,
         fields: [
           {
             name : "__slot:cek",
             title : "",
            titleClass: "",
            dataClass: "text-muted",
             width : "2%"
           },
            {
                name: "__slot:name",
                title: "No",
                titleClass: "",
                dataClass: "text-muted",
                width:"15%"
            },
            {
              name : "__slot:loss",
              title : "Loss(%)",
              dataClass: "text-muted",
              width: "5%"
            },
             {
              name : "__slot:dft",
              title : "DFT(%)",
              dataClass: "text-muted",
              width: "5%"
            },
            {
              name : "__slot:coat",
              title : "Coat(%)",
              dataClass: "text-muted",
              width: "5%"
            },

            {
              name : "__slot:harga",
              title : "Harga",
              dataClass : "text-muted",
              width : "10%"
            },
            {
              name : "__slot:btndel",
              title : "Action",
              dataClass : "text-muted",
              width : "10%"
            },
          ],
      }
    }
}
</script>

