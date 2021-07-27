<template>
  <b-modal id="modalright" ref="modalright" title="Filter Quote" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12" >
            <b-form-group label="Status" v-if="vueSelected == '1'">
                <v-select
                  v-model="dataReturn.status"
                  multiple
                  :options="listQuoteStatus"
                  :reduce="listQuoteStatus => listQuoteStatus.id" label="name" placeholder="Silahkan Pilih Status"
                />
            </b-form-group>

              <b-form-group label="Nama Customer" v-if="vueSelected == '2' && !this.$route.query.id">
                    <v-select
                      label="name"
                      :filterable="false"
                      multiple
                      v-model="dataReturn.customerId"
                      :options="listCust"
                      @search="fetchOptions"
                      :reduce="listCust => listCust.id"
                      @input="onChangeCustomer($event)"
                    >
                      <template slot="no-options">Cari nama Kustomer...</template>
                      <template slot="option" slot-scope="option">
                        <div class="row" >
                          <div class="col-3">  <div
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  class="align-self-center list-thumbnail-letters rounded-circle small"
                >{{showAvatar(option.name)}}</div></div>
                        <div class="col-9 pt-2 " style="overflow: hidden;
                         text-overflow: ellipsis;">
                            {{ option.name }}
                        </div>
                        </div>
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                          {{ option.name }}
                        </div>
                      </template>
                      <template slot="spinner" slot-scope="spinner">
                        <div class="spinner-border text-primary" v-show="spinner"></div>
                      </template>
                    </v-select>
            </b-form-group>

            <b-form-group label="Total" v-if="vueSelected == '3'">
               Minimum :
                <b-form-input type="number" v-model="dataReturn.minimum"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.maximum"  placeholder="MAximum" />
            </b-form-group>
            <b-form-group label="Updated At" v-if="vueSelected == '4'">
              Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateUpdateAwal"
                  format ="yyyy-MM-dd"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateUpdateAkhir"
                   format ="yyyy-MM-dd"
                ></datepicker>
            </b-form-group>
              <b-form-group label="Created At" v-if="vueSelected == '5'">
              Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateCreateAwal"
                  format ="yyyy-MM-dd"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateCreateAkhir"
                   format ="yyyy-MM-dd"
                ></datepicker>
            </b-form-group>
            <b-form-group label="User" v-if="vueSelected == '6'">
               <v-select
                      label="name"
                      :filterable="false"
                      multiple
                      v-model="dataReturn.userId"
                      :options="listUser"
                      :reduce="listUser => listUser.id"
                    >
                      <template slot="no-options">Cari nama Kustomer...</template>
                      <template slot="option" slot-scope="option">
                        <div class="row" >
                          <div class="col-3">  <div
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  class="align-self-center list-thumbnail-letters rounded-circle small"
                >{{showAvatar(option.name)}}</div></div>
                        <div class="col-9 pt-2 " style="overflow: hidden;
                         text-overflow: ellipsis;">
                            {{ option.name }}
                        </div>
                        </div>
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                          {{ option.name }}
                        </div>
                      </template>
                      <template slot="spinner" slot-scope="spinner">
                        <div class="spinner-border text-primary" v-show="spinner"></div>
                      </template>
                    </v-select>
            </b-form-group>
            <b-form-group label ="Project" v-if="vueSelected =='7'">
                <v-select multiple v-model="dataReturn.projectId" :options="listProjects" :reduce="listProjects => listProjects.id" label="name" placeholder="Silahkan Pilih Projects"  />
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
     listQuoteStatus : [],
     listProjectClone : [],
     listProjects : [],
      selectData: [
        {
          value : "1",
          label : "Status"
        },
        {
          value : "2",
          label : "Customer"
        },
        {
          value : "3",
          label : "Total"
        },
        {
          value : "4",
          label : "Updated-At"
        },
        {
          value : "5",
          label : "Created-At"
        },
        {
          value : "6",
          label : "User Create"
        },
        {
          value : "7",
          label : "Project"
        }

      ],
      listCust : [],
      listUser : [],
      dataReturn : {
        status : [],
        userId : [],
        customerId : [],
        projectId : [],
        minimum : 0,
        maximum : 0,
        dateCreateAwal : "",
        dateCreateAkhir  : "",
        dateUpdateAwal : "",
        dateUpdateAkhir : "",
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
      this.listProjects = this.listProjectClone
      this.dataReturn = {
        status : [],
        customerId : [],
        projectId : [],
        userId  : [],
        minimum : 0,
        maximum : 0,
        dateCreateAwal : "",
        dateCreateAkhir  : "",
        dateUpdateAwal : "",
        dateUpdateAkhir : "",
      }
    },
    onChangeCustomer($event){
        if(this.dataReturn.customerId.length != null){
            this.fetchAgain(this.makeArray(this.dataReturn.customerId))
        }else{
          this.listProjects = this.listProjectClone
        }
    },
    makeArray(customerId){
         let newStyle = `[`
            for(let i=0; i<customerId.length;i++){
              newStyle = newStyle+ `"${customerId[i]}",`
            }
           newStyle = newStyle +`]`
           return newStyle
    },
    showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
    },
     fetchOptions(search, loading) {
      loading(true);
      setTimeout(() => {
        this.listCust = this.listCust.filter(row=>{
           return row.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
        })
        loading(false)
      },2000);
    },
    fetchAgain(customerId){
            let querystring = `
                query{ projects (filter: {customer_id : ${customerId}}){
                          count
                          projects{
                              id
                              name
                          }}
                          }
              `
              console.log(querystring)
           fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: querystring,
            }),
          })
          .then(function(response) {
            return response.json()
          })
          .then(function(text) {
            console.log(text)
            return text.data.projects.projects;
          })
          .then(resp => {
              this.listProjects = resp
          })
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
         query{
              quoteStatuses{
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
          return text.data.quoteStatuses;
      })
      .then(resp => {
        this.listQuoteStatus = resp
      });



       fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query{ customers {
                        count
                        customers{
                            id
                            name
                            workPhone
                        }}
                        }
            `,
          }),
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(text) {
          console.log(text)
          return text.data.customers.customers;
        })
        .then(resp => {
            this.listCust = resp
        })


        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query{ projects {
                        count
                        projects{
                            id
                            name
                        }}
                        }
            `,
          }),
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(text) {
          console.log(text)
          return text.data.projects.projects;
        })
        .then(resp => {
            this.listProjects = resp
            this.listProjectClone = resp
        })

          fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query{ users {
                        count
                        users{
                               id
                              name
                                photo
                                role{
                                  id
                                  name
                                }
                        }}
                        }
            `,
          }),
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(text) {
          console.log(text)
          return text.data.users.users;
        })
        .then(resp => {
            this.listUser = resp
        })

  }
};
</script>
