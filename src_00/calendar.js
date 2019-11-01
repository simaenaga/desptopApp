window.addEventListener("load", function(){
    //厳格モード（よくわかってない）
    "use strict";

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;//getMonth()は０～１１を返す
    let today = date.getDate();
    
    //今の年月の最初と最後の日付を設定，あとで曜日を取得
    let firstDate = new Date(year, month-1, 1);
    let lastDate = new Date(year, month, 0);
    
    //キャプションの内容と，キャプションのHTMLテキスト
    let table_tytle = year+"年"+month+"月";
    let captionHTML = "<caption>" + table_tytle +"</caption>";

    //配列インスタンス生成
    let weekDays = new Array("日","月","火","水","木","金","土");
    let weekDaysStr = "<tr>";

    //曜日の行をHTMLテキストで書く
    for (let i = 0; i < weekDays.length; i++){
        if (i==0){
            weekDaysStr += "<td class = 'sun'>" + weekDays[i] + "</td>";
        }else if (i == weekDays.length-1){
            weekDaysStr += "<td class = 'sat'>" + weekDays[i] + "</td>";
        }else{
            weekDaysStr += "<td>" + weekDays[i] + "</td>";
        }
    }
    weekDaysStr+="</tr>";

    //ココから空白を埋める記述
    //1日まで埋めたいので1日の曜日をだす
    let firstDay = firstDate.getDay();//Sunday - Saturday : 0 - 6
    
    const sun = 0, sat = 6;
    let dazeStr = "";
    if(firstDay != sun){
        dazeStr += "<tr>";

        for (let i = 0; i <firstDay; i++){
            dazeStr += "<td>&nbsp;</td>";
        }
    }
    


    let htmlStr = "";
    let lastDate_date = lastDate.getDate();

    //ココから日付を埋めていく
    for (let i = 1; i <= lastDate_date; i++){
        let dateI = new Date(year, month-1, i);
        let dayI = dateI.getDay();
        let cellStr = dateI.getDate();
        let dateStr = year+"."+month+"."+i;
        if(this.localStorage[dateStr+"_title"]||this.localStorage[dateStr+"_body"]){
            cellStr = "<u>" + cellStr + "</u>";
        }
        
        if(dayI == sun){
            htmlStr += "<tr>";
        }
        if(dayI == sun ){
            htmlStr += "<td class = 'sun'>";
        }else if(dayI == sat){
            htmlStr += "<td class = 'sat'>";
        }else if(today == dateI.getDate()){
            htmlStr += "<td class = 'today'>";
        }else{
            htmlStr += "<td>";
        }

        htmlStr += "<div class = 'date_circle'><a onclick ='presetDiary(\""+dateStr+"\");\'>"+cellStr+"</a></div></td>";

        if(dayI == sat){
            htmlStr += "</tr>\n";
        }
    }
    let lastDay = lastDate.getDay();
    //ココから後半の空白を埋める処理
    if(lastDay != 6){
        for (let i = lastDay + 1; i <= sat; i++){
            htmlStr += "<td>&nbsp;</td>";
        }
        htmlStr += "</tr>\n";
    }

    let html = "<table>" + captionHTML + weekDaysStr + dazeStr + htmlStr + "</table>";

    document.getElementById("calendar").innerHTML = html;

    let todayStr = year+"."+month+"."+today;
    presetDiary(todayStr);
    
})
//指定した日記の日付を表示
function presetDiary(dateStr){
    //ボタンのdata-date属性にキーの日付部分を指定する
    let button　= document.getElementById("button");
    button.setAttribute("data-date", dateStr);

    //日記の日付を表示
    let diary_date = document.getElementById("diary_date");
    diary_date.innerHTML = dateStr;

    //ローカルストレージから，日記の本分とタイトルを取得
    let title = localStorage[dateStr+"_title"];
    let body = localStorage[dateStr+"_body"];

    //日記の入力欄を取得
    let diary_title = document.getElementById("diary_title");
    let diary_body = document.getElementById("diary_body");

    if(title){
        diary_title.value = title;
    }else{
        diary_title.value = "";
    }
    if(body){
        diary_body.value = body;
    }else{
        diary_body.value = "";
    }
}
function onSave(obj){
    let dateStr = obj.getAttribute("data-date");
    let diary_title = document.getElementById("diary_title").value;
    let diary_body = document.getElementById("diary_body").value;
    
    localStorage[dateStr+"_title"] = diary_title;
    localStorage[dateStr+"_body"]= diary_body;

    window.alert("日記を保存しました");

    location.reload();

}