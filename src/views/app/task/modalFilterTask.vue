<template>
  <b-modal id="modalright2" ref="modalright2" title="Filter Task" modal-class="modal-right">
    <b-row>
      <b-colxx xs='12'>
        <h4>Status</h4>
           <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(2)"
              :pressed="checkedCheckboxes.indexOf(2) !== -1"
              style="width:100%"
            >
              <i class="simple-icon-reload" />
              <span class="d-inline-block">All Task</span>
              <span class="float-right">{{dataComponent.length}}</span>
            </b-button>
              <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(2)"
              :pressed="checkedCheckboxes.indexOf(2) !== -1"
              style="width:100%"
            >
              <i class="simple-icon-refresh" />
              <span class="d-inline-block">Recurring</span>
              <span class="float-right">{{dataComponent.filter(x => x.recurring !== null).length}} </span>
            </b-button>
              <b-button
              variant="outline-primary"
              class="mb-2"
              @click="checkButtonCheck(2)"
              :pressed="checkedCheckboxes.indexOf(2) !== -1"
              style="width:100%"
            >{{ $t('button.checkbox') }}</b-button>
      </b-colxx>
    </b-row>
  </b-modal>
</template>
<script>
export default{
  props : ['dataComponent'],
  methods : {
      checkButtonCheck(i) {
      const index = this.checkedCheckboxes.indexOf(i);
      if (index === -1) {
        this.checkedCheckboxes.push(i);
      } else {
        this.checkedCheckboxes.splice(index, 1);
      }
    }
  },
  data(){
    return {
       checkedCheckboxes: [],
    }
  }
}
</script>

