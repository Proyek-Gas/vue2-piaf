<template>
  <div @click="onClick" >
    <table class="table table-bordered">
        <thead >
            <tr>
              <th>VS</th>
              <th colspan="2" style="text-align:center">Agent Item Ratio</th>
              <th colspan="2" style="text-align:center">Thinner Item Ratio</th>
            </tr>
            <tr>
              <th></th>
              <th style="text-align:center">Id</th>
              <th style="text-align:center">Ratio</th>
               <th style="text-align:center">Id</th>
              <th style="text-align:center">Ratio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{rowData.vs_volume_solid}}</td>
                <td style="text-align:center"> <a href="">{{rowData.agent_item_id}}</a></td>
                <td style="text-align:center">{{rowData.ratio_agent}}</td>
                <td style="text-align:center"><a href="">{{rowData.recommended_thinner_id}}</a></td>
                <td style="text-align:center">{{rowData.ratio_recommended_thinner_id}}</td>
            </tr>
        </tbody>
    </table>
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
