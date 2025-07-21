// idk adding anything for now

function getAvg(x, y) {
    return (x+y)/2;
}
for (var i=2; i<10; i++) {
    for (var x=i; x<100; x*=i) {
        console.log(getAvg(x, i));
    }
}