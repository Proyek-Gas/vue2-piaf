<template>
  <div>
    <b-card :class="{'d-flex mb-3':true,'active' :selectedItems.includes(data.id)}" no-body>
        <div class="d-flex flex-grow-1 min-width-zero">
            <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center pb-2">
                <a href="#" class="list-item-heading mb-0 w-40 w-xs-100  mb-1 mt-1" @click.prevent="" >
                    <!-- <i :class="{'heading-icon':true,
                                'simple-icon-check' :data.status === 1,
                                'simple-icon-clock' :data.status !== 1
                            }"/> -->
                    <span class="align-middle d-inline-block">{{data.name}}</span>
                </a>

                <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.email}}</p>
                <p class="mb-1 text-muted text-small w-15 w-xs-100">{{ shortNumber(data.customerLimitAmountValue) }}</p>
                <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.workPhone}}</p>
            </b-card-body>
            <!-- <div @click.prevent="toggleItem($event,data)" class="custom-control custom-checkbox pl-1 align-self-md-center align-self-start mr-4 pt-4">
                <b-form-checkbox class="itemCheck mb-0" v-if="data.recurring != null && !selectedItems.includes(data.id)"  :checked="selectedItems.includes(data.id)" v-b-modal="'modalbasic' + data.id"/>
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" v-else/>
                <b-modal :id="returnId(data.id)" :ref="returnId(data.id)" :title="$t('modal.modal-title')">
                    Ingin membuat task baru dengan interval sesuai recurring?
                    <template slot="modal-footer">
                        <b-button variant="primary" @click="newRecurring('modalbasic'+data.id)" class="mr-1">Ok</b-button>
                        <b-button variant="secondary" @click="hideModal('modalbasic'+data.id)">Cancel</b-button>
                    </template>
                </b-modal>
            </div> -->
            <div class="custom-control custom-checkbox pl-1 align-self-md-center align-self-start mr-4 pt-4">
              <!-- <b-button
                  class="glyph-icon simple-icon-pencil"
                  variant="warning"
                  size="md"
                  @click="select(data)"
                  v-b-modal="'modalright3-' + data.id"
                  >
                </b-button> -->
            </div>
        </div>
        <div class="card-body pt-1 text-muted text-small"><p class="mb-0" v-html="data.customerNo"></p></div>
    </b-card>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentUser } from '../../constants/config'

export default {
    props: ['data', 'selectedItems'],
    components:{
    },
    computed : {
       ...mapGetters({
         currentUser : 'currentUser'
       })
    },

    methods: {
        shortNumber(n) {
			if (n < 1e3) return n;
			else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
			else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
			else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
			else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    	},
    },
    mounted(){
        console.log(this.data);
    }

}
</script>
