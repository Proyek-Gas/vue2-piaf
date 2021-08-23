<template>
  <div>
    <datatable-heading
      :title="$t('menu.userTable')"
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
    ></datatable-heading>

    <b-row class="mb-3">
      <b-colxx xxs="6">
        <b-button class="mb-1"  v-b-modal.modalright variant="success " >Filter</b-button>
            <!-- <filter-item v-on:answers="onUpdateAnswer"></filter-item> -->
      </b-colxx>
      <b-colxx xxs="6" style="text-align:left">
          <h5 v-if="tag.length >0">Filter By</h5>
          <b-badge style="margin :2px" variant="primary" v-for="tg in tag" :key="tg"  v-b-modal.modalright>{{tg}} </b-badge>
      </b-colxx>
    </b-row>

    <b-row>
      <template v-if="isLoad">
        <b-colxx xxs="12">
          <b-card>
            <vuetable
              ref="vuetable"
              style="display:block; overflow-x:auto;width:auto"
              :api-mode="false"
              :fields="fields"
              :per-page="perPage"
              :data-manager="dataManager"
              detail-row-transition="expand"
              pagination-path="pagination"
              class="order-with-arrow"
              @vuetable:pagination-data="onPaginationData"
            >
            <template slot="avatar" slot-scope="props">
                  <div
                    src="/assets/img/profiles/l-1.jpg"
                    alt="Card image cap"
                    class="align-self-center list-thumbnail-letters rounded-circle small"
                  >
                  {{showAvatar(props.rowData.name)}}
                  </div>
                    <b-badge variant="success"  class="position-absolute badge-top-left" style="margin-top:-1vh" v-if="props.rowData.isInAccurate == true"><i class="simple-icon-check"></i></b-badge>
            </template>
            <template slot="name" slot-scope="props">
              <b-row>
                  <b-colxx xs='12'><h4>{{props.rowData.name}}</h4></b-colxx>
              </b-row>
              <b-row>
                <b-colxx xs="12"><b-badge>{{props.rowData.role.name}}</b-badge></b-colxx>
              </b-row>
            </template>
            <template slot="omzet_rupiah" slot-scope="props">
              {{shortNumber(props.rowData.omzet_rupiah)}}
            </template>
            <template slot="omzet_liter" slot-scope="props">
              {{Number(props.rowData.omzet_liter).toFixed(2)}}
            </template>
            <template slot="refence_db" slot-scope="props">
              {{props.rowData.reference_accurate_id}}
            </template>
            <template slot="status" slot-scope="props">
                <b-badge v-if="props.rowData.status == 1" variant="primary">Aktif</b-badge>
                <b-badge v-else variant="danger">Non Aktif</b-badge>
            </template>
            <template slot="action" slot-scope="props">
                <b-dropdown text="Actions" variant="outline-secondary">
                  <b-dropdown-item :to="movePageDetail(props.rowData.id)">Detail</b-dropdown-item>
                  <b-dropdown-item :to="movePageEdit(props.rowData.id)">Edit</b-dropdown-item>
              </b-dropdown>
            </template>
          </vuetable>
        </b-card>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-row>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onContextMenuAction('copy')">
        <i class="simple-icon-docs" />
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
        <i class="simple-icon-drawer" />
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('delete')">
        <i class="simple-icon-trash" />
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import _ from "lodash";
//import MyDetailRow from "./MyDetailRow";
import filterUser from "./filterUser"

import { mapGetters } from "vuex";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-user" : filterUser
   //"my-detail-row" : MyDetailRow //->ini ga error namun ga ada datanya


  },
  data() {
    return {
      isLoad: false,
   //   detailRow : MyDetailRow,
      dataClone : [],
      loadCek : true,
      fields: [
        {
          name:"__slot:avatar",
          title:"",
          titleClass: "",
          dataClass:"text-muted"
          , width :"5%"
        },
        {
          name: "__slot:name",
          sortField: "name",
          title: "Name",
          titleClass: "",
          dataClass: "text-muted",
          width:"15%"

        },
        {
          name:"email",
          sortField: "email",
          title : "Email",
          titleClass : "",
          dataClass : "",
          width: "10%"
        },
        {
          name:"__slot:omzet_rupiah",
          sortField:"omzet_rupiah",
          title: "Omzet Rupiah",
          titleClass: "",
          dataClass : "",
          width : "10%"
        },
        {
          name: "__slot:omzet_liter",
          sortField: "omzet_liter",
          title: "Omzer Liter",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"10%"
        },
        {
          name: "__slot:refrence_db",
          title: "Refrence DB",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"5%"
        },

        {
          name: "__slot:status",
          title :"Status",
          sortField : "status",
          width: "5%",
          titleClass: "center aligned",
          dataClass: "center aligned",
        },
        {
          name: "__slot:action",
          title :"",
          width: "15%",
          titleClass: "center aligned",
          dataClass: "center aligned",
        },

      ],
      sort: "",
      perPage: 5,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      data: [],
      selectedItems: [],
      tag: []
    };
  },
  // watch: {
  //   data(newVal, oldVal) {
  //     this.$refs.vuetable.refresh();
  //   },
  // },
  mounted() {
    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + this.currentUser.jwt
        },
        body: JSON.stringify({
          query: `
        query{
  users{
    count
    users{
      id
      name
      omzet_liter
      omzet_rupiah
      email
      status
      photo
      role{
        name
        id
      }
      reference_accurate_id
    }
  }
}
              `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
        return text.data.users.users;
    })
    .then(resp => {
        this.data = resp;
        this.dataClone = resp;
        this.isLoad = true
      });

  },
  methods: {
    movePageDetail(val){
      // console.log(val);
			// window.location = window.location.href+"/iDetail?id="+val;
      return "itemTable/iDetail?id=" + val;
		},
    movePageEdit(val){
			return "itemTable/iDetail/edit?id="+val;
		},
    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      console.log(paginationData);
      this.$refs.pagination.setPaginationData(paginationData);
    },
    //  onCellClicked (data, field, event) {
    //     console.log('cellClicked: ', field.name)
    //     console.log(data.id)
    //     this.$refs.vuetable.toggleDetailRow(data.id)
    //   },
    // cellClicked ($event, data) {
    //   // console.log('cellClicked: ', $event)
    //   this.$refs.vuetable.toggleDetailRow(data.id)
    // },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    shortNumber(n) {
        if (n < 1e3) return n;
        else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
        else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
        else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
        else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    },
    dataManager(sortOrder, pagination) {
     // if (this.data.length < 1) return;

      let local = this.data;
      console.log(this.search);
      local = local.filter(row => {
        return row.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ;
      });
      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to),
      };
    },
    changePageSize(perPage) {
      this.perPage = perPage;
      console.log(this.perPage);
      this.$refs.vuetable.refresh();
    },
     showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },
  //   returnColor(a){
  //     const style = {
  //         "background-color": "#"+a,
  //         "color" : "white"

  //     }
  //     return style
  // },
    // onUpdateAnswer: function(newAnswer){
    //     let cek = true;
    //     this.tag =[]
    //     if(newAnswer){
    //       if(newAnswer.name != ""){
    //         this.data = this.data.filter(row => {
    //             return row.name.toLowerCase().indexOf(newAnswer.name.toLowerCase())  !== -1 ;
    //         });
    //           cek = false;
    //           this.tag.push("Nama")
    //       }
    //       if(newAnswer.no != ""){
    //         this.data = this.data.filter(row=>{
    //           return (row.id.toString()).indexOf(newAnswer.no)  !== -1 ;
    //         })
    //         cek = false;
    //         this.tag.push("no")
    //       }

    //       if(newAnswer.warna != ""){
    //           cek = false;
    //           this.data = this.data.filter(row=>{
    //             return row.color.id_ral == newAnswer.warna.id_ral
    //           })
    //         this.tag.push("Warna")
    //       }

    //        if(newAnswer.kategori != ""){
    //           cek = false;
    //           let newdata = []
    //           for(let i=0; i< newAnswer.kategori.length ; i++){
    //            for(let j=0; j<this.data.length; j++){
    //              if(newAnswer.kategori[i] == this.data[j].itemCategory.id){
    //                newdata.push(this.data[j])
    //              }
    //            }
    //           }
    //         this.data = newdata
    //         this.tag.push("Kategori")
    //       }

    //        if(newAnswer.tipe   != ""){
    //           cek = false;
    //           let newdata = []
    //           for(let i=0; i< newAnswer.tipe.length; i++){
    //             for(let j=0; j< this.data.length; j++){
    //               if(newAnswer.tipe [i] == this.data[j].type.id){
    //                 newdata.push(this.data[j])
    //               }
    //             }
    //           }
    //          this.data = newdata
    //         this.tag.push("Tipe")
    //       }
    //     }
    //     if(cek){
    //         this.search = ""
    //       this.data = this.dataClone
    //     }

    //      this.$refs.vuetable.refresh()
    // },
  },

  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
     ...mapGetters({
      currentUser: "currentUser",
    })
  },
};
</script>
