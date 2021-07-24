<template>
  <div>
    <datatable-heading
      :title="$t('menu.quoteTable')"
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
            <filter-quote v-on:answers="onUpdateAnswer"></filter-quote>
         <b-button class="mb-1" variant="primary ">Add Quote</b-button>
      </b-colxx>
      <b-colxx xxs="6" style="text-align:left">
          <h5 v-if="tag.length >0">Filter By</h5>
          <b-badge style="margin :2px" variant="primary" v-for="tg in tag" :key="tg"  v-b-modal.modalright>{{tg}} </b-badge>
      </b-colxx>
    </b-row>

    <b-row>
      <template v-if="isLoad">
        <b-colxx xxs="12">
          <b-card class="vuetable-wrapper">
            <vuetable
              ref="vuetable"
              style="display:block; overflow-x:auto;width:auto"
              :api-mode="false"
              :fields="fields"
              :per-page="perPage"
              class="order-with-arrow"
              :data-manager="dataManager"
              wrapper-class="vuetable-wrapper"
              pagination-path="pagination"
              @vuetable:pagination-data="onPaginationData"
              @vuetable:cell-clicked="onCellClicked"
            >
              <template slot="status" slot-scope="props">
                <b-badge v-if="props.rowData.status.id == 1" variant="primary" :id="'tool-nt'+props.rowData.id"> {{props.rowData.updated_at}}</b-badge>
                <b-badge v-if="props.rowData.status.id == 2" variant="warning" :id="'tool-nt'+props.rowData.id"> {{props.rowData.updated_at}}</b-badge>
                <b-badge v-if="props.rowData.status.id == 3" variant="succes" :id="'tool-nt'+props.rowData.id"> {{props.rowData.updated_at}}</b-badge>
                <b-badge v-if="props.rowData.status.id == 4" variant="danger" :id="'tool-nt'+props.rowData.id"> {{props.rowData.updated_at}}</b-badge>
                <b-badge v-if="props.rowData.status.id == 5" variant="danger" :id="'tool-nt'+props.rowData.id"> {{props.rowData.updated_at}}</b-badge>
                    <b-badge v-if="props.rowData.status.id == 6" variant="dark" :id="'tool-nt'+props.rowData.id"> {{props.rowData.closed_at}}</b-badge>
                    <b-badge v-if="props.rowData.status.id == 7" variant="info" :id="'tool-nt'+props.rowData.id"> {{props.rowData.closed_at}}</b-badge>
                            <b-tooltip :target="'tool-nt'+props.rowData.id"
                                placement="right"
                                  >
                                        <b>Notes: </b>{{props.rowData.notes}}
                                </b-tooltip>
              </template>

              <template slot="project" slot-scope="props">

                  <!-- <b-button :id="'tool-'+props.rowData.id" variant="secondary" class="mr-1 mb-1">{{ props.rowData.project.name }}</b-button>
                  <b-tooltip :target="'tool-'+props.rowData.id"
                          placement="top"
                          :title="props.rowData.project.name">
                        <b>Tgl Reminder: </b> {{timeLayout(props.rowData.project.tgl_reminder)}} <br>
                        <b>Status :</b> {{props.rowData.project.status.name}}
                  </b-tooltip> -->

                  <b-row>
                    <b-colxx xxs="12">
                        <b-button class="mb-1" variant="primary default" style="width:100%">{{ props.rowData.project.name }}</b-button>
                    </b-colxx>
                  </b-row>
                  <b-row>
                      <b-colxx xxs="12">
                        <b-row>
                            <b-colxx xxs="12" xl="6"> Tanggal: </b-colxx>
                            <b-colxx xxs="12" xl="6">{{timeLayout(props.rowData.project.tgl_reminder)}}</b-colxx>
                        </b-row>
                        <b-row>
                            <b-colxx xxs="12" xl="6"> Status: </b-colxx>
                            <b-colxx xxs="12" xl="6">{{props.rowData.project.status.name}}</b-colxx>
                        </b-row>
                        <b-row>
                            <b-colxx xxs="12" xl="6"> Kategori: </b-colxx>
                            <b-colxx xxs="12" xl="6">{{props.rowData.project.category.name}}</b-colxx>
                        </b-row>
                        <b-row>
                            <b-colxx xxs="12" xl="6"> customer_id: </b-colxx>
                            <b-colxx xxs="12" xl="6">
                              <b-button :id="'tool-cd'+props.rowData.id" variant="secondary" class="mr-1 mb-1 small"  @click="movePageDetail(props.rowData.project.customer_id)">{{props.rowData.project.customer_id}}</b-button>
                                <!-- <b-tooltip :target="'tool-cd'+props.rowData.id"
                                placement="right"
                                v-if="fetchDetailCustomer(props.rowData.project.customer_id).length != 0"
                                  >
                                        <b>{{fetchDetailCustomer(props.rowData.project.customer_id)["name"]}}</b>
                                </b-tooltip> -->
                            </b-colxx>
                        </b-row>
                      </b-colxx>
                  </b-row>
              </template>
              <template slot="total" slot-scope="props">


                  <p class="mb-2">
                    HPP
                    <span class="float-right text-muted">  {{shortNumber(props.rowData.subtotal_hpp)}}/  {{shortNumber(props.rowData.total)}}</span>
                  </p>
                  <b-progress :value="(props.rowData.subtotal_hpp / props.rowData.total) * 100"></b-progress>
              </template>
              <template slot="validuntil" slot-scope="props">
                  <p>{{timeLayout(props.rowData.valid_until)}}</p> <br>
                  <i>{{timeLayout(props.rowData.created_at)}}</i>
              </template>
              <template slot="avatar" slot-scope="props">
                    <div
                        src="/assets/img/profiles/l-1.jpg"
                        alt="Card image cap"
                        class="align-self-center list-thumbnail-letters rounded-circle small"
                      >{{showAvatar(props.rowData.userCreate.name)}}</div>
              </template>
              <template slot="userCreate" slot-scope="props">
                        <b>{{props.rowData.userCreate.name}}</b>
                        <br>
                        <i>{{props.rowData.userCreate.role.name}}</i>
              </template>
              <!-- <template slot="id" slot-scope="props">
                <i  class="simple-icon-arrow-down" @click="cellClicked($event, props.rowData)"></i>
              </template> -->
              <template slot="action">
                  <b-dropdown  text="actions" variant="outline-secondary">
                    <b-dropdown-item>Detail</b-dropdown-item>
                    <b-dropdown-item>Edit</b-dropdown-item>
                    <b-dropdown-item>Delete</b-dropdown-item>
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
import MyDetailRow from "./MyDetailRow";
import filterQuote from "./filterQuote"


export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-quote" : filterQuote,
   //"my-detail-row" : MyDetailRow //->ini ga error namun ga ada datanya
  },
  data() {
    return {
      isLoad: false,
      detailRow : MyDetailRow,
      dataClone : [],
      loadCek : true,
      custid : null,
      fields: [
        {
          name: "version",
          title : "Version",
          sortField:"version",
          dataClass : "text-muted",
          width: "5%"
        },
        {
          name: "__slot:status",
          title: "Status",
          sortField : "status.id",
          titleClass: "",
          dataClass: "text-muted",
          width:"10%"
        },
        {
          name: "__slot:project",
          sortField: "project.name",
          title: "Project",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"25%"
        },
        {
          name: "__slot:total",
          sortField: "total",
          title: "Total",
          titleClass: "",
          dataClass: "text-muted",
          width:"20%"
        },
         ,
         {
          name: "__slot:validuntil",
          title: "Valid-Until",
          titleClass: "",
          dataClass: "text-muted",
          width:"15%"
        },
        {
          name:"__slot:avatar",
          width: "5%",
          tittle : ""
        },
        {
          name: "__slot:userCreate",
          title :"User-Create",
          sortField:"userCreate.name",
          width: "10%",
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
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      data: [],
      selectedItems: [],
      tag: []
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
  },
  mounted() {
    if(this.$route.query.id){
      console.log("shano")
      this.custid = `{customer_id : "${this.$route.query.id}"}`;
    } else{
       this.custid = `null`;
    }
    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query:  `
         query{
                quotes (filter :  ${this.custid}){
                  count
                  quotes{
                    id
                  status{
                    id
                    name
                  }
                    version
                    closed_at
                    created_at
                    updated_at
                    project{
                      id
                      name
                      category{
                        id
                        name
                      }
                      status
                      tgl_reminder
                     customer_id
                    }
                    total
                    subtotal_hpp
                    valid_until
                    userCreate{
                      id
                      name
                      role{
                        id
                        name
                      }
                    }

                  }
                }
              }
              `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
      console.log(text)
        return text.data.quotes.quotes
    })
    .then(resp => {
        this.data = resp;
        this.dataClone = resp;
        this.loadCek = false
        this.isLoad = true
      });

  },
  methods: {
    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      console.log(paginationData);
      this.$refs.pagination.setPaginationData(paginationData);
    },
     onCellClicked (data, field, event) {
        console.log('cellClicked: ', field.name)
        console.log(data.id)
        this.$refs.vuetable.toggleDetailRow(data.id)
      },
    cellClicked ($event, data) {
      // console.log('cellClicked: ', $event)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    movePageDetail(val){
			window.location ="/app/datatable/customerTable/cDetail?id="+val;
		},
    showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
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
      // local = local.filter(row => {
      //   return row.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ;
      // });
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

    fetchDetailCustomer(id){
          let datas = []
           fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
      query{
          customerDetail(customer_id:"${id}"){
            name
          email
            workPhone

          }
        }
              `
      }),
    }).then(function(response) {
      console.log(response)
        return response.json()
    }).then(function(text) {
      console.log(text)
        return text.data.customerDetail
    })
    .then(resp => {
        datas = resp
      });

      return datas
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },
    returnColor(a){
      const style = {
          "background-color": "#"+a,
          "color" : "white"

      }
      return style
  },
   timeLayout(n){
      if(n!= null){
        return n.split("T")[0];
      }
   },
    onUpdateAnswer: function(newAnswer){
        let cek = true;
        this.tag =[]
        if(newAnswer){
          if(newAnswer.name != ""){
            this.data = this.data.filter(row => {
                return row.name.toLowerCase().indexOf(newAnswer.name.toLowerCase())  !== -1 ;
            });
              cek = false;
              this.tag.push("Nama")
          }
          if(newAnswer.status != "-1"){
            this.data = this.data.filter(row=>{
              return parseInt(row.status) == parseInt(newAnswer.status);
            })
            cek = false;
            console.log(parseInt(newAnswer.status))
            this.tag.push("Status")
          }

          if(newAnswer.warna != ""){
              cek = false;
              this.data = this.data.filter(row=>{
                return row.color.id_ral == newAnswer.warna.id_ral
              })
            this.tag.push("Warna")
          }
          // this.fetchAgain(kategori,status)
        }
        if(cek){
            this.search = ""
          this.data = this.dataClone
        }

         this.$refs.vuetable.refresh()
    },
    //  fetchAgain(kategori, status){


    // }
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
    }
  },

};
</script>
