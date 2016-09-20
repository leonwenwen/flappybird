/**
 * Created by Administrator on 2016/8/1.
 */
var ctx=document.getElementById("mycanvas").getContext("2d");
var mybird=document.getElementById("mybird");
var kaishi=document.getElementById("kaishi");
var myscore=document.getElementById("myscore");
var stop=document.getElementById("stop");//��ͣ
var begun=document.getElementById("begun");//����
var to_game=document.getElementById("to_game");//��ʼ��Ϸ����
var began_game=document.getElementById("began_game");//��ʼ��Ϸ��ť
var bgmusic=document.getElementById("bgmusic");//��������
var music=document.getElementById("music");//����
var quiet=document.getElementById("quiet");//����
var over_game=document.getElementById("over_game");//��Ϸ����ҳ��
var DownpipeAr=[];
var UppipeAr=[];
var newlandAr=[];
var num=0;
var canCount;
var scorecount;
var newBird= new bridprototype(mybird,170,750,34,32,100,200);
var cland;
var mall;
var cpipe;


bgmusic.play();
setInterval(collide,150);//������ײ
//��ʼ��Ϸ
function gamebegan(){
    cland=setInterval(createland,500);
    mall=setInterval(allMove,100);
    cpipe=setInterval(createpipe,2500);
    to_game.style.display="none";
}


//�����ذ�
function createland(){
    var myland=document.getElementById("myland");
    var newland=new landprototype(myland,0,0,550,150,0,500);
    newlandAr.push(newland);
}
//��������ˮ��
function createpipe(){
    var pipeMath=parseInt(Math.random()*(300-70)+70);
    var pipeUpH=370-pipeMath;
    var pipeCutDownY=320-pipeUpH;   //�и�ĸ߶�
    var pipedrwaUpY;               //����Y����
    //��ˮ��Y������߶ȱ仯�����и�Y����120,��Y����380Ϊ�������ã�
    if(pipeMath>120){
        var countdrwaY=pipeMath-120;
        pipedrwaUpY=380-countdrwaY;
    }else{
        var countdrwaY=Math.abs(pipeMath-120);
        pipedrwaUpY=380+countdrwaY;
    }
    var mydown=document.getElementById("mydown");
    var myup=document.getElementById("myup");
    //;�и�xy���и���,����x.y���ꣻ
    var newUppipe= new pipeprototype(myup,0,0,52,pipeMath,450,pipedrwaUpY);
    var newDownpipe= new pipeprototype(mydown,0,pipeCutDownY,52,pipeUpH,450,0);
    DownpipeAr.push(newDownpipe);
    UppipeAr.push(newUppipe);
    canCount=true;
}
//�ذ����
function landprototype(imageNode,cutX,cutY,cutW,cutH,drawX,drawY,imgAliveW){
    this.ctx=ctx;
    this.imageNode=imageNode;
    this.cutX=cutX;
    this.cutY=cutY;
    this.cutW=cutW;
    this.cutH=cutH;
    this.drawX=drawX;
    this.drawY=drawY;
    this.speed=12;
    this.move=function(){
        this.drawX-=this.speed;
    };
    this.isAliveW=imgAliveW;
    //���ذ�
    this.draw=function(){
        this.ctx.beginPath();
        this.ctx.drawImage(this.imageNode,this.cutX,this.cutY,this.cutW,this.cutH,this.drawX,this.drawY,this.cutW,this.cutH);
        this.ctx.stroke();
        this.move();
    }
}
//�ذ��ƶ�
function allMove(){
    ctx.clearRect(0,0,500,600);
    for(var i=0;i<newlandAr.length;i++){
        newlandAr[i].draw();
    }
    for(var j=0;j<UppipeAr.length;j++){
        UppipeAr[j].draw();
    }
    for(var h=0;h<DownpipeAr.length;h++){
        DownpipeAr[h].draw();
    }
    newBird.draw();
}
//ˮ��
function  pipeprototype(imageNode,cutX,cutY,cutW,cutH,drawX,drawY){
    this.ctx=ctx;
    this.imageNode=imageNode;
    this.cutX=cutX;
    this.cutY=cutY;
    this.cutW=cutW;
    this.cutH=cutH;
    this.drawX=drawX;
    this.drawY=drawY;
    this.speed=10;
    this.move=function(){
        this.drawX-=this.speed;
    };
    //��ˮ��
    this.draw=function(){
        this.ctx.beginPath();
        this.ctx.drawImage(this.imageNode,this.cutX,this.cutY,this.cutW,this.cutH,this.drawX,this.drawY,this.cutW,this.cutH);
        this.ctx.stroke();
        this.move();
    }
}
//��һֻС��
function bridprototype(imageNode,cutX,cutY,cutW,cutH,drawX,drawY){
    this.ctx=ctx;
    this.imageNode=imageNode;
    this.cutX=cutX;
    this.cutY=cutY;
    this.cutW=cutW;
    this.cutH=cutH;
    this.drawX=drawX;
    this.drawY=drawY;
    this.speed=15;
    this.dieTime=10;
    this.move=function(){
        this.drawY+=this.speed;
        if(this.drawY>=520){
            this.drawY=520;
        }
    };
    this.draw=function(){
        this.t++;
        this.ctx.beginPath();
        this.ctx.drawImage(this.imageNode,this.cutX,this.cutY,this.cutW,this.cutH,this.drawX,this.drawY,this.cutW,this.cutH);
        this.ctx.stroke();
        this.cutX+=52;
        if(this.cutX>=326){
            this.cutX=170;
        }
        this.move();
    }
};
//����¼���С�����
document.onmousedown=function(e){
    var e = e || window.event;
    newBird.drawY-=60;
    if(newBird.drawY<=0){
        newBird.drawY=10;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
};
//�ж���ײ
function collide(){
    var bridTop=newBird.drawY;
    var bridBottom=newBird.drawY+newBird.cutH;
    var bridLeft=newBird.drawX;
    var bridRight=newBird.drawX+newBird.cutW;
    for(var i=0;i<UppipeAr.length;i++)
    {
        var  upTop=UppipeAr[i].drawY;
        var  upLeft=UppipeAr[i].drawX+5;
        var  upRight=UppipeAr[i].drawX+UppipeAr[i].cutW;
        var  downBottom=DownpipeAr[i].drawY+DownpipeAr[i].cutH;
        var  downLeft=DownpipeAr[i].drawX+5;
        var  downRight=DownpipeAr[i].drawX+DownpipeAr[i].cutW;
        //��ײ��������Ϊ��ˮ�ܺ���ˮ��
        if(bridRight>=downLeft&&bridLeft<downRight&&bridTop-10<=downBottom||bridRight>=upLeft&&bridLeft<upRight&&bridBottom>=upTop+15){
            clearInterval(cland);
            clearInterval(mall);
            clearInterval(cpipe);
            bgmusic.pause();
            newBird.dieTime--;
            if(newBird.dieTime==0){
                over_game.style.display="block";
            }
        }
        //�÷�
        if(newBird.drawX>UppipeAr[i].drawX+UppipeAr[i].cutW&&canCount){
            num++;
            if(num>1){
                myscore.innerHTML=num-1;
                canCount=false;
                scorecount=myscore.innerHTML;
            }else{
                myscore.innerHTML=num;
                canCount=false;
                scorecount=myscore.innerHTML;
            }
        }


    }
    //С����ذ���ײ��520�ǵذ廭��Y����;
    if(bridBottom>=520){
        clearInterval(cland);
        clearInterval(mall);
        clearInterval(cpipe);
        bgmusic.pause();
        newBird.dieTime--;
        if(newBird.dieTime==0){
            over_game.style.display="block";
        }
        /*newBird=new bridprototype(mybird,260,1150,52,36);*/
    }
}
//��ͣ
function mystop(){
    clearInterval(cland);
    clearInterval(mall);
    clearInterval(cpipe);
    begun.style.display="block";
    stop.style.display="none";
}
function mybegun(){
    cland=setInterval(createland,500);
    mall=setInterval(allMove,100);
    cpipe=setInterval(createpipe,2500);
    begun.style.display="none";
    stop.style.display="block";
}
//����
function mymusic(){
    bgmusic.pause();
    music.style.display="none";
    quiet.style.display="block";
}
function myquiet(){
    bgmusic.play();
    quiet.style.display="none";
    music.style.display="block";
}
//����һ��
function mygameover(){
    location.reload(true);
}
//��¼ע��
function myregistered(){
    document.getElementById("user").style.display="block";
}

//�鿴����
function mysecond(){
    document.getElementById("gamesecond").style.display="block";
}
//ȡ���鿴����
function myaway(){
    document.getElementById("gamesecond").style.display="none";
}

//��¼ //���ߴ���
var myDb= openDatabase("flappybird","","",1024*1024*10);
myDb.transaction(function(tx){
    tx.executeSql("create table if not exists t_user(u_name varchar(50), score varchar(50))");
},function(trans,err){
    console.log(err);
});
function saveUser(){
    document.getElementById("user").style.display="none";
}
//��Ϸ����֮��鿴
function myoversecond(){
    var username = document.getElementById("username").value;
    var score=myscore.innerHTML;
    var myDb= openDatabase("flappybird","","",1024*1024*10);
    myDb.transaction(function(tx){
        tx.executeSql("insert into t_user values(?,?)",[username,score]);
    })
    myDb.transaction(function(tx){
        console.log("jjjjj");
        tx.executeSql("select score,u_name from t_user WHERE  u_name=?",[username],function(trans,rs){
            console.log(rs.rows);
            for(var i=0;i<rs.rows.length;i++){
                console.log(rs.rows.item(i).score);
                document.getElementById("gamescore").innerHTML="�� &nbsp;&nbsp;����"+rs.rows.item(i).score;
                document.getElementById("gamename").innerHTML="�û�����"+rs.rows.item(i).u_name;
            }

        });
    });
    document.getElementById("gamesecond").style.display="block";
}