var crypto=require('crypto');

modifyPassword=function(req,res){
  if(req.session.validateCode===undefined){
    res.json({code:202,msg:'验证码不存在'})
  }
  console.log(new Date().getTime(),req.session.validateCodeTime)
  if(new Date().getTime()>req.session.validateCodeTime){  //当前时间戳与存进session的时间戳进行对比
    res.status(202).json({code:202,msg:'验证码过期'})
  }else{
    if(req.body.code===req.session.validateCode){
      // console.log(req.body.newPassword)

      // var md5=crypto.createHash('md5');   //对密码进行再次加密
      // md5.update(req.body.newPassword);
      // var hashPassword=md5.digest('hex');

      let t1=crypto.createCipher('aes192','hotelAdmin');   ////对密码进行再次加密
      let hashPassword=t1.update(req.body.newPassword,'utf8','hex');
      hashPassword+=t1.final('hex');
        
      let updateSql="UPDATE user SET user_password=? WHERE user_name=?";
      let updateData=[hashPassword,'admin'];
      connection.query(updateSql,updateData,function(err){   //执行修改密码sql语句
        if(err){
          console.log(err)
          res.status(201).json({code:201,msg:'密码修改失败'})
        }else{
          res.status(200).json({code:200,msg:'密码修改成功'})
        }
      })
    }else{
      res.status(203).json({code:203,msg:'验证码错误'})
    }
  }
  
}

module.exports=modifyPassword;