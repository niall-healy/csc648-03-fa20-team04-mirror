**Server URL:** ec2-3-135-197-68.us-east-2.compute.amazonaws.com  
**Server Username:** ubuntu  
**Server Key:** Found in key-pair.pem  

**MySQL Hostname:** ip-172-31-11-201  
**MySQL Port:** 3306  
**MySQL Username:** db_user  
**MySQL Password:** team4  
**MySQL Database Name:** CSC648Project  


# Instructions:

**SSH Into Server**
----------------
1. Download MobaXterm
2. Click session on the top left, select 'SSH' as session type
3. Enter the above Server URL into 'Remote Host'
4. Check 'specify username' and enter the above username
5. Check 'Use private key' and select key-pair.pem

**Connect to DB**
-------------
1. Enter the following command: 'sudo mysql -u db_user -p'
2. Enter the above password
