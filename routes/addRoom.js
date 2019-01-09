

var addRoom=function(req,res){
  let currentDate=new Date().toLocaleDateString();
  let inertSql="INSERT INTO room (room_num,room_type,room_money,create_time) VALUES (?,?,?,?)";
  let inesrtData=[req.body.roomNum,req.body.roomType,req.body.roomMoney,currentDate];
  connection.query(inertSql,inesrtData,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:'房间添加失败'})
    }else{
      res.status(200).json({code:200,msg:'房间添加成功'})
    }
  })
}
module.exports=addRoom;
