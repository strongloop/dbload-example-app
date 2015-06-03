# dbload-example-app

Description : Test app to generate db transactions for mongo, mysql, memcache etc

Setup : 

1. Install memcache locally and start the memcached server on port 11211

2. Build and deploy the app to a process manager server

3. Once the app is deployed, in a new shell, run this to generate load for the app - 
> for ((i=1;i<=10000000;i++)); do   curl -v --header "Connection: keep-alive" "\<pm-host-ip\>:3001/chimera/once"; done

  
