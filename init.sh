
#Install mysql, mongo, redis
# http://docs.mongodb.org/manual/installation/
# brew install mysql
# brew install redis && redis-server &
# brew install memcached && /usr/local/bin/memcached -d -p 11211

redis-server & 
mongod & 
/usr/local/bin/mysql.server start & 
/usr/local/bin/memcached -d -p 11211 & 
