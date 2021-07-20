<template>
  <div @click="onClick" >
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>VS: </b></div>
      <div class="col-6">{{rowData.vs_volume_solid}}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Agent Item Ratio: </b></div>
      <div class="col-6"><a href="">{{rowData.agent_item_id}}</a><br>
        {{rowData.ratio_agent}}

      </div>
    </div>
     <div class="row">
      <div class="col-6" style="text-align:right" ><b>Thinner Item Ratio: </b></div>
      <div class="col-6"><a href="">{{rowData.recommended_thinner_id}}</a><br>
        {{rowData.ratio_recommended_thinner_id}}

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    },
    options: {
      type: Object,
    }
  },
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    },
  },
}
</script>
