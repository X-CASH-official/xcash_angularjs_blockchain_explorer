#!/bin/sh
# iptables script for server
# if you changed any default ports change them in the firewall as well

# ACCEPT all packets at the top so each packet runs through the firewall rules, then DROP all INPUT and FORWARD if they dont use any of the firewall settings
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT 
iptables -P OUTPUT ACCEPT
# remove all existing IP tables
iptables -t nat -F
iptables -t mangle -F
iptables -t mangle -X
iptables -t mangle -F
iptables -t raw -F
iptables -t raw -X
iptables -F
iptables -X

# create all of the log types

# each log file will log the type of packet and then drop the packet
iptables -N LOG_DDOS
iptables -A LOG_DDOS -m limit --limit 1/min -j LOG --log-prefix "LOG_DDOS:" --log-level 6
iptables -A LOG_DDOS -j DROP
iptables -N LOG_IPSPOOFING
iptables -A LOG_IPSPOOFING -m limit --limit 2/min -j LOG --log-prefix "LOG_IPSPOOFING:" --log-level 6
iptables -A LOG_IPSPOOFING -j DROP
iptables -N LOG_INVALIDPACKET -t mangle
iptables -A LOG_INVALIDPACKET -t mangle -m limit --limit 2/min -j LOG --log-prefix "LOG_INVALIDPACKET:" --log-level 6
iptables -A LOG_INVALIDPACKET -t mangle -j DROP
iptables -N LOG_SYNFLOOD -t mangle
iptables -A LOG_SYNFLOOD -t mangle -m limit --limit 2/min -j LOG --log-prefix "LOG_SYNFLOOD:" --log-level 6
iptables -A LOG_SYNFLOOD -t mangle -j DROP
iptables -N LOG_SYNFLOOD
iptables -A LOG_SYNFLOOD -m limit --limit 2/min -j LOG --log-prefix "LOG_SYNFLOOD:" --log-level 6
iptables -A LOG_SYNFLOOD -j DROP
iptables -N LOG_NULLPACKET
iptables -A LOG_NULLPACKET -m limit --limit 2/min -j LOG --log-prefix "LOG_NULLPACKET:" --log-level 6
iptables -A LOG_NULLPACKET -j DROP
iptables -N LOG_ICMPDDOS
iptables -A LOG_ICMPDDOS -m limit --limit 2/min -j LOG --log-prefix "LOG_ICMPDDOS:" --log-level 6
iptables -A LOG_ICMPDDOS -j DROP
iptables -N LOG_PORTSCAN
iptables -A LOG_PORTSCAN -m limit --limit 2/min -j LOG --log-prefix "LOG_PORTSCAN:" --log-level 6
iptables -A LOG_PORTSCAN -j DROP
iptables -N LOG_INVALIDLOGINATTEMPT
iptables -A LOG_INVALIDLOGINATTEMPT -m limit --limit 2/min -j LOG --log-prefix "LOG_INVALIDLOGINATTEMPT:" --log-level 6
iptables -A LOG_INVALIDLOGINATTEMPT -j DROP

# ip table prerouting data (this is where you want to block ddos attacks)
# Drop all invalid packets
iptables -t mangle -A PREROUTING -m conntrack --ctstate INVALID -j LOG_INVALIDPACKET
# Prevent syn flood
iptables -A INPUT -p tcp ! --syn -m state --state NEW -j LOG_SYNFLOOD
iptables -t mangle -A PREROUTING -p tcp -m conntrack --ctstate NEW -m tcpmss ! --mss 536:65535 -j LOG_SYNFLOOD
iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG NONE -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,SYN FIN,SYN -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags SYN,RST SYN,RST -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,RST FIN,RST -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,ACK FIN -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,URG URG -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,FIN FIN -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,PSH PSH -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL ALL -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL NONE -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL FIN,PSH,URG -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL SYN,FIN,PSH,URG -j LOG_SYNFLOOD 
iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j LOG_SYNFLOOD

# filter data for INPUT, FORWARD, and OUTPUT
# Accept any packets coming or going on localhost
iptables -I INPUT -i lo -j ACCEPT
# Accept any packets that have something to do with ones we've sent on outbound
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
# keep already established connections running
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# block ip spoofing. these are the ranges of local IP address.
iptables -A INPUT -s 45.76.169.83 -j LOG_IPSPOOFING
iptables -A INPUT -s 10.0.0.0/8 -j LOG_IPSPOOFING
iptables -A INPUT -s 169.254.0.0/16 -j LOG_IPSPOOFING
iptables -A INPUT -s 172.16.0.0/12 -j LOG_IPSPOOFING
iptables -A INPUT -s 127.0.0.0/8 -j LOG_IPSPOOFING
iptables -A INPUT -s 192.168.0.0/24 -j LOG_IPSPOOFING
iptables -A INPUT -s 224.0.0.0/4 -j LOG_IPSPOOFING
iptables -A INPUT -d 224.0.0.0/4 -j LOG_IPSPOOFING
iptables -A INPUT -s 240.0.0.0/5 -j LOG_IPSPOOFING
iptables -A INPUT -d 240.0.0.0/5 -j LOG_IPSPOOFING
iptables -A INPUT -s 0.0.0.0/8 -j LOG_IPSPOOFING
iptables -A INPUT -d 0.0.0.0/8 -j LOG_IPSPOOFING
iptables -A INPUT -d 239.255.255.0/24 -j LOG_IPSPOOFING
iptables -A INPUT -d 255.255.255.255 -j LOG_IPSPOOFING

# block all traffic from ip address (iptables -A INPUT -s ipaddress -j DROP)
#unblock them using iptables -D INPUT -s ipaddress -j DROP

# Block different attacks
# block one computer from opening too many connections (100 simultaneous connections) if this gives trouble with post remove this or increase the limit
iptables -t filter -I INPUT -p tcp --syn --dport 80 -m connlimit --connlimit-above 100 --connlimit-mask 32 -j LOG_DDOS
iptables -t filter -I INPUT -p tcp --syn --dport 443 -m connlimit --connlimit-above 100 --connlimit-mask 32 -j LOG_DDOS
# block port scans
# this will lock the IP out for 1 day
iptables -A INPUT -m recent --name portscan --rcheck --seconds 86400 -j LOG_PORTSCAN
iptables -A FORWARD -m recent --name portscan --rcheck --seconds 86400 -j LOG_PORTSCAN
iptables -A INPUT -m recent --name portscan --remove
iptables -A FORWARD -m recent --name portscan --remove
iptables -A INPUT   -p tcp -m tcp -m multiport --destination-ports 21,25,110,135,139,143,445,1433,3306,3389 -m recent --name portscan --set -j LOG_PORTSCAN 
iptables -A FORWARD -p tcp -m tcp -m multiport --destination-ports 21,25,110,135,139,143,445,1433,3306,3389 -m recent --name portscan --set -j LOG_PORTSCAN

# Accept specific packets
# Accept ICMP
iptables -A INPUT -p icmp -j ACCEPT
# Allow ssh (allow 10 login attempts in 1 hour from the same ip, if more than ban them for 1 hour)
iptables -A INPUT -p tcp -m tcp --dport 22 -m state --state NEW -m recent --set --name DEFAULT --rsource 
iptables -A INPUT -p tcp -m tcp --dport 22 -m state --state NEW -m recent --update --seconds 3600 --hitcount 10 --name DEFAULT --rsource -j LOG_INVALIDLOGINATTEMPT 
iptables -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT 
# Allow http
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
# Allow SSL
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
# Allow XCASH
iptables -A INPUT -p tcp --dport 18280 -j ACCEPT
iptables -A INPUT -p tcp --dport 18281 -j ACCEPT
iptables -A INPUT -p tcp --dport 18285 -j ACCEPT
iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
# DROP all INPUT and FORWARD packets if they have reached this point
iptables -A INPUT -j DROP
iptables -A FORWARD -j DROP