function convert() {

    let text = document.getElementById('text').value;
    let regexp1 = /^\'|\'$|(\s)\'|\'(\s)|\'(\,)/gm;
    document.getElementById('text').value = text.replace(regexp1,'$1"$2$3');


}