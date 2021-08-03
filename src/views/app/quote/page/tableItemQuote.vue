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
              <template slot="name" slot-scope="props" >
                     <p style="font-size:5 pt" >{{props.rowData.item_id}}</p>
                     <p style="font-size:10pt" ><strong>{{props.rowData.item_name}}</strong></p>
              </template>
              <template slot="harga" slot-scope = "props">
                    {{props.rowData.price | currency}}
              </template>
              <template slot="subtotal" slot-scope ="props">
                  {{props.rowData.subtotal | currency}}
              </template>
            </vuetable>
        </div>
    </div>
</template>
<script>
import  Vuetable from "vuetable-2/src/components/Vuetable";

export default  {
  components : {
    vuetable : Vuetable
  },
  props : ["dataComponent"],
  data (){
    return  {
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
             name: "coat",
             title : "Coat",
             dataClass : "text-muted",
             width:"5%"
           },

           {
             name : "dry_film_thickness",
             title : "DFT",
             dataClass : "text-muted",
             width : "5%"
           },
            {
              name : "liter",
              title : "Liter",
              dataClass : "text-muted",
              width : "5%"
            },
            {
              name : "loss",
              title : "Loss",
              dataClass : "text-muted",
              width : "5%"
            },
           {
             name : "theoritical",
             title : "Theoritical",
             dataClass : "text-muted",
             width  : "5%"
           },

           {
             name : "practical",
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
           }
        ]
    }
  }
}
</script>
