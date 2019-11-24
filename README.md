# XCASH Angluar JS Blockchain Explorer

## Table of Contents  
[System Requirements](#system-requirements)  
[Dependencies](#dependencies)  
[Installation Process](#installation-process)  
* [Installation Path](#installation-path)  
* [Install System Packages](#install-system-packages) 
* [Installing MongoDB From Binaries](#installing-mongodb-from-binaries) 
* [Installing Node.js From Binaries](#installing-nodejs-from-binaries) 
* [Configuring NPM If Root](#configuring-npm-if-root)  
* [Updating NPM](#updating-npm)  
* [Installing Packages Globally Using NPM](#installing-packages-globally-using-npm)  
* [NGINX Setup](#nginx-setup)  
* [Install SSL Certifications](#install-ssl-certifications)  
* [Cloning the Repository](#cloning-the-repository)  
* [Build Instructions](#build-instructions)  

[How To Setup and Install the Systemd Files](#how-to-setup-and-install-the-systemd-files)  
[How To Setup the Firewall](#how-to-setup-the-firewall)  
[How To Run Each Component](#how-to-run-each-component) 

 
## System Requirements
 
**Minimum System Requirements:**  
Operating System: Ubuntu 18.04 (or higher)  
CPU: 2 threads  
RAM: 4GB  
Hard drive: 50GB  
Bandwidth Transfer: 500GB per month  
Bandwidth Speed: 30 Mbps
 
**Recommended System Requirements:**  
Operating System: Ubuntu 18.04 (or higher)  
CPU: 4 threads  
RAM: 8GB  
Hard drive: 100GB  
Bandwidth Transfer: 2TB per month  
Bandwidth Speed: 100 Mbps



## Dependencies

The following table summarizes the tools and libraries required to run XCASH DPOPS - Delegate Website

| Dependencies                                 | Min. version  | Ubuntu package            |
| -------------------------------------------- | ------------- | ------------------------- |
| Node.js                                      | 8             |  install from binaries    | 
| Angular                                      | 6             |  install from NPM         |
| MongoDB                                      | 4.0.3         |  install from binaries    |
| NGINX                                        | any           | `nginx`                   |
| XCASH                                        | latest version         |  [download the latest release](https://github.com/X-CASH-official/X-CASH/releases) or [build from source](https://github.com/X-CASH-official/X-CASH#compiling-x-cash-from-source)       |



## Installation Process

Make sure to create an emtpy wallet and put this in `/root/x-network/xcash_wallets/`


### Installation Path
It is recommend to install in /root/x-network/


### Install System Packages
Make sure the systems packages list is up to date  
`sudo apt update`
 
Install the packages  
`sudo apt install build-essential cmake pkg-config libssl-dev git`
 
(Optionally) Install the packages for XCASH if you plan to [build XCASH from source](https://github.com/X-CASH-official/X-CASH#compiling-x-cash-from-source)


### Installing MongoDB From Binaries
 
Visit [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)
 
Then choose your OS, and make sure the version is the current version and the package is server. Then click on All version binaries. Now find the current version to download. You do not want the debug symbols or the rc version, just the regular current version.
 
Once you have downloaded the file move the file to a location where you want to keep the binaries, then run this set of commands 

**If you want to install MongoDB on a different hard drive then the hard drive your OS is installed on, make sure to change the path of the `/data/db`**
``` 
tar -xf mongodb-linux-x86_64-*.tgz
rm mongodb-linux-x86_64-*.tgz
sudo mkdir -p /data/db
sudo chmod 770 /data/db
sudo chown $USER /data/db
```

Then add MongoDB to your path  
`echo -e '\nexport PATH=MongoDB_folder:$PATH' >> ~/.profile && source ~/.profile




### Installing Node.js from binaries

Visit [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/) and download the "Linux Binaries" download and copy it to a folder. Then run these commands  
``` 
tar -xf node*.tar.xz
rm node*.tar.xz
```

Then add Node.js to your path (replace "Node.js_folder" with the location of the bin folder in the folder you installed Node.js in  
`echo -e '\nexport PATH=Node.js_folder:$PATH' >> ~/.profile && source ~/.profile`



### Configuring NPM If Root
Note if your installing this on a root account then you need to run these additional commands  
`npm config set user 0`  
`npm config set unsafe-perm true`



### Updating NPM

Now you need to update NPM  
`npm install -g npm`



### Installing Packages Globally Using NPM

Now you need to install Angular globally  
`npm install -g @angular/cli@latest`

Then you need to install Uglifyjs globally  
`npm install -g uglify-js` 



### NGINX Setup
Now you need to setup nginx

First install nginx
`sudo apt install nginx`

Next setup the sites available. You can use the default file if just hosting one website on the server, or you can make another file if you need to host multiple websites on the server. The location of the files are at `/etc/nginx/sites-available`

The setup should look like this
```
worker_processes  1;

events
{
  worker_connections  1024;
}

http
{
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server
  {
    listen 80; 
    server_name  www.explorer.x-cash.org explorer.x-cash.org;
    return 301 https://explorer.x-cash.org$request_uri;
  }

  server
  {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  www.explorer.x-cash.org explorer.x-cash.org;
    ssl_certificate /root/x-network/ssl/ssl.crt;
    ssl_certificate_key /root/x-network/ssl/ssl.key;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_stapling on;  
    ssl_ecdh_curve secp384r1;
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";
    ssl_dhparam /home/ubuntu/ssl/dhparam.pem;
    # dont load website in iframe
    add_header X-Frame-Options SAMEORIGIN;
    # XSS prevention
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    if ($request_method !~ ^(GET|HEAD|POST)$)
    {
      return 400;
    }
    # prevent buffer overflow
    client_body_buffer_size  10k;
    client_header_buffer_size 10k;
    client_max_body_size 10k;
    large_client_header_buffers 10 10k;
    #DDOS
    client_body_timeout   10;
    client_header_timeout 10;
    keepalive_timeout     5 5;
    send_timeout          10;

    location /
    {
      proxy_pass http://localhost:8000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
    
    error_page   500 502 503 504  /50x.html;
    location = /50x.html
    {
      root   html;
    }
  }
}
```

Apply the changes to nginx
`nginx -s reload`

### Install SSL Certifications
Make a new ssl folder in the x-network folder  
`mkdir /root/x-network/ssl/`

Copy the SSL Certification and SSL key to the folder



### Cloning the Repository
```
cd ~/Installed-Programs 
git clone https://github.com/X-CASH-official/XCASH_DPOPS_delegates_website.git
```


### Build Instructions

```
cd /root/x-network/xcash_angularjs_blockchain_explorer/xcash_angularjs_blockchain_explorer/
npm update
ng build --prod --aot
```

It will then create a dist folder, compress the javascript using Uglify-JS and move all of the contents of this folder to your `/var/www/html/` folder 
``` 
cd dist  
for f in *.js; do echo "Processing $f file.."; uglifyjs $f --compress --mangle --output "{$f}min"; rm $f; mv "{$f}min" $f; done  
cd ../
rm -r /var/www/html/*  
cp -a dist/* /var/www/html/
```


## How To Setup and Install the Systemd Files

Edit the below systemd files to your paths

Copy all of the service files in the systemd folder to `/lib/systemd/system/`  
`cp -a /root/x-network/xcash_angularjs_blockchain_explorer/scripts/systemd/* /lib/systemd/system/`

Reload systemd  
`systemctl daemon-reload`

Create a systemd PID folder  
`mkdir /root/x-network/systemdpid/`

Create a logs folder  
`mkdir /root/x-network/logs/`

Create a mongod pid file and a xcashd pid file
```
touch /root/x-network/systemdpid/mongod.pid
touch /root/x-network/systemdpid/xcash_daemon.pid
```


## How To Setup the Firewall
 
We will need to setup a firewall for our DPOPS node. The goal of settings up the firewall is to block any DDOS attacks. We will use IPtables for the firewall. This needs to be installed outside of the docker container
 
Now we need to run the firewall script and activate it  
```
chmod +x /root/x-network/xcash_angularjs_blockchain_explorer/scripts/firewall/firewall_script.sh
/root/x-network/xcash_angularjs_blockchain_explorer/scripts/firewall/firewall_script.sh
iptables-save > /etc/network/iptables.up.rules
iptables-apply -t 60
```
 
You should then open another connection to the server to make sure it worked and did not lock you out. Then press y to confirm the changes for the firewall.

Now we need to enable the firewall systemd service file to run this script after a restart  
`systemctl enable firewall`

 
 
## How To Run Each Component
To start a systemd service  
`systemctl start name_of_service_file_without.service`

To stop a systemd service  
`systemctl stop name_of_service_file_without.service`

To restart a systemd service  
`systemctl restart name_of_service_file_without.service`

To check the status of a systemd service  
`systemctl status name_of_service_file_without.service`

to start all of the components
`systemctl start MongoDB XCASH_Daemon && sleep 30s && systemctl start XCASH_Wallet && sleep 30s && systemctl start xcashangularjsblockchainexplorer`

to stop all of the components
`systemctl stop MongoDB XCASH_Daemon XCASH_Wallet xcashangularjsblockchainexplorer`


## How To View Logs For Each Component
To view the logs for any service file. you can run  
`journalctl --unit=name_of_service_file_without.service`

To view only the last 100 lines of the log file, you can run  
`journalctl --unit=name_of_service_file_without.service -n 100 --output cat`

To view live logging, you can run  
`journalctl --unit=name_of_service_file_without.service --follow -n 100 --output cat`
