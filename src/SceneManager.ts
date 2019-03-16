/**
 * 场景管理,单例类
 */
class SceneManager {

	public _stage: egret.DisplayObjectContainer;
	public mainScene: MainScene;
	public playerScene: PlayScene;
	public heroScene: HeroScene;

	//创建两个场景
	private constructor() {
		this.mainScene = new MainScene();
		this.playerScene = new PlayScene();
		this.heroScene = new HeroScene();

	}

	public static sceneManager: SceneManager;

	public static get instance(){
		//单例类判断是否已经存在一个实例
		if(!this.sceneManager)
			this.sceneManager = new SceneManager();
		return this.sceneManager;
	}

	/**
	 * 设置根场景
	 */
	public setStage(s: egret.DisplayObjectContainer){
		this._stage = s;
	}

	/**
	 * 设置主场景
	 */
	public static toMainScene(){
		let stage: egret.DisplayObjectContainer = this.instance._stage;
		let mainScene = this.instance.mainScene;

		if(!mainScene.parent)
			stage.addChild(mainScene);
		if(SceneManager.instance.playerScene.parent)
			mainScene.removeChild(this.instance.playerScene);
		if(SceneManager.instance.heroScene.parent)
			mainScene.removeChild(this.instance.heroScene);
		//if(SceneManager.instance.goodsScene.parent)

	}

	public static toPlayerScene(){
		let stage: egret.DisplayObjectContainer = this.instance._stage;
		if(SceneManager.instance.playerScene.parent)
			this.instance.mainScene.removeChild(SceneManager.instance.playerScene);
		if(SceneManager.instance.heroScene.parent)
			this.instance.mainScene.removeChild(SceneManager.instance.heroScene);
		this.instance.mainScene.addChildAt(this.instance.playerScene, this.instance.mainScene.numChildren - 1);
	}

	public static toHeroScene(){
		let stage: egret.DisplayObjectContainer = this.instance._stage;
		this.instance.mainScene.addChildAt(this.instance.heroScene,this.instance.mainScene.numChildren - 1)
	}

	public static toGoodsScene(){

	}

	public static toAboutScene(){

	}


	//显示已经选择的英雄的名字
	public static showHeroSelected(arr: string[]){
        let text:string = '你选择了: '
        if (arr.length === 0) {
            text = '厉害了什么都不选'
        } else {
            text += arr.toString()
        }
        // 新建一个消息背景图
        let img:egret.Bitmap = new egret.Bitmap()
        img.texture = RES.getRes('toast-bg_png')
        SceneManager.instance.mainScene.addChild(img)
        img.x = SceneManager.instance.mainScene.width / 2 - img.width / 2
        img.y = 500
        img.height = 40
​
        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        SceneManager.instance.mainScene.addChild(label)
        label.x = SceneManager.instance.mainScene.width / 2 - label.width / 2
        label.y = 510
        label.height = 40
​
        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(1000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.mainScene.removeChild(label)
            SceneManager.instance.mainScene.removeChild(img)
        }, this)
	}
}