<template>
  <div class="other_container">
    <el-card class="box_card" id="box_card">
      <el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
        <el-form-item label="输入搜索:">
          <el-input size="mini" clearable v-model="search" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="店铺：">
          <el-select v-model="shop_code" clearable :popper-append-to-body="false" multiple filterable collapse-tags
            placeholder="全部">
            <el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="mini" v-model="status" clearable :popper-append-to-body="false" placeholder="全部">
            <el-option label="待处理" value="0"></el-option>
            <el-option label="已同意" value="1"></el-option>
            <el-option label="已拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker v-model="dates" align="right" type="daterange" unlink-panels value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :append-to-body="false"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="query" @click="handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <TableTitle title_text="数据列表" id="table_title">
        <div class="add_button" @click="exportFn" v-if="button_list.export==1">导出</div>
      </TableTitle>
      <el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}"
        :max-height="max_height" v-loading="loading">
        <el-table-column prop="picture_id" label="编号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="插画图片" align="center">
          <template slot-scope="scope">
            <img style="width: 40px;height: 40px" :src="scope.row.domain + scope.row.image">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="插画标题" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="shop_name" label="店铺" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="usage_time" label="使用时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="purpose_type" label="使用类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="submit_user_name" label="提交人" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">待处理</div>
            <div v-if="scope.row.status == 1">已同意</div>
            <div v-if="scope.row.status == 2">已拒绝</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button class="button_theme" type="text" size="small"
              @click="$router.push(`/detail?record_id=${scope.row.record_id}`)" v-if="button_list.detail==1">查看</el-button>
            <el-button class="button_theme" type="text" size="small" @click="setDialog(scope.row.record_id,'1')"
              v-if="scope.row.status == 1 && button_list.binding==1">绑定</el-button>
            <el-button class="button_theme" type="text" size="small" @click="setDialog(scope.row.record_id,'2')"
              v-if="scope.row.status == 0">同意</el-button>
            <el-button class="button_theme" type="text" size="small" @click="setDialog(scope.row.record_id,'3')"
              v-if="scope.row.status == 0">拒绝</el-button>
            <el-button class="button_theme" type="text" size="small" @click="downFile(scope.row.record_id)"
              v-if="button_list.download==1">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" id="el_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :pager-count="11" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
        </el-pagination>
      </div>
      <!-- 同意/拒绝/绑定sku -->
      <el-dialog :title="dialog_title" center width="30%" :visible.sync="show_dialog" @close="input_value = ''">
        <el-input type="textarea" :rows="5" :placeholder="input_placeholder" v-model="input_value">
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="show_dialog = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="commitFn">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import resource from "../api/resource.js";
import { exportPost } from "../api/export.js";
import { MessageBox, Message } from "element-ui";
import TableTitle from "../components/table_title.vue";
import {
  getMonthStartDate,
  getCurrentDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
} from "../api/date.js";
export default {
  data() {
    return {
      max_height: 0, //表格最大高度
      loading: false,
      search: "", //搜索内容
      store_list: [], //所有店铺列表
      shop_code: [], //选中的店铺ID
      status: "", //状态
      dates: [], //日期
      pickerOptions: {
        shortcuts: [
          {
            text: "当月",
            onClick(picker) {
              const start = getMonthStartDate();
              const end = getCurrentDate();
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上个月",
            onClick(picker) {
              const start = getLastMonthStartDate(1);
              const end = getLastMonthEndDate(0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上上个月",
            onClick(picker) {
              const start = getLastMonthStartDate(2);
              const end = getLastMonthEndDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      }, //时间区间
      pagesize: 10,
      page: 1,
      dataObj: {},
      show_dialog: false, //同意/拒绝/绑定弹窗
      dialog_title: "", //同意/拒绝/绑定弹窗标题
      input_placeholder: "", //同意/拒绝/绑定默认提示
      input_value: "", //输入的内容
      record_id: "", //点击的ID
      type: "", //弹窗类型
      button_list: {},
    };
  },
  created() {
    //获取所有店铺列表
    this.ajaxViewShop();
    //获取列表
    this.getData();
  },
  mounted() {
    //获取表格最大高度
    this.onResize();
    window.addEventListener("resize", this.onResize());
  },
  destroyed() {
    window.removeEventListener("resize", () => {});
  },
  methods: {
    //监听屏幕大小变化
    onResize() {
      this.$nextTick(() => {
        let box_card_height = document.getElementById("box_card").offsetHeight;
        let el_form_height = document.getElementById("el_form").offsetHeight;
        let table_title_height =
          document.getElementById("table_title").offsetHeight;
        let el_pagination_height =
          document.getElementById("el_pagination").offsetHeight;
        this.max_height =
          box_card_height -
          el_form_height -
          table_title_height -
          el_pagination_height -
          40 +
          "px";
      });
    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      //获取列表
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      //获取列表
      this.getData();
    },
    //获取所有店铺列表
    ajaxViewShop() {
      resource.ajaxViewShop().then((res) => {
        if (res.data.code == 1) {
          this.store_list = res.data.data;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //导出
    exportFn() {
      MessageBox.confirm("确认导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arg = {
            search: this.search,
            shop_code: this.shop_code.join(","),
            status: this.status,
            start_date:
              this.dates && this.dates.length > 0 ? this.dates[0] : "",
            end_date: this.dates && this.dates.length > 0 ? this.dates[1] : "",
          };
          resource.recordExport(arg).then((res) => {
            if (res) {
              exportPost("\ufeff" + res.data, "选中记录");
            }
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "取消导出",
          });
        });
    },
    //获取列表
    getData() {
      let arg = {
        search: this.search,
        shop_code: this.shop_code.join(","),
        status: this.status,
        start_date: this.dates && this.dates.length > 0 ? this.dates[0] : "",
        end_date: this.dates && this.dates.length > 0 ? this.dates[1] : "",
        pagesize: this.pagesize,
        page: this.page,
      };
      this.loading = true;
      resource.recordList(arg).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          this.dataObj = res.data.data;
          this.button_list = res.data.data.button_list;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //点击绑定/同意/拒绝
    setDialog(record_id, type) {
      //1:绑定;2:同意3:拒绝
      this.record_id = record_id;
      this.type = type;
      if (type == "1") {
        this.dialog_title = "绑定商品编码";
        this.input_placeholder =
          "必填！每输入一个商品编码要换行（每个商品编码占一行）";
      } else if (type == "2") {
        this.dialog_title = "同意";
        this.input_placeholder = "同意备注";
      } else if (type == "3") {
        this.dialog_title = "拒绝";
        this.input_placeholder = "拒绝备注";
      }
      this.show_dialog = true;
    },
    //点击确定
    commitFn() {
      if (this.type == "1") {
        //绑定
        if (this.input_value == "") {
          this.$message.warning("请输入商品编码！");
          return;
        }
        let sku_ids = "";
        if (this.input_value.indexOf("\n") > -1) {
          sku_ids = this.input_value.replaceAll("\n", ",");
        } else if (this.input_value.indexOf(" ") > -1) {
          sku_ids = this.input_value.replaceAll(" ", ",");
        }
        let arg = {
          record_id: this.record_id,
          sku_ids: sku_ids,
        };
        resource.bindingSku(arg).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.show_dialog = false;
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      } else if (this.type == "2") {
        //同意
        let arg = {
          record_id: this.record_id,
        };
        if (this.input_value != "") {
          arg.remark = this.input_value;
        }
        resource.recordAgree(arg).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.show_dialog = false;
            //获取列表
            this.getData();
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      } else if (this.type == "3") {
        //拒绝
        let arg = {
          record_id: this.record_id,
        };
        if (this.input_value != "") {
          arg.remark = this.input_value;
        }
        resource.recordRefuse(arg).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.show_dialog = false;
            //获取列表
            this.getData();
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      }
    },
    // 点击下载源文件
    downFile(record_id) {
      let admin_id = localStorage.getItem("admin_id");
      window.open(
        `${location.origin}/api/record/source_down?record_id=${record_id}&type=1`
      );
    },
  },
  components: {
    TableTitle,
  },
};
</script>
<style lang="less" scoped>
.query {
  border-radius: 2rem;
  background: #f36478;
  width: 64rem;
  text-align: center;
  height: 32rem;
  font-size: 14rem;
  color: #ffffff;
}
.add_button {
  border-radius: 2rem;
  background: #f36478;
  width: 64rem;
  text-align: center;
  height: 32rem;
  line-height: 32rem;
  font-size: 14rem;
  color: #ffffff;
}
.button_theme {
  color: #f36478;
}
</style>






