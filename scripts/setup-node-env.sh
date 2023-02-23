#!/bin/bash

# Update and upgrade
sudo yum update
sudo yum upgrade -y

# Install NGINX
sudo amazon-linux-extras install nginx1 -y
sudo systemctl status nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Install mysql
# Import the MySQL repository GPG key
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Download the MySQL repository package for Amazon Linux 2
sudo curl -LO https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

# Install the MySQL repository package
sudo rpm -ivh mysql80-community-release-el7-3.noarch.rpm

# Install MySQL
sudo yum install -y mysql-community-server -y

# Start the MySQL service
sudo systemctl start mysqld

# Capture root user password
ROOT_PASSWORD=$(sudo grep 'temporary password' /var/log/mysqld.log | sudo awk '{print $13}' | tail -1)
NEW_PASSWORD=MyNewPass4!

# Create user for webapp
sudo mysql -uroot -p$ROOT_PASSWORD --connect-expired-password << EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
CREATE USER 'webapp'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'webapp'@'localhost';
FLUSH PRIVILEGES;

exit
EOF

# Create database
sudo mysql -u'webapp' -p$NEW_PASSWORD << EOF
CREATE DATABASE webapp;
exit
EOF

# Enable MySQL to start at boot
sudo systemctl enable mysqld

# NVM install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
# Install lts
nvm install 16.19.1
nvm use 16.19.1

# Decompress webapp
mkdir /home/ec2-user/webapp
tar -xf /home/ec2-user/webapp.tar.gz -C /home/ec2-user/webapp
# npm install
npm install --omit=dev --prefix /home/ec2-user/webapp

# Create systemd service
sudo touch /etc/systemd/system/webapp.service

# Set env
printf "\nexport NODE_ENV=production\nexport PORT=3001\nexport MYSQL_DB_HOST=localhost\nexport MYSQL_DB_USER=webapp\nexport MYSQL_DB_PASSWORD=MyNewPass4!\nexport MYSQL_DB_NAME=webapp\nexport DB_DIALECT=mysql" >> ~/.bashrc
source ~/.bashrc

# Run migration scripts
npm run migratedb --prefix /home/ec2-user/webapp

# Add script
sudo bash -c "cat > /etc/systemd/system/webapp.service <<EOF
[Unit]
Description=webapp

[Service]
# Start Service and Examples
ExecStart=/home/ec2-user/.nvm/versions/node/v16.19.1/bin/node /home/ec2-user/webapp/server.js
# Restart service after 10 seconds if node service crashes
RestartSec=10
Restart=always
Restart=on-failure
# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=webapp-server
User=ec2-user

# variables
Environment=NODE_ENV=production
Environment=PORT=3001
Environment=MYSQL_DB_USER=webapp
Environment=MYSQL_DB_HOST=localhost
Environment=MYSQL_DB_PASSWORD=MyNewPass4!
Environment=MYSQL_DB_NAME=webapp
Environment=DB_DIALECT=mysql

[Install]
WantedBy=multi-user.target
EOF"

# Start node app
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service