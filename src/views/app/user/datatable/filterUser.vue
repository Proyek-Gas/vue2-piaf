<template>
  <b-modal id="modalright" ref="modalright" title="Filter Item" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12">
            <b-form-group label="Status" v-if="vueSelected == '1'">
                 <v-select v-model="dataReturn.status" :options="ListItemStatus" :reduce="ListItemStatus => ListItemStatus.value" label="name" placeholder="Silahkan Pilih Status"  />
            </b-form-group>
            <b-form-group label="Role" v-if="vueSelected == '2'">
                <v-select v-model="dataReturn.role" :options="ListRole" multiple :reduce="ListRole => ListRole.id" label="name" placeholder="Silahkan Pilih Role"  />
            </b-form-group>
            <b-form-group label="Omzet Rupiah " v-if="vueSelected == '3'">
                 Minimum :
                <b-form-input type="number" v-model="dataReturn.omzetrupiahmin"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.omzetrupiahmax"  placeholder="Maximum" />
            </b-form-group>
            <b-form-group label="Omet Liter" v-if="vueSelected == '4'">
                Minimum :
                <b-form-input type="number" v-model="dataReturn.omzetlitermin"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.omzetlitermax"  placeholder="Maximum" />
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
import { mapGetters } from "vuex";

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
          label : "Role"
        },
        {
          value : "3",
          label : "Omzet Rupiah"
        },
        {
          value : "4",
          label : "Omzet Liter"
        },

      ],

      ListItemStatus : [
        {
          name : "aktiv",
          value : 1
        },
        {
          name : "non aktiv",
          value : 0
        },
        {
          name : "all",
          value : -1
        }
      ],
      ListRole : [],
      dataReturn : {
        status : -1,
        role : [],
        omzetlitermin : 0,
        omzetlitermax : 0,
        omzetrupiahmin : 0,
        omzetrupiahmax :0
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
        status : -1,
        role : [],
        omzetlitermin : 0,
        omzetlitermax : 0,
        omzetrupiahmin : 0,
        omzetrupiahmax : 0
      }
    }

  },
  mounted(){
       fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :'Bearer '+this.currentUser.jwt
        },
        body: JSON.stringify({
          query: `
            query{roles{
              id
              name
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
            return text.data.roles;
        })
        .then(resp => {
          this.ListRole = resp
        });
  },
  computed:{
    ...mapGetters({
      currentUser: "currentUser",

    })
  }
};
</script>
