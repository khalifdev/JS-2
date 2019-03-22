function convert() {

    let text = document.getElementById('text').innerHTML;
    let regexp1 = /^\'|\'$|(\s)\'|\'(\s)|\'(\,)/gm;
    document.getElementById('text').innerHTML = text.replace(regexp1,'$1"$2$3');


}