

var openRoom=function(req,res){
  let insertSql="INSERT INTO `openroom` (room_id,name,gender,certificates,open_date,expire_date,collect_money,remarks) VALUES (?,?,?,?,?,?,?,?)";
  let insertData=[req.body.roomId,req.body.name,req.body.gender,req.body.certificates,req.body.date1,req.body.date2,req.body.roomMoney,req.body.remarks];
  connection.query(insertSql,insertData,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:err})
    }else{
      // res.status(210).json({code:210,msg:'开房成功'})
      // connection
      let updateRoom="UPDATE room SET room_status=? WHERE id=?";
      let updateData=[1,req.body.roomId];
      connection.query(updateRoom,updateData,function(error,results){
        if(error){
          console.log(error);
          res.status(210).json({code:210,msg:error});
        }else{
          res.status(200).json({code:200,msg:'开房成功'});
        }
      })
    }
  })
}

module.exports=openRoom;