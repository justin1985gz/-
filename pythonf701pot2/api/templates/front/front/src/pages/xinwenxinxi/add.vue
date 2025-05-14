<template>
<div :style='{"width":"100%","padding":"30px 7% 40px","margin":"0px auto","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"border":"0px solid #eee","padding":"30px 0","alignItems":"flex-start","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","position":"relative"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="新闻标题" prop="xinwenbiaoti">
            <el-input v-model="ruleForm.xinwenbiaoti" 
                placeholder="新闻标题" clearable :disabled=" false  ||ro.xinwenbiaoti"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}'  label="新闻类型" prop="xinwenleixing">
            <el-select v-model="ruleForm.xinwenleixing" placeholder="请选择新闻类型" :disabled=" false  ||ro.xinwenleixing" >
              <el-option
                  v-for="(item,index) in xinwenleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="新闻封面" v-if="type!='cross' || (type=='cross' && !ro.xinwenfengmian)" prop="xinwenfengmian">
            <file-upload
            tip="点击上传新闻封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.xinwenfengmian?ruleForm.xinwenfengmian:''"
            @change="xinwenfengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' class="upload" v-else label="新闻封面" prop="xinwenfengmian">
                <img v-if="ruleForm.xinwenfengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.xinwenfengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.xinwenfengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}'  label="新闻标签" prop="xinwenbiaoqian">
            <el-select v-model="ruleForm.xinwenbiaoqian" placeholder="请选择新闻标签" :disabled=" false  ||ro.xinwenbiaoqian" >
              <el-option
                  v-for="(item,index) in xinwenbiaoqianOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="新闻来源" prop="xinwenlaiyuan">
            <el-input v-model="ruleForm.xinwenlaiyuan" 
                placeholder="新闻来源" clearable :disabled=" false  ||ro.xinwenlaiyuan"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="发布日期" prop="faburiqi">
              <el-date-picker
				  :disabled=" false  ||ro.faburiqi"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.faburiqi" 
                  type="date"
                  placeholder="发布日期">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="新闻简介" prop="xinwenjianjie">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="新闻简介"
              v-model="ruleForm.xinwenjianjie">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="新闻详情" prop="xinwenxiangqing">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="新闻详情"
              v-model="ruleForm.xinwenxiangqing">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"width":"100%","padding":"0","margin":"0","textAlign":"center"}'>
        <el-button :style='{"border":"0px solid #eccc19","cursor":"pointer","padding":"0","margin":"0 20px 0 0","color":"#fff","borderRadius":"20px","background":"#0062a5","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #ccc","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#666","borderRadius":"20px","background":"none","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				xinwenbiaoti : false,
				xinwenleixing : false,
				xinwenfengmian : false,
				xinwenbiaoqian : false,
				xinwenlaiyuan : false,
				xinwenjianjie : false,
				faburiqi : false,
				xinwenxiangqing : false,
				thumbsupnum : false,
				crazilynum : false,
				clicktime : false,
				clicknum : false,
				discussnum : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          xinwenbiaoti: '',
          xinwenleixing: '',
          xinwenfengmian: '',
          xinwenbiaoqian: '',
          xinwenlaiyuan: '',
          xinwenjianjie: '',
          faburiqi: '',
          xinwenxiangqing: '',
          thumbsupnum: '',
          crazilynum: '',
          clicktime: '',
          clicknum: '',
          discussnum: '',
        },
        xinwenleixingOptions: [],
        xinwenbiaoqianOptions: [],


        rules: {
          xinwenbiaoti: [
          ],
          xinwenleixing: [
          ],
          xinwenfengmian: [
          ],
          xinwenbiaoqian: [
          ],
          xinwenlaiyuan: [
          ],
          xinwenjianjie: [
          ],
          faburiqi: [
          ],
          xinwenxiangqing: [
          ],
          thumbsupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          discussnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.faburiqi = this.getCurDate()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='xinwenbiaoti'){
              this.ruleForm.xinwenbiaoti = obj[o];
              this.ro.xinwenbiaoti = true;
              continue;
            }
            if(o=='xinwenleixing'){
              this.ruleForm.xinwenleixing = obj[o];
              this.ro.xinwenleixing = true;
              continue;
            }
            if(o=='xinwenfengmian'){
              this.ruleForm.xinwenfengmian = obj[o].split(",")[0];
              this.ro.xinwenfengmian = true;
              continue;
            }
            if(o=='xinwenbiaoqian'){
              this.ruleForm.xinwenbiaoqian = obj[o];
              this.ro.xinwenbiaoqian = true;
              continue;
            }
            if(o=='xinwenlaiyuan'){
              this.ruleForm.xinwenlaiyuan = obj[o];
              this.ro.xinwenlaiyuan = true;
              continue;
            }
            if(o=='xinwenjianjie'){
              this.ruleForm.xinwenjianjie = obj[o];
              this.ro.xinwenjianjie = true;
              continue;
            }
            if(o=='faburiqi'){
              this.ruleForm.faburiqi = obj[o];
              this.ro.faburiqi = true;
              continue;
            }
            if(o=='xinwenxiangqing'){
              this.ruleForm.xinwenxiangqing = obj[o];
              this.ro.xinwenxiangqing = true;
              continue;
            }
            if(o=='thumbsupnum'){
              this.ruleForm.thumbsupnum = obj[o];
              this.ro.thumbsupnum = true;
              continue;
            }
            if(o=='crazilynum'){
              this.ruleForm.crazilynum = obj[o];
              this.ro.crazilynum = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='clicknum'){
              this.ruleForm.clicknum = obj[o];
              this.ro.clicknum = true;
              continue;
            }
            if(o=='discussnum'){
              this.ruleForm.discussnum = obj[o];
              this.ro.discussnum = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/xinwenleixing/xinwenleixing', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.xinwenleixingOptions = res.data.data;
          }
        });
        this.$http.get('option/xinwenbiaoqian/xinwenbiaoqian', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.xinwenbiaoqianOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`xinwenxinxi/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('xinwenxinxi/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`xinwenxinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`xinwenxinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      xinwenfengmianUploadChange(fileUrls) {
          this.ruleForm.xinwenfengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 120px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 300px;
	  height: 36px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 300px;
	  height: 36px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 350px;
	  height: 36px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px 0 30px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 36px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  cursor: pointer;
	  border-radius: 2px;
	  color: #999;
	  background: none;
	  width: 80px;
	  font-size: 24px;
	  border-color: #ddd;
	  border-width: 1px;
	  line-height: 80px;
	  border-style: solid;
	  text-align: center;
	  height: 80px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  cursor: pointer;
	  border-radius: 2px;
	  color: #999;
	  background: none;
	  width: 80px;
	  font-size: 24px;
	  border-color: #ddd;
	  border-width: 1px;
	  line-height: 80px;
	  border-style: solid;
	  text-align: center;
	  height: 80px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  cursor: pointer;
	  border-radius: 2px;
	  color: #999;
	  background: none;
	  width: 80px;
	  font-size: 24px;
	  border-color: #ddd;
	  border-width: 1px;
	  line-height: 80px;
	  border-style: solid;
	  text-align: center;
	  height: 80px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #ddd;
	  border-radius: 0px;
	  padding: 12px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  color: #666;
	  background: none;
	  width: 40%;
	  font-size: 14px;
	  height: 120px;
	}
</style>
