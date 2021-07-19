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
            <b-form-group label="Nama" v-if="vueSelected == '1'">
                <b-form-input v-model="dataReturn.name"  placeholder="Masukkan Nama"/>
            </b-form-group>
             <b-form-group label="Customer No" v-if="vueSelected == '2'">
                <b-form-input v-model="dataReturn.customerNo"  placeholder="Masukkan customer no"/>
            </b-form-group>
            <b-form-group label="Mobile Phone" v-if="vueSelected == '3'">
                <b-form-input v-model="dataReturn.mobilePhone"  placeholder="Masukkan mobile phone"/>
            </b-form-group>
            <b-form-group label="Work Phone" v-if="vueSelected == '4'">
                <b-form-input v-model="dataReturn.workPhone"  placeholder="Masukkan work Phone"/>
            </b-form-group>
            <b-form-group label="Alamat" v-if="vueSelected == '5'">
                <b-form-input v-model="dataReturn.address"  placeholder="Masukkan alamat"/>
            </b-form-group>
             <b-form-group label="Email" v-if="vueSelected == '6'">
                <b-form-input type="email" v-model="dataReturn.email"  placeholder="Masukkan Email"/>
            </b-form-group>
             <b-form-group label="NPWP" v-if="vueSelected == '7'">
                <b-form-input type="number" v-model="dataReturn.npwp"  placeholder="Masukkan NPWP"/>
            </b-form-group>
            <b-form-group label="Limit Amount Value" v-if="vueSelected == '8'">
              Minimum :
                <b-form-input type="number" v-model="dataReturn.minimum"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.maximum"  placeholder="MAximum" />
            </b-form-group>
            <b-form-group label="Last Project Tanggal" v-if="vueSelected == '9'">
                Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateAwal"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateAkhir"
                ></datepicker>
            </b-form-group>
            <b-form-group label="Kategori harga" v-if="vueSelected == '10'">
                <v-select v-model="dataReturn.priceCategory" :options="ListKategoriHarga" :reduce="ListKategoriHarga=> ListKategoriHarga.id" label="name" placeholder="Silahkan Pilih Kategori Harga"  />
            </b-form-group>
            <b-form-group label="Kategori Kustomer" v-if="vueSelected == '11'">
                <v-select v-model="dataReturn.customerCategory" :options="ListKategoriKustomer" :reduce="ListKategoriKustomer=> ListKategoriKustomer.id" label="name" placeholder="Silahkan Pilih Kategori Kustomer"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <template slot="modal-footer">
         <b-button variant="danger" @click="$emit('answers',null);hideModal('modalright')">Reset</b-button>
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
          label : "Name"
        },
        {
          value : "2",
          label : "Customer No"
        },
        {
          value : "3",
          label : "Mobile Phone"
        },
        {
          value : "4",
          label : "Work Phone"
        },
        {
          value : "5",
          label : "Alamat"
        },
        {
          value : "6",
          label : "Email"
        },
        {
          value : "7",
          label : "NPWP"
        },
        {
          value : "8",
          label : "Limit Amount"
        },
        {
          value : "9",
          label : "Last Project Tanggal"
        },
        {
          value : "10",
          label : "Kategori Harga"
        },
        {
          value : "11",
          label : "Kategori Kustomer"
        },

      ],
      ListKategoriHarga : [],
      ListKategoriKustomer : [],
      dataReturn : {
         name:'',
          email : '',
          mobilePhone : '',
          workPhone :'',
          address : '',
          customerNo :'',
          minimum : 0,
          maximum : 0,
          npwp :0,
          dateAwal:'',
          dateAkhir : '',
          priceCategory : this.value ||'',
          customerCategory : this.value||'',
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

  },
  mounted(){
      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query{priceCategory{
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
          return text.data.priceCategory;
      })
      .then(resp => {
        this.ListKategoriHarga = resp
      });


      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query{customerCategory{
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
          return text.data.customerCategory;
      })
      .then(resp => {
        this.ListKategoriKustomer = resp
      });

  }
};
</script>
