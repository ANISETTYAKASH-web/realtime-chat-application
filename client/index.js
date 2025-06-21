const url = "ws://localhost:9876/mywebSocket";
const mywsServer = new WebSocket(url);

const myMessages = document.getElementById("message-box");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("send");
console.log(input);
sendBtn.disabled = true;
sendBtn.addEventListener("click", sendMsg, false); //what is false?
function sendMsg() {
  const msg = input.value;
  genmsg(msg, "client");
  mywsServer.send(msg);
}
function genmsg(msg, from) {
  const newmsg = document.createElement("h3");
  newmsg.innerText = `${from} says:${msg}`;
  myMessages.appendChild(newmsg);
}
mywsServer.onopen = function () {
  sendBtn.disabled = false;
};
mywsServer.onmessage = function (event) {
  const { data } = event;
  genmsg(data, "Server");
};
