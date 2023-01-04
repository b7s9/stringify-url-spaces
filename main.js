const linkInput = document.getElementById("link-input");
const linkOutput = document.getElementById("link-output");
const copyButton = document.getElementById("copy-to-clipboard");
const alertBox = document.getElementById("alert-message");

// https://hello.example.com?foo=234&bar=fs7df9

// function removeTrackers(link) {
// 	const regex = /.*(?=\?)/gi
// 	let matchResult = '';
// 	let linkCleaned = link.trim()

// 	try {

// 		matchResult = linkCleaned.match(regex)[0]
// 		return matchResult;

// 	}catch {
// 		return linkCleaned;
// 	}

// }

function fixLink(link) {
  return link.replaceAll(" ", "+");
}

function copyToClipboard(field) {
  field.select();
  field.setSelectionRange(0, 99999); /* For mobile devices */

  navigator.clipboard.writeText(field.value);
}

function postAlert(msg, timeout = -1) {
  alertBox.innerText = msg;

  if (timeout !== -1) {
    setTimeout(function () {
      alertBox.innerText = "";
    }, timeout);
  }
}

// function validateLink(link) {
//   let isLinkValid = false;
//   const regex =
//     /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

//   link.match(regex) ? (isLinkValid = true) : (isLinkValid = false);

//   console.log(isLinkValid);
//   return isLinkValid;
// }

linkInput.addEventListener("change", (e) => {
  linkOutput.value = fixLink(e.currentTarget.value);
  // console.log('change')
});

linkInput.addEventListener("keyup", (e) => {
  if (
    ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].indexOf(e.key) == -1
  ) {
    linkOutput.value = fixLink(e.currentTarget.value);
  }
  // console.log(e.key)
});

linkInput.addEventListener("paste", (e) => {
  linkOutput.value = fixLink(e.currentTarget.value);
  // console.log('paste')
});

copyButton.addEventListener("click", (e) => {
  // if(validateLink(linkOutput.value)){
  // 	postAlert('link copied to clipboard.', 3000)
  // }else{
  // 	postAlert('link may be invalid', 3000)
  // }
  copyToClipboard(linkOutput);
  postAlert("link copied to clipboard.", 3000);
});

// watch for changes to input field
// if valid, post output to linkOutput
// onFocus or button click, select output field and copy to clipboard
