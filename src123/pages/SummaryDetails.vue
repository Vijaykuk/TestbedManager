<script>
export default {
  name: "SummaryDetails",
  props: ["inventory", "projectid", "headings"],
  data() {
    return {
      fields: { Name: "name", SN: "sn", PID: "pid", Count: "count" },
      barchartpath: "./assets/barchart.png",
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
  },
};
</script>
<template>
  <div>
    <div
      style="margin-top: 54px;margin-right: 52px;position: absolute;right: 0;"
    >
      <a href="#" onclick="downloadSummary('summaryTable')">download</a>
    </div>
    <div class="row summaryrow" style="width:98%">
      <div
        id="summaryTable"
        style="margin: 15px;
    margin-top: 400px;
    border: 2px solid #16c06e;
    border-radius: 20px;"
      >
        <div style="width:100%;">
          <table
            id="inventoryTable"
            class="table table--highlight"
            style="height: 100%;width:100%;margin: 0;border-spacing: 0;font: 400 13px ui-sans-serif !important;"
          >
            <thead
              style="background: #fff;
    color: #000;
    font: 400 13px ui-sans-serif !important;"
            >
              <!--{"DESCR":" Cisco 8808 8-slot Chassis","NAME":" Rack 0","PID":" 8808","SN":" FOX2352P6CC","VID":" V01","hostname":"  BX5-SF"},-->
              <tr class="summaryTableHeadings" style="line-height: 36px;">
                <th
                  style="border-bottom: 2px solid #16c06e;padding-left:6em;text-align:left"
                >
                  PID
                </th>
                <th
                  style="border-bottom: 2px solid #16c06e;padding-left:3em;text-align:center"
                >
                  Count
                </th>
              </tr>
            </thead>
            <tbody class="summaryTableBody">
              <tr
                v-for="(device, index) in inventory"
                :key="index"
                class="summaryTablesValues"
                style="line-height: 36px;box-shadow: 0 3px 3px -2px #c1c1c1"
              >
                <td
                  style="width:16.6%; word-wrap: break-word; padding-left:6em;text-align:left"
                >
                  {{ device.pid }}
                </td>
                <td
                  style=" word-wrap: break-word; text-align: center;width:16.6%;padding-left:1em;text-align:center"
                >
                  {{ device.count }}
                </td>
                <!-- <td
                style=" word-wrap: break-word; text-align: center;width:16.6%;padding-left:1em;text-align:left"
              >
                {{ device.count1 }}
              </td>-->
              </tr>
            </tbody>
          </table>
        </div>
        <!--<div
          class="barChart"
          style="width: 50%;
    margin-left: 40px;
    margin-top: 40px;
    display: inline-block;
    position: absolute;"
        >
          <img
            :src="barchartpath"
            class="barChart"
            style="background-size: 100% 100%;
                   height: 400px;
    width: 600px;
    box-shadow: 0px 0px 6px #2396f5 !important;
    transition:all 0.5s;
    -webkit-box-shadow: 5px 4px 3px #c1c1c1 !important;"
          />
        </div>-->
      </div>
    </div>
  </div>
</template>
