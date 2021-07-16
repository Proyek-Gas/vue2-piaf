<template>
  <div>
    <datatable-heading
      :title="$t('menu.customerTable')"
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
    ></datatable-heading>

    <b-row>
      <b-colxx xxs="12">
        <b-card>
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
          >
          </vuetable>
            <template slot="actions" slot-scope="props">
              <b-form-checkbox
                :checked="selectedItems.includes(props.rowData.id)"
                class="itemCheck mb-0"
              ></b-form-checkbox>
            </template>
        </b-card>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
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
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../containers/datatable/DatatableHeading";
import _ from "lodash";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading
  },
  data() {
    return {
      isLoad: false,
      fields: [
        {
          name: "id",
          sortField: "id",
          title: "Id",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "10%"
        },
        {
          name: "name",
          sortField: "name",
          title: "Name",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "email",
          sortField: "email",
          title: "Email",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "customerNo",
          sortField: "customerNo",
          title: "Customer No",
          titleClass: "",
          dataClass: "text-muted",
          width: "50%"
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

    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
  },
  mounted() {
    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
              query{customers  {       
              count
              customers{
                  id
                  name  
                  email
                  customerNo     
              }                 
            }
        }            
      `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
        return text.data.customers.customers;
    })
    .then(resp => {
        this.data = resp
        console.log(this.data)
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
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

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
    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },
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
  }
};
</script>

