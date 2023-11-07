var myNodelist = document.getElementsByTagName("LI");
var i;

for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
    if (ev.target.classList.contains('close')) {
        var div = ev.target.parentElement;
        div.style.display = "none";
    }
}, false);

function newElement() {
    var li = document.createElement("li");
    //gán giá trị của thuộc tính value của phần tử input vào biến inputValue
    var inputValue = document.getElementById("nhapVao").value;

    var text = document.createTextNode(inputValue);
    li.appendChild(text);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    if (inputValue === '') {
        alert("Bạn chưa nhập gì cả!");
    } else {
        li.addEventListener('dblclick', function() {
            var updatedText = prompt("Nhập nội dung cập nhật:", this.childNodes[0].textContent);
            if (updatedText !== null) {
                this.childNodes[0].textContent = updatedText;
            }
        });

        document.getElementById("list").appendChild(li);
    }
    document.getElementById("nhapVao").value = "";
}