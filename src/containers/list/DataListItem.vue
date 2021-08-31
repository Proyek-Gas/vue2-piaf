<template>
  <div>
    <b-card :class="{'d-flex mb-3':true,'active' :selectedItems.includes(data.id)}" :style ="returnTextColor(data.due_date)" no-body>
        <div class="d-flex flex-grow-1 min-width-zero" :style ="returnTextColor(data.due_date)" >
            <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center pb-2">
                <a href="#" class="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1" @click.prevent="" >
                    <i :class="{'heading-icon':true,
                                'simple-icon-check' :data.status === 1,
                                'simple-icon-clock' :data.status !== 1
                            }"/>
                    <span class="align-middle d-inline-block">{{data.project.name}}</span>
                </a>

                <p class="mb-1 text-muted text-small w-15 w-xs-100" v-if="data.recurring != null">{{data.recurring+" "}}days</p>
                <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.due_date}}</p>
                <div class="w-15 w-xs-100"><b-badge :variant="returnVariant(tag.id)" v-for="(tag) in data.tags" v-bind:key="tag.id" pill>{{tag.name}}</b-badge></div>
            </b-card-body>
            <div @click.prevent="toggleItem($event,data)" class="custom-control custom-checkbox pl-1 align-self-md-center align-self-start mr-4 pt-4">
                <b-form-checkbox class="itemCheck mb-0" v-if="data.recurring != null && !selectedItems.includes(data.id)"  :checked="selectedItems.includes(data.id)" v-b-modal="'modalbasic' + data.id"/>
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" v-else/>
                <b-modal :id="returnId(data.id)" :ref="returnId(data.id)" :title="$t('modal.modal-title')">
                    Ingin membuat task baru dengan interval sesuai recurring?
                    <template slot="modal-footer">
                        <b-button variant="primary" @click="newRecurring('modalbasic'+data.id)" class="mr-1">Ok</b-button>
                        <b-button variant="secondary" @click="hideModal('modalbasic'+data.id)">Cancel</b-button>
                    </template>
                </b-modal>
            </div>
            <div class="custom-control custom-checkbox pl-1 align-self-md-center align-self-start mr-4 pt-4">
              <b-button
                  class="glyph-icon simple-icon-pencil"
                  variant="warning"
                  size="md"
                  @click="select(data)"
                  v-b-modal="'modalright3-' + data.id"
                  >
                </b-button>
            </div>
        </div>
        <div class="card-body pt-1"><p class="mb-0" v-html="data.description"></p></div>
    </b-card>
  <mEditTask ref="profile"></mEditTask>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentUser } from '../../constants/config'
import mEditTask from "../../views/app/task/modalEditTask.vue"

export default {
    props: ['data', 'selectedItems'],
    components:{
      "mEditTask": mEditTask
    },
    computed : {
       ...mapGetters({
         currentUser :  'currentUser'
       })
    },

    methods: {
        select(a){
          this.$refs.profile.loadField(a);
        },
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        },
        hideModal (refname) {
          this.$refs[refname].hide()
          this.$root.$emit('task');
          console.log('hide modal:: ' + refname)

          if (refname === 'modalnestedinline') {
            this.$refs['modalnested'].show()
          }
        },
        openModal(id){
          console.log(id)
            this.$refs["modalbasic-"+id].show()
        },
        newRecurring(refname){
            this.$refs[refname].hide()
            let date = new Date();
            date.setDate(date.getDate() + this.data.recurring);
            let tags = `[`;
            for(let i=0; i< this.data.tags.length; i++){
              if(i<this.data.tags.length-1){
                   tags = tags+this.data.tags[i].id+','
              }else{
                   tags = tags+this.data.tags[i].id
              }

            }
            tags = tags +`]`
            let querys = `mutation{
                addTask(params : {
                  description : "${this.data.description}"
                  project_id : ${this.data.project.id},
                  recurring  : ${this.data.recurring},
                  due_date : "${this.formatDate(date)}"
                  tags : ${tags}
                }){
                  message
                  status
                }
              }`
              console.log(querys)

              fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
              },
                  body: JSON.stringify({
                    query: querys
                }),
              }).then(function(response) {
                  return response.json()
              }).then(function(text) {
                  return text.data.addTask;
              })
              .then(resp => {
                  this.$root.$emit('task');
              });
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        returnId(id){
          return "modalbasic"+id
        },
        returnVariant(id){
          let variant = null;
          if(id == 1){
            variant = "danger"
          }else if(id ==2){
            variant = "warning"
          }else{
            variant = "info"
          }
          return variant
        },
        returnTextColor(date){
          let ret = null
          let dt = new Date(date);
          let now = new Date();
          if(now> dt){
            ret  = {
              'color' : 'red'
            }
          }else{
            ret = {
              'color' : 'black'
            }
          }

          return ret
        }
    },

}
</script>
