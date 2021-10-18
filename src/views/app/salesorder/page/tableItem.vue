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
              <template slot="color" slot-scope="props">
                  <div class="btn btn-sm" v-if="props.rowData.color != null" v-bind:style="returnColor(props.rowData.color.hex_code)">{{props.rowData.color.eng_name}}</div>
              </template>
              <template slot="price" slot-scope="props">
                <div v-if="props.rowData.detailSellingPrice != null">  {{props.rowData.detailSellingPrice.price | currency}}</div>
              </template>
           </vuetable>
      </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";

export default{
 props : ['dataComponent'],
  computed : {
     ...mapGetters({ currentUser : "currentuser"})
  },
  components : {
    vuetable: Vuetable,

  },
  mounted(){
    console.log(this.dataComponent)
  },
  methods : {
     returnColor(a){
      const style = {
          "background-color": "#"+a,
          "color" : "white"

      }
        return style
    },
  },

  data(){
    return {

        fields : [
          {
             name : "id",
              title : "id",
              titleClass: "",
               sortField: "id",
              dataClass: "text-muted",
              width : "5%"
          },
          {
            name : "name",
            title : "Name",
            titleClass : "",
             sortField: "name",
            dataClass : "text-muted",
            width : "35%"
          },
          {
            name : "itemCategory.name",
            title : "Kategori",
            titleClass : "",
             sortField: "itemCategory.name",
            dataClass : "text-muted",
            width : "10%"
          },
          {
            name : "__slot:color",
            title : "Warna",
            titleClass : "",
            dataClass : "text-muted",
            width : "20%"
          },
          {
            name : "__slot :price",
            title : "Price",
            titleClass : "",
             sortField: "price",
            dataClass : "text-muted",
            width : "30%"
          }
        ],

    }
  }
}
</script>
