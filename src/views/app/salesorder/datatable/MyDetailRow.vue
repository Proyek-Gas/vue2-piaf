<template>
  <div @click="onClick" >
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Subtotal: </b></div>
      <div class="col-6">{{rowData.subtotal | currency}}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Discount: </b></div>
      <div class="col-6">{{rowData.cashDiscount | currency}}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>Tax: </b></div>
      <div class="col-6">{{rowData.tax1Amount | currency}}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right"><b>PO Number:</b></div>
      <div class="col-6">{{rowData.poNumber }}</div>
    </div>
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>PayMent Term: </b></div>
      <div class="col-6">{{rowData.paymentTerm.name}}</div>
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
    shortNumber(n) {
        if (n < 1e3) return n;
        else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
        else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
        else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
        else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    },
    returnPageQuoteDetail(props){
      return "quoteTable/qDetail?id="+props.lastquote.id+"&ver="+props.lastquote.id
    },
    returnPageProjectDetail(props){
      return "projectTable/pDetail?id="+props.lastquote.project.id
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
