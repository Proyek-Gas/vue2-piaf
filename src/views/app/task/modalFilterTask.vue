<template>
  <b-modal id="modalright2" ref="modalright2" title="Filter Task" modal-class="modal-right">
    <b-row class="mb-4">
        <b-colxx xxs="12">
          <!-- <h4>Sort By</h4> -->
           <!-- <v-select v-model="data.sort" label="name" :options="arrSort" style="width:100%;"/> -->
            <b-dropdown
              id="ddown1"
              :text="`Sort By : ${data.sort.name}`"

              class="mr-1 float-md-left btn-group"
              size="xs"
            >
              <b-dropdown-item
                v-for="(order,index) in arrSort"
                :key="index"
                @click="changeOrderBy(order)"
              >{{ order.name }}</b-dropdown-item>
            </b-dropdown>


            <b-dropdown
              id="ddown1"
              :text="`Order By : ${data.sortBy}`"

              class="mr-1 float-md-left btn-group"
              size="xs"
            >
              <b-dropdown-item
                v-for="(order,index) in arrSortBy"
                :key="index"
                @click="changeOrderBySort(order)"
              >{{ order }}</b-dropdown-item>
            </b-dropdown>

        </b-colxx>
    </b-row>
    <b-row class="mb-4">
      <b-colxx xs='12'>
        <h4>Status</h4>
            <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(1)"
              :pressed="data.checkedCheckboxes == -1"
              style="width:100%"
            >
              <i class="simple-icon-refresh" />
              <span class="d-inline-block">All</span>
              <span class="float-right">{{dataComponent.length}} </span>
            </b-button>
           <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(1)"
              :pressed="data.checkedCheckboxes== 1"
              style="width:100%"
            >
              <i class="simple-icon-check" />
              <span class="d-inline-block">Completed</span>
              <span class="float-right">{{dataComponent.filter(x => x.status === 1).length}}</span>
            </b-button>

              <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(0)"
                :pressed="data.checkedCheckboxes== 0"
              style="width:100%"
            >
              <i class="simple-icon-clock" />
              <span class="d-inline-block">Progress</span>
              <span class="float-right">{{dataComponent.filter(x => x.status === 0).length}} </span>

            </b-button>
      </b-colxx>
    </b-row>
    <b-row class="mb-4">
      <b-colxx xs="12">
         <h4> Tags</h4>
          <br>
          <v-select multiple v-model="data.selectedTags" :options="arrTags"  label="name" placeholder="Silahkan Pilih Tags"  style="width:100%"/>
      </b-colxx>
    </b-row>
     <template slot="modal-footer">
         <b-button variant="danger" @click="$emit('answers',null);hideModal('modalright2');reset()">Reset</b-button>
         <b-button variant="primary" @click="$emit('answers', data);hideModal('modalright2')" class="mr-1">Apply</b-button>
      </template>
  </b-modal>
</template>
<script>
import { mapGetters } from 'vuex';
import { currentUser } from '../../../constants/config';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default{
  props : ['dataComponent'],
  components :{
    "v-select" : vSelect
  },
  methods : {
      checkButtonCheck(i) {
        console.log()
        this.data.checkedCheckboxes = i;
      },
      fetchTags(){
           fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
              },
              body: JSON.stringify({
                query: `
                   query {
                    tags{
                      id
                      name
                    }
                  }
            `
            }),
          }).then(function(response) {
              return response.json()
          }).then(function(text) {
              return text.data.tags;
          })
          .then(resp => {
            this.arrTags = resp
          });
      },
    changeOrderBy(sort) {
      this.data.sort = sort;
    },
    changeOrderBySort(sort){
      this.data.sortBy = sort
    },
    reset(){
        this.data = {
         checkedCheckboxes: -1,
         selectedTags : [],
         sort : {'name' : 'ascending',
                  'value' : 'asc'
                },
         sortBy : 'due_date'
        }
    }
  },
  data(){
    return {
       data :{
         checkedCheckboxes: -1,
         selectedTags : [],
         sort : {'name' : 'ascending',
                  'value' : 'asc'
                },
         sortBy : 'due_date'
       },
       arrTags : [],
       arrSort : [
         {
           'name' : 'ascending',
           'value' : 'asc'
         },
         {
           'name' : 'descending',
           'value' : 'desc'
         }
       ],
       arrSortBy : ['due_date', 'description']

    }
  },
  mounted(){
    this.fetchTags();
  },
  computed : {
    ...mapGetters({
      currentUser : 'currentUser'
    })
  }
}
</script>

