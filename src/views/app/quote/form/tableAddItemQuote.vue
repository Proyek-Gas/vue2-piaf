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
                     <p style="font-size:5 pt">{{props.rowData.id}}</p>
                    <p style="font-size:10pt"><strong>{{props.rowData.name}}</strong></p>
                </template>
             </vuetable>
      </div>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";

export default{
  components : {
      vuetable :Vuetable
    },
  props : ["dataComponent"],
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
           {
             name: "__slot:warna",
             title: "Warna",
             dataClass:"text-muted",
             width: "10%"
           },
           {
             name: "__slot:coat",
             title : "Coat",
             dataClass : "text-muted",
             width:"5%"
           }
        ]
    }
  }

}
</script>
