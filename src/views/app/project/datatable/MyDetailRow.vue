<template>
  <div @click="onClick" >
 <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Tanggal Reminder</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="mb-4 d-flex flex-sm-row" style="height:35px" v-if="rowData.lastQuote.userCreate.id">

              <img
                :src="returnUrl(rowData.lastQuote.userCreate.id, rowData.lastQuote.userCreate.photo)"
                alt="Image"
                class="img-thumbnail list-thumbnail rounded-circle align-self-center m-4 small mt-2"
              />

            <div class="d-flex flex-grow-1 min-width-zero">
              <div
                class="pl-0 align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <a href=""><h5>{{rowData.lastQuote.userCreate.name}}</h5></a>
                 <b-badge v-if="rowData.lastQuote.userCreate.role" variant="primary">{{rowData.userCreate.role.name}}</b-badge>
                </div>
              </div>
            </div>
          </div>

      </td>
      <td>{{timeLayout(rowData.tgl_reminder)}}</td>
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
  data(){

  },
  methods: {
    returnUrl(id,photo){
        return `https://dev.quotation.node.zoomit.co.id/assets/img/profile-picture/${id}/${photo}`
    },
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
