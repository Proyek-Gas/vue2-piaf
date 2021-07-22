<template>
  <b-modal id="modalright" ref="modalright" title="Filter Customer" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12">
            <b-form-group label="Status">
                <v-select
                  v-model="vueSelectForm.multiple"
                  multiple
                  :options="selectData"
                  :dir="direction"
                />
            </b-form-group>
        </b-colxx>
     </b-row>
     <template slot="modal-footer">
         <b-button variant="danger" @click="$emit('answers',null);hideModal('modalright');reset()">Reset</b-button>
         <b-button variant="primary" @click="$emit('answers', dataReturn);hideModal('modalright')" class="mr-1">Apply</b-button>
      </template>
   </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "v-select": vSelect,
     datepicker: Datepicker,
  },
  data() {
    return {
     vueSelected : "",
      selectData: [
        {
          value : "1",
          label : "Status"
        },
        {
          value : "2",
          label : "User Create"
        },
        {
          value : "3",
          label : "Status"
        },
      ],
      ListWarna : [],
      dataReturn : {
        status : []
      }
    };
  },
  methods: {
    hideModal (refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
     returnColor(a){
      const style = {
          "background-color": "#"+a,
          "color" : "white"

      }
      return style
  },
    reset(){
      this.vueSelected = ""
      this.dataReturn = {
        status : []
      }
    }

  },
  mounted(){
      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query{ralColors{
            id_ral
            ind_name
            eng_name
            hex_code
          }
          }
        `,
          variables: {
          },
        }),
      }).then(function(response) {
          return response.json()
      }).then(function(text) {
        console.log(text.data)
          return text.data.ralColors;
      })
      .then(resp => {
        this.ListWarna = resp
      });
  }
};
</script>
