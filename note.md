### 常用命令
```bash
#查看状态
$ git status

#添加管理（添加到暂存区）
$ git add filename   #添加指定文件
$ git add path/      #添加指定目录
$ git add .         #添加项目中所有文件和目录

#从暂存区中移除
 $ git  rm  --cached filename

 #t提交到本地仓库 
 $ commit -m "v 1.0.0"

 #查看提交记录
 $ git log 

 #恢复到 历史提交版本
 $git reset --hard hash(前6位)
 t 
```