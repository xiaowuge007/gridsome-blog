const axios = require('axios')
const userConfig = require('./user.config')
const instance = axios.create();

/*
* 本项目  'Gists', 'Repos' 没有做关联关系直接在（@gridsome/source-strapi）里面使用了
* */
const getPeople = async (actions) => {
	// 获取所有用户信息
	const { data } = await instance.get('http://106.75.169.210:1337/people')

	// 获取当前用户信息
	const curUser = data.filter((user) => user.name === userConfig.name)[0]
	userConfig.githubUsername = `GitHub-${curUser.name}`;
	userConfig.blogDescribe = `欢迎来到${curUser.name}的个人博客。`;
	userConfig.htmlTitle = `${curUser.name}的博客`;
	userConfig.blogTitle = curUser.name;
	userConfig.location = curUser.location;
	userConfig.avatar_url = curUser.avatar_url;
	//添加博主信息
	actions.addMetadata('configuration',userConfig)
	actions.addMetadata('assetsBase','http://106.75.169.210:1337')

	/*
	* 添加用户信息
	* */
	const collectionPeople = actions.addCollection({
		typeName: 'People'
	})
	for (const item of data) {
		collectionPeople.addNode({
			"id": item.id,
			"name": item.name,
			"avatar_url": item.avatar_url,
			"html_url": item.html_url,
			"published_at": item.published_at,
			"created_at": item.created_at,
			"updated_at": item.updated_at,
			"location": item.location,
			"bio": item.bio,
			"email": item.email
		})
	}
	/*
	* 添加粉丝数据
	* */
	const collectionFollowers = actions.addCollection({
		typeName: 'Followers'
	})
	for (const item of curUser.followers) {
		collectionFollowers.addNode(item)
	}
	/*
	* 添加关注数据
	* */
	const collectionFollowings = actions.addCollection({
		typeName: 'Followings'
	})
	for (const item of curUser.followings) {
		collectionFollowings.addNode(item)
	}
}
module.exports = {
	getPeople
}
