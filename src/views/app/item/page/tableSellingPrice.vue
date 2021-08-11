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
              <template slot="price" slot-scope="props">
                {{props.rowData.price | currency}}
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

  data(){
    return {

        fields : [
          {
             name : "priceCategory.id",
              title : "id",
              titleClass: "",
               sortField: "priceCategory.id",
              dataClass: "text-muted",
              width : "50%"
          },
          {
            name : "priceCategory.name",
            title : "Name",
            titleClass : "",
             sortField: "priceCategory.name",
            dataClass : "text-muted",
            width : "40%"
          },
            {
            name : "__slot :price",
            title : "Price",
            titleClass : "",
             sortField: "price",
            dataClass : "text-muted",
            width : "60%"
          }
        ],

    }
  }
}
</script>
