<template>
  <div @click="onClick" >
    <div class="row">
      <div class="col-6" style="text-align:right" ><b>User: </b></div>
      <div class="col-6">
          <div class="row">
              <div class="col-2">
                   <div
                      src="/assets/img/profiles/l-1.jpg"
                      alt="Card image cap"
                      class="align-self-center list-thumbnail-letters rounded-circle small"
                    >{{showAvatar(rowData.userCreate.name)}}</div>
                  </div>
                  <div class="col-10">
                      <b>{{rowData.userCreate.name}}</b>
                      <br>
                      <i>{{rowData.userCreate.role.name}}</i>
                  </div>
          </div>
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
     showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
     }
  },
}
</script>
