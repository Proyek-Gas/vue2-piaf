<template>
    <b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex mb-3':true,'active' : selectedItems.includes(data.id)}" :style ="returnTextColor(data.due_date)" no-body>
        <div class="d-flex flex-grow-1 min-width-zero" :style ="returnTextColor(data.due_date)" >
            <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center pb-2">
                <a href="#" class="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1" @click.prevent="">
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
            <div class="custom-control custom-checkbox pl-1 align-self-md-center align-self-start mr-4 pt-4">
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/>
            </div>
        </div>
        <div class="card-body pt-1"><p class="mb-0" v-html="data.description"></p></div>
    </b-card>
</template>

<script>
export default {
    props: ['data', 'selectedItems'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
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
