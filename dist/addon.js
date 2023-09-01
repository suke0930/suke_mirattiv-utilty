"use strict";
function gethtmlchildlengh(name) {
    var rawHTMLobj = document.getElementsByClassName(name);
    var raw_to_inner = rawHTMLobj[0].innerHTML;
    // let dummyelement = document.getElementsByTagName('ul');
    var dummyelement = document.createElement('ul');
    dummyelement.innerHTML = raw_to_inner;
    return dummyelement.children.length;
}
//
//
// L
// document.createElement('ul')
//
// obj3  = document.createElement('ul')
// obj3.innerHTML = obj2
// obj3.firstChild.length
// obj3.children.length
