import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Forum from '../pages/forum/list'
import ForumAdd from '../pages/forum/add'
import ForumDetail from '../pages/forum/detail'
import MyForumList from '../pages/forum/myForumList'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import xinwenleixingList from '../pages/xinwenleixing/list'
import xinwenleixingDetail from '../pages/xinwenleixing/detail'
import xinwenleixingAdd from '../pages/xinwenleixing/add'
import xinwenbiaoqianList from '../pages/xinwenbiaoqian/list'
import xinwenbiaoqianDetail from '../pages/xinwenbiaoqian/detail'
import xinwenbiaoqianAdd from '../pages/xinwenbiaoqian/add'
import xinwenxinxiList from '../pages/xinwenxinxi/list'
import xinwenxinxiDetail from '../pages/xinwenxinxi/detail'
import xinwenxinxiAdd from '../pages/xinwenxinxi/add'
import paixingbangList from '../pages/paixingbang/list'
import paixingbangDetail from '../pages/paixingbang/detail'
import paixingbangAdd from '../pages/paixingbang/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'
import discussxinwenxinxiList from '../pages/discussxinwenxinxi/list'
import discussxinwenxinxiDetail from '../pages/discussxinwenxinxi/detail'
import discussxinwenxinxiAdd from '../pages/discussxinwenxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'forum',
					component: Forum
				},
				{
					path: 'forumAdd',
					component: ForumAdd
				},
				{
					path: 'forumDetail',
					component: ForumDetail
				},
				{
					path: 'myForumList',
					component: MyForumList
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'xinwenleixing',
					component: xinwenleixingList
				},
				{
					path: 'xinwenleixingDetail',
					component: xinwenleixingDetail
				},
				{
					path: 'xinwenleixingAdd',
					component: xinwenleixingAdd
				},
				{
					path: 'xinwenbiaoqian',
					component: xinwenbiaoqianList
				},
				{
					path: 'xinwenbiaoqianDetail',
					component: xinwenbiaoqianDetail
				},
				{
					path: 'xinwenbiaoqianAdd',
					component: xinwenbiaoqianAdd
				},
				{
					path: 'xinwenxinxi',
					component: xinwenxinxiList
				},
				{
					path: 'xinwenxinxiDetail',
					component: xinwenxinxiDetail
				},
				{
					path: 'xinwenxinxiAdd',
					component: xinwenxinxiAdd
				},
				{
					path: 'paixingbang',
					component: paixingbangList
				},
				{
					path: 'paixingbangDetail',
					component: paixingbangDetail
				},
				{
					path: 'paixingbangAdd',
					component: paixingbangAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
				{
					path: 'discussxinwenxinxi',
					component: discussxinwenxinxiList
				},
				{
					path: 'discussxinwenxinxiDetail',
					component: discussxinwenxinxiDetail
				},
				{
					path: 'discussxinwenxinxiAdd',
					component: discussxinwenxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
