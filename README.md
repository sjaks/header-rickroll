## Rickrolling with HTTP headers
Rickroll your friends with `curl -IL https://jaks.fi/hrr`.

![](https://i.imgur.com/kF7CXq7.gif)

### Install
Clone and install
```
sudo apt install nodejs npm
npm install -g pm2
git clone https://github.com/sjaks/header-rickroll
cd header-rickroll
pm2 start rickroll
```
The server is now listening at http://localhost:6789.
