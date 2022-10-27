<script>
import moment from "moment-timezone";
import config from "config";
import FieldError from "../global/FieldError";

export default {
  name: "DateAndTime",
  props: ["dateType", "error", "editValue", "errorStyle", "containerStyle"],
  components: { FieldError },
  data() {
    return {
      date: {
        month: null,
        day: null,
        year: null,
        hour: null,
        minute: null,
        hour12: null
      },
      dateSelected: null,
      form: {
        start_time: null
      },
      time: null,
      fieldKey: 0
    };
  },
  methods: {
    emitToParent(type, value, payload) {
      this.$emit("child", type, value, payload);
    },
    incrDecrDateUnit(unit, format, operand) {
      let diff = 0;
      if (unit === "minute") {
        let currMin = parseInt(this.date.minute, 10);
        if (currMin % 5 > 0) {
          let next5Multiple = Math.ceil(currMin / 5) * 5;
          let prev5Multiple = Math.floor(currMin / 5) * 5;
          if (operand === "add") {
            diff = parseInt(next5Multiple - currMin, 10);
          } else if (operand === "subtract") {
            diff = parseInt(currMin - prev5Multiple, 10);
          }
        } else {
          diff = 5;
        }
      } else {
        diff = 1;
      }
      let next = moment(this.dateSelected)[operand](diff, unit);
      this.date[unit] = moment(next).format(format);
      this.dateSelected = next.format("YYYY MMM DD hh:mm A");
    },
    toggleAMPM() {
      if (this.date.hour12 === "PM") {
        this.date.hour12 = "AM";
      } else {
        this.date.hour12 = "PM";
      }
      let dateString = `${this.date.year} ${this.date.month} ${this.date.day} ${this.date.hour}:${this.date.minute} ${this.date.hour12}`;
      this.dateSelected = moment(dateString).format("YYYY MM DD hh:mm A");
    }
  },
  mounted() {
    if (this.editValue) {
      this.date.year = moment(this.editValue).format("YYYY");
      this.date.month = moment(this.editValue).format("MMM");
      this.date.day = moment(this.editValue).format("DD");
      this.date.hour = moment(this.editValue).format("hh");
      this.date.minute = moment(this.editValue).format("mm");
      this.date.hour12 = moment(this.editValue).format("A");

      this.dateSelected = moment(this.editValue).format("YYYY MMM DD hh:mm A");
    }
  },
  watch: {
    editValue: function(newValue) {
      let date;
      if (newValue) {
        date = moment(this.editValue).format("YYYY MMM DD hh:mm A");
      } else {
        date = moment().format(config.date24hTimeFormat);
      }
      this.date.year = moment(date).format("YYYY");
      this.date.month = moment(date).format("MMM");
      this.date.day = moment(date).format("DD");
      this.date.hour = moment(date).format("hh");
      this.date.minute = moment(date).format("mm");
      this.date.hour12 = moment(date).format("A");

      this.dateSelected = moment(date).format("YYYY MMM DD hh:mm A");
    },
    dateSelected: function(newDate, oldDate) {
      let newFormattedDate = moment(newDate).format("YYYY MMM DD hh:mm A");
      let oldFormattedDate = moment(oldDate).format("YYYY MMM DD hh:mm A");
      let newAMPM = moment(newFormattedDate).format("A");
      let oldAMPM = moment(oldFormattedDate).format("A");
      if (newAMPM !== oldAMPM) {
        this.date.hour12 = moment(newFormattedDate).format("A");
      }
      let newYear = moment(newFormattedDate).format("YYYY");
      let oldYear = moment(oldFormattedDate).format("YYYY");
      if (newYear !== oldYear) {
        this.date.year = moment(newFormattedDate).format("YYYY");
      }
      let newDay = moment(newFormattedDate).format("DD");
      if (parseInt(newDay, 10) >= 28 || parseInt(newDay, 10) <= 2) {
        this.date.day = moment(newFormattedDate).format("DD");
        this.date.month = moment(newFormattedDate).format("MMM");
      }
      this.emitToParent("date-change", this.dateType, newDate);
    }
  }
};
</script>
<template>
  <div id="date-time-container" :style="containerStyle">
    <FieldError :errorMessage="error" :errorStyle="errorStyle" />
    <div id="topArrows">
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="incrDecrDateUnit('year', 'YYYY', 'add')"
      ></span>
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="incrDecrDateUnit('month', 'MMM', 'add')"
      ></span>
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="incrDecrDateUnit('day', 'DD', 'add')"
      ></span>
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="incrDecrDateUnit('hour', 'hh', 'add')"
      ></span>
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="incrDecrDateUnit('minute', 'mm', 'add')"
      ></span>
      <span
        class="icon-chevron-up icon-tiny interaction"
        @click="toggleAMPM"
      ></span>
    </div>
    <div id="field-container" :key="fieldKey">
      <span class="field">{{ date.year }}</span>
      <span class="field">{{ date.month }}</span>
      <span class="field">{{ date.day }}</span>
      <span class="field">{{ date.hour }}</span>
      <span class="delimiter">:</span>
      <span class="field">{{ date.minute }}</span>
      <span class="field">{{ date.hour12 }}</span>
    </div>
    <div id="bottomArrows">
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="incrDecrDateUnit('year', 'YYYY', 'subtract')"
      ></span>
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="incrDecrDateUnit('month', 'MMM', 'subtract')"
      ></span>
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="incrDecrDateUnit('day', 'DD', 'subtract')"
      ></span>
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="incrDecrDateUnit('hour', 'hh', 'subtract')"
      ></span>
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="incrDecrDateUnit('minute', 'mm', 'subtract')"
      ></span>
      <span
        class="icon-chevron-down icon-tiny interaction"
        @click="toggleAMPM"
      ></span>
    </div>
  </div>
</template>
<style scoped>
#date-time-container {
  width: 232px;
  height: 92px;
  /* margin-left: 70px; */
}
#topArrows,
#bottomArrows,
#field-container {
  display: flex;
  justify-content: space-between;
}

#topArrows span,
#bottomArrows span,
#field-container .field {
  display: block;
  width: 49px;
  text-align: center;
}

#topArrows,
#bottomArrows {
  padding: 0px 5px;
  color: #6c757d;
}
#field-container {
  border: 1px solid #d7dce2;
  padding: 5px;
}
</style>
