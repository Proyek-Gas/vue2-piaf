<template>
  <div @click="onClick" >
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Customer Limit: </b></div>
      <div class="col-6">{{shortNumber(rowData.customerLimitAmountValue)}}</div>
    </div>
    <div class="row">
      <!-- <div class="col-6" style="text-align:right"><b>LastQuote tanggal: </b></div>
      <div class="col-6">{{timeLayout(rowData.lastquote.time)}}</div> -->
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right"><b>Alamat: </b></div>
      <div class="col-6">{{showAddress(rowData)}}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right"><b>Price Category: </b></div>
      <div class="col-6"> <b-badge :variant="rowData.priceCategory.name === 'Umum' ? '3' ? 'primary' : 'success' : 'danger'" close-transition>{{rowData.priceCategory.name}}</b-badge></div>
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
    shortNumber(n) {
        if (n < 1e3) return n;
        else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
        else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
        else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
        else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    },
    timeLayout(n){
      if(n!= null){
       return n.split("T")[0];
      }

    },
    showAddress(data){
        let alamat =""
        if(data.street){
          alamat = alamat+data.street+", "
        }
        if(data.city){
          alamat = alamat+data.city+", "
        }
        if(data.province){
          alamat = alamat+data.province
        }
        return alamat
      }

  },
}
</script>
