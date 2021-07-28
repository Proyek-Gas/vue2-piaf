<template>
  <div class="col-12">
    <div class="row">
         <vuetable
              ref="vuetable"
              style="display:block; overflow-x:auto;width:auto"
              :api-mode="false"
              :fields="fields"
              :data="dataComponent"
          >
              <template slot="cek" slot-scope="props">
                  <b-form-group>
                    <b-form-checkbox v-model="props.rowData.action"

                      @change="check($event,props.rowData)"
                      ></b-form-checkbox>
                  </b-form-group>
              </template>
              <template slot="cek" slot-scope="props">
                  <b-form-group>
                    <b-form-checkbox v-model="props.rowData.action"
                      ></b-form-checkbox>
                  </b-form-group>
              </template>
               <template slot="name" slot-scope ="props">
                    <p style="font-size:5 pt">{{props.rowData.no}}</p>
                    <p style="font-size:10pt"><strong>{{props.rowData.name}}</strong></p>
                </template>
                  <template slot="warna" slot-scope ="props">
                  <div  v-bind:style="returnColor(props.rowData.warna.hex_code)">
                    <p style="font-size:5 pt;">{{props.rowData.warna.eng_name}}</p>
                    <p style="font-size:10pt;margin-top:-10px"><strong>{{props.rowData.warna.ind_name}}</strong></p>
                  </div>
                </template>
                <template slot="harga" slot-scope="props">
                     <div v-if="props.rowData.price.length ">
                        <p style="font-size:5 pt;">{{props.rowData.price.priceCategory.name}}</p>
                        <p style="font-size:10pt;margin-top:-10px"><strong>{{shortNumber(props.rowData.price)}}</strong></p>
                     </div>
                </template>
                 <template slot="btndel" slot-scope="props">
                    <b-button class=" btn mb-1" variant="danger default" @click="$emit('btnDel',props.rowData);deleteItem(props.rowData.no)">Delete <i class="simple-icon-close"></i></b-button>
                </template>
          </vuetable>
    </div>
  </div>
</template>
<script>

import Vuetable from "vuetable-2/src/components/Vuetable";

export default{
    components :{
        vuetable : Vuetable
    },
    props : ["dataComponent"],
    methods :{
       returnColor(a){
          const style = {
              "background-color": "#"+a,
              "color" : "white",
              "padding" : "6%"
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
      shortNumber(n) {
              if (n < 1e3) return n;
              else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
              else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
              else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
              else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
          },
    },
    data(){
      return {
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
                name: "__slot:warna",
                title: "Warna",
                titleClass: "",
                dataClass: "text-muted",
                width:"15%"
                },
                {
                name: "itemCategory.name",
                title: "Kategori",
                titleClass: "",
                dataClass: "text-muted",
                width:"10%"
                },
                {
                  name:"balance",
                  title:"Balance",
                  titleClass: "",
                  dataClass:"text-muted",
                  width: "5%"
                },
                {
                  name:"__slot:harga",
                  title : "Harga",
                  titleClass : "",
                  dataClass :"text-muted",
                  width : "10%"
                },
                // {
                // name: "balance",
                // title: "Balance",
                // titleClass: "",
                // dataClass: "text-muted",
                // width:"25%"
                // }
                  {
                    name : "__slot:btndel",
                    title : "Action",
                    dataClass : "text-muted",
                    width : "10%"
                }
            ],
      }
    }
}
</script>
