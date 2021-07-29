<template>
  <div @click="onClick" >
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Warna: </b></div>
      <div class="col-6" >
          <b-badge v-bind:style="returnColor(rowData.warna.hex_code)">
            <p style="font-size:5 pt;">{{rowData.warna.eng_name}}</p>
           <p style="font-size:10pt;margin-top:-10px"><strong>{{rowData.warna.ind_name}}</strong></p>
          </b-badge>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-6" style="text-align:right"><b>LastQuote tanggal: </b></div>
      <div class="col-6">{{timeLayout(rowData.lastquote.time)}}</div> -->
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right"><b>Kategori: </b></div>
      <div class="col-6"><div v-if="rowData.itemCategory != null">{{rowData.itemCategory.name}}</div></div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right"><b>Balance: </b></div>
      <div class="col-6"> {{rowData.balance}}</div>
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
      type: String,
    }
  },
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    },
     returnColor(a){
          const style = {
              "background-color": "#"+a,
              "color" : "white",
              "padding" : "6%"
          }
          return style
      },

  },
}
</script>
