<template>
  <div class="row">
      <div class="col-12">

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
