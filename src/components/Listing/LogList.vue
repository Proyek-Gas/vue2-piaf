<template>
<table class="table table-sm table-borderless">
    <tbody>
        <tr v-for="(log, index) in logs" :log="log" :key="index">
            <td>
                <span v-if="log.status.id == 4 || log.status.id == 6" :class="`log-indicator align-middle border-danger`" />
                <span v-else :class="`log-indicator align-middle ${log.color}`" />
            </td>
            <td style="width: 50%;">
                <span class="font-weight-medium">{{ log.status.name }}</span>
                <div class="separator"></div>
                <span class="font-weight-medium">{{ log.notes }}</span>
            </td>
            <td class="text-right">
                <span class="text-muted">{{ dateFormat(new Date(log.created_at)) }}</span><br>
                <span class="text-muted">{{ timeFormat(new Date(log.created_at)) }}</span>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: ['logs'],
    methods:{
        dateFormat(date){
            
            let d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return da + " "+ mo + " " +ye;
        },
        timeFormat(date){
            console.log(date.getHours(), date.getMinutes(), date.getSeconds());
            let hr = date.getHours()-7;
            let min = date.getMinutes();
            let sec = date.getSeconds();
            if(hr < 10) hr = "0"+hr;
            if(min < 10)min = "0"+min;
            if(sec < 10)sec = "0"+sec;
            return hr + ":" + min + ":" + sec;
        },
    }
}
</script>
